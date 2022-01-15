import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

export default async (request: NextApiRequest, res: NextApiResponse) => {
  const { password, identifier } = request.body;

  try {
    const postRes = await axios.post(
      `${process.env.STRAPI_API_URL}/auth/local`,
      {
        identifier,
        password,
      }
    );

    setCookie({ res }, "jwt", postRes.data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    res.status(200).send(identifier);
  } catch (error: any) {
    res.status(400).send(error);
  }
};
