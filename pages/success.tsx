import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";

import Layout from "../components/Layout";

const Login: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Comic Center</title>
        <meta name="description" content="Comic Center" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box p={4}></Box>
    </Layout>
  );
};

export default Login;
