// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

const register = async (request: NextApiRequest, res: NextApiResponse) => {
  const { username, email, password } = request.body;

  try {
    const data = await axios.post(
      `${process.env.BASE_URL}/api/auth/local/register`,
      {
        username,
        email,
        password,
      }
    );
    setCookie({ res }, "jwt", data.data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    res.status(200).end();
  } catch {
    res.status(400).end();
  }
};

export default register;
