import { Box, Button } from "@chakra-ui/react";
import { Table, TableCaption, Tbody, Td, Tr } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import nookies from "nookies";
import React from "react";
import { useDispatch } from "react-redux";

import Layout from "../components/Layout";
import { login, logout } from "../redux/user.slice";

const Profile = (properties: { user: { email: any; username: any } }) => {
  const router = useRouter();
  const {
    user: { email, username },
  } = properties;

  const dispatch = useDispatch();
  React.useEffect(() => {
    const { user } = properties;
    dispatch(login({ ...user }));
    return () => {};
  }, []);

  const logoutUser = async () => {
    await axios.get("/api/logout");
    dispatch(logout({}));
    router.push("/");
  };
  return (
    <Layout>
      <Box p="4">
        <Table variant="simple">
          <TableCaption>Profile</TableCaption>

          <Tbody>
            <Tr>
              <Td>Username</Td>
              <Td>{username}</Td>
            </Tr>
            <Tr>
              <Td>Email</Td>
              <Td>{email}</Td>
            </Tr>
          </Tbody>
        </Table>
        <Box p={4}>
          <Button
            color={"white"}
            bg={"green.400"}
            _hover={{
              bg: "green.300",
            }}
            mt={6}
            onClick={() => logoutUser()}
          >
            {" "}
            Logout{" "}
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const cookies = nookies.get(context);
  let user;

  if (cookies?.jwt) {
    const { data } = await axios.get(`${process.env.STRAPI_API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    });
    user = data;
  }

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default Profile;
