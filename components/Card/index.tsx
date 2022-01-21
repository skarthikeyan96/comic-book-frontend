import {
  Box,
  Button,
  Center,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useDispatch } from "react-redux";

import { addToCart } from "../../redux/cart.slice";

export default function ProductSimple(properties: any) {
  const url = `/product/${properties.id}`;
  const price = Number.parseInt(properties.price) * 70;
  const dispatch = useDispatch();
  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <NextLink href={url}>
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"230px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url(${properties.image})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"cover"}
              src={properties.image}
            />
          </Box>
        </NextLink>
        <Stack pt={10} align={"left"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {properties.name}
          </Text>
          <Stack direction={"row"} align={"left"}>
            <Text fontWeight={800} fontSize={"xl"}>
              ₹ {price}
            </Text>
          </Stack>
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"green.400"}
            _hover={{
              bg: "green.300",
            }}
            onClick={() => dispatch(addToCart(properties))}
          >
            Add to Cart
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
