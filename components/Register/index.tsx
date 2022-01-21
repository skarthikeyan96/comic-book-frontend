import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { errorMessage } from "../../constants/errors";
const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (values: any) => {
    try {
      await axios.post("/api/register", values);
      router.replace("/profile");
    } catch {
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="name">Username</FormLabel>
        <Input
          id="username"
          placeholder="username"
          {...register("username", {
            required: errorMessage,
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
        <FormLabel htmlFor="email" mt="4">
          Email
        </FormLabel>
        <Input
          id="email"
          placeholder="email"
          {...register("email", {
            required: errorMessage,
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
        <FormLabel htmlFor="password" mt="4">
          Password
        </FormLabel>
        <Input
          id="password"
          type={"password"}
          placeholder="password"
          {...register("password", {
            required: errorMessage,
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        mt={4}
        color="white"
        bg="green.400"
        isLoading={isSubmitting}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default Register;
