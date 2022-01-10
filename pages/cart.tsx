import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
// Importing hooks from react-redux
import { useDispatch, useSelector } from "react-redux";

import Layout from "../components/Layout";
import { initateCheckout } from "../constants/stripefile";
import { decrementQuantity, incrementQuantity } from "../redux/cart.slice";

const CartPage = () => {
  // Extracting cart state from redux store
  const cart = useSelector((state: any) => state.cart);

  // Reference to the dispatch function from redux store
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator: number, item: { quantity: number; price: number }) =>
        accumulator + item.quantity * item.price,
      0
    );
  };

  return (
    <Layout>
      <Box p={8}>
        <Table variant="simple">
          <TableCaption>Shopping cart</TableCaption>
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Price</Th>
              <Th>Product</Th>
              <Th> Quantity</Th>
              <Th> Actions </Th>
              <Th> Total Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cart.map((item: any) => (
              <Tr key={item.id}>
                <Td>
                  {" "}
                  <img src={item.image} height="90" width="65" />{" "}
                </Td>

                <Td>$ {item.price}</Td>
                <Td>{item.name}</Td>

                <Td>{item.quantity}</Td>
                <Td>
                  <IconButton
                    mr={4}
                    aria-label="increase"
                    icon={<AddIcon />}
                    onClick={() => dispatch(incrementQuantity(item.id))}
                  />{" "}
                  {item.quantity}{" "}
                  <IconButton
                    ml={4}
                    aria-label="decrease"
                    icon={<MinusIcon />}
                    onClick={() => dispatch(decrementQuantity(item.id))}
                  />{" "}
                </Td>
                <Td>$ {item.quantity * item.price}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box p={4} textAlign={"right"}>
          <Text> Grand Total: ${getTotalPrice()} </Text>
          <Button
            color={"white"}
            bg={"green.400"}
            _hover={{
              bg: "green.300",
            }}
            mt={6}
            onClick={() => initateCheckout(cart)}
          >
            {" "}
            Checkout{" "}
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default CartPage;
