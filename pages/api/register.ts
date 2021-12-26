// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

const register = async (request: NextApiRequest, response: NextApiResponse) => {
  const { email, password } = request.body;
  try {
    const data = await axios.post(
      "http://localhost:1337/api/auth/local/register",
      {
        email,
        password,
      }
    );
    // @ts-ignore
    setCookie({ response }, "jwt", data.data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    response.status(200).end();
  } catch {
    response.status(400).end();
  }
};

export default register;
