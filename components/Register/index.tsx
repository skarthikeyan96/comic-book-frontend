import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const onSubmit = (values: any) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      alert(JSON.stringify(values, undefined, 2));
      resolve();
    }, 3000);
  });
};

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="name">Email</FormLabel>
        <Input
          id="email"
          placeholder="email"
          {...register("email", {
            required: "This is required",
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          placeholder="password"
          {...register("password", {
            required: "This is required",
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} bg={"green.400"} isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Register;
