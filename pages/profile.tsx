import axios from "axios";
import { useRouter } from "next/router";
import nookies from "nookies";

import Layout from "../components/Layout";

const Profile = (properties: { user: { email: any; username: any } }) => {
  const router = useRouter();
  const {
    user: { email, username },
  } = properties;

  const logout = async () => {
    await axios.get("/api/logout");
    router.push("/");
  };
  return (
    <Layout>
      <div>Username: {username}</div>
      <div>Email: {email}</div>
      <button onClick={logout}>Logout</button>
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
