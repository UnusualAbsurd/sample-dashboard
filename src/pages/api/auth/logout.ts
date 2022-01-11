import { NextApiRequest, NextApiResponse } from "next";
import { withSession } from "../../../util/session";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy();
  res.redirect("/");
};

export default withSession(handler);
