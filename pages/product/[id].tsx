import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import Layout from "../../components/Layout";
import StrapiClient from "../../constants/StrapiClient";

const Category = (properties: any) => {
  return (
    <Layout>
      <Box p={4}>
        <HStack spacing={10} align={"flex-start"}>
          <img src={properties.data.attributes.image.data.attributes.url} />
          <VStack spacing={10} align={"flex-start"}>
            <Heading>{properties.data.attributes.name}</Heading>
            <Text>{properties.data.attributes.description}</Text>
            <Stack direction="row" spacing={4} align="flex-end">
              <Button bg={"green.500"} variant="solid">
                Add to cart
              </Button>
              <Button bg={"green.500"} variant="outline">
                Buy now
              </Button>
            </Stack>
          </VStack>
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
  const data = await strapiClient.fetchData(
    `/products/${context.query.id}`,
    parameters
  );
  return {
    props: {
      data,
    },
  };
};

export default Category;
