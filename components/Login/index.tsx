import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { login } from "../../redux/user.slice";

const LoginComponent = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    identifier: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { ...userData });
      if (response.status === 200) {
        dispatch(login({}));
        router.push("/profile");
      }
    } catch (error: any) {
      return error;
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            name="identifier"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <br />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
