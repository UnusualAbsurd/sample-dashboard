import { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "querystring";
import { dbConnect } from "../../../util/mongodb";
import { withSession } from "../../../util/session";
import axios from "axios";
import { encrypt } from "../../../util/crypt";
import { Guild } from "../../../typings/types";

const OAuthScope = ["identify", "guilds"].join(" ");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await dbConnect();
  const protocol = req.headers.host?.includes("localhost")
    ? "http://"
    : "https://";
  const origin = protocol + req.headers.host;

  if (!req.query.code) {
    res.status(404).redirect("/404");
    return;
  }

  try {
    const { data } = await axios.post(
      "https://discordapp.com/api/v9/oauth2/token",
      stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: `${origin}/api/auth/callback`,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (data.scope !== OAuthScope) {
      return res
        .status(403)
        .send(
          `Expected scope "${OAuthScope}" but received scope "${data.scope}"`
        );
    }

    const { data: user } = await axios.get(
      "https://discordapp.com/api/v9/users/@me",
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    );

    if (user.email === null) {
      return res
        .status(400)
        .send("Please verify your Discord's account E-mail before logging in.");
    }

    const { data: guilds } = await axios.get(
      "https://discordapp.com/api/v9/users/@me/guilds",
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    );
    const guildsToSet: Array<Guild> = guilds.filter(
      (g: Guild) => (parseInt(g.permissions) & 0x20) == 0x20
    );

    let userData = await db.collection("users").findOne({ _id: user.id });

    if (userData) {
      db.collection("users").updateOne(
        { _id: user.id },
        {
          $set: {
            email: user.email,
            name: user.username,
            discriminator: user.discriminator,
            avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
          },
          $addToSet: {
            ip: req.headers["cf-connecting-ip"],
          },
        }
      );
    } else {
      userData = {
        _id: user.id,
        email: user.email,
        name: user.username,
        discriminator: user.discriminator,
        avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
        ip: [req.headers["cf-connecting-ip"]],
      };
      db.collection("users").insertOne(userData);
    }

    req.session.user = {
      ...user,
      developer: !!userData.developer,
      moderator: !!userData.moderator,
      admin: !!userData.admin,
      token: encrypt(user.id),
      avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
    };
    req.session.guilds = guildsToSet;
  } catch (e: any) {
    res.status(400).send({ error: e.message });
    res.redirect("/?r=false");
  }

  await req.session.save();
  res.redirect("/?r=true");
};

export default withSession(handler);
