import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import React from "react";
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
        router.push("/");
      }
    } catch (error: any) {
      return error;
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormControl>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            id="email"
            type="email"
            name="identifier"
            onChange={(e: any) => handleChange(e)}
          />
          <FormHelperText>We&apos;ll never share your email.</FormHelperText>
        </FormControl>

        <FormControl mt="3">
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button mt={4} color="white" bg="green.400" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginComponent;
