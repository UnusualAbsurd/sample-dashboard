import { NextApiRequest, NextApiResponse } from "next";
import { withSession } from "../../../util/session";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const protocol = req.headers.host?.includes("localhost")
    ? "http://"
    : "https://";
  const origin = protocol + req.headers.host;

  const OauthScope = ["identify", "guilds"].join(" ");
  const UrlParams = new URLSearchParams({
    response_type: "code",
    client_id: process.env.CLIENT_ID as string,
    redirect_uri: `${origin}/api/auth/callback`,
    scope: OauthScope,
  });

  res.redirect("https://discordapp.com/oauth2/authorize?" + UrlParams);
};

export default withSession(handler);
