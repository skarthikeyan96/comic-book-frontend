import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";

import Layout from "../components/Layout";
import RegisterComponent from "../components/Register";

const Register: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Comic Center</title>
        <meta name="description" content="Comic Center" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box p={4}>
        <RegisterComponent />
      </Box>
    </Layout>
  );
};

export default Register;
