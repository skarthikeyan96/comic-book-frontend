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
      <div>Username: {username}</div>
      <div>Email: {email}</div>
      <button onClick={logoutUser}>Logout</button>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const cookies = nookies.get(context);
  let user;

  if (cookies?.jwt) {
    const { data } = await axios.get("http://localhost:1337/api/users/me", {
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
