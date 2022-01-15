import { Box, HStack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";

import Card from "../components/Card";
import Layout from "../components/Layout";
import StrapiClient from "../constants/StrapiClient";

const Home: NextPage = (properties: any) => {
  return (
    <Layout>
      <Head>
        <title>Comic Center</title>
        <meta name="description" content="Comic Center" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box p={4}>
        <HStack spacing={4}>
          {properties.data.length > 0 ? (
            properties.data.map((data: any) => {
              return (
                <Box key={data.id}>
                  <Card
                    id={data.id}
                    name={data.attributes.name}
                    price={data.attributes.price}
                    image={data.attributes.image.data.attributes.url}
                    description={data.attributes.description}
                  />
                </Box>
              );
            })
          ) : (
            <Text> Please add products in the admin ...</Text>
          )}
        </HStack>
      </Box>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const strapiClient = new StrapiClient();
  const parameters = {
    populate: ["image"],
  };
  const data = await strapiClient.fetchData("/products", parameters);

  return {
    props: {
      data,
    },
  };
};

export default Home;
