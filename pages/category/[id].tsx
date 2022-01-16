import { Box, HStack } from "@chakra-ui/react";

import Card from "../../components/Card";
import Layout from "../../components/Layout";
import StrapiClient from "../../constants/StrapiClient";

const Category = (properties: any) => {
  return (
    <Layout>
      <Box p={4}>
        <HStack spacing={4}>
          {properties.filteredData &&
            properties.filteredData.attributes.products.data.map(
              (data: any) => {
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
              }
            )}
        </HStack>
      </Box>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const strapiClient = new StrapiClient();
  const parameters = {
    populate: ["products", "products.image"],
  };
  const data = await strapiClient.fetchData("/categories", parameters);
  const filteredData = data.find(
    (d: any) => d.attributes.name === context.query.id
  );
  return {
    props: {
      filteredData,
    },
  };
};

export default Category;
