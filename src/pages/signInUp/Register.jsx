import React, { useState } from "react";

import {
  FormControl,
  FormLabel,
  Stack,
  VStack,
  Image,
  Divider,
  HStack,
  Input,
  Button,
  Text,
  InputGroup,
  InputRightElement,
  Checkbox,
  Heading,
  Center,
  useToast,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";

const signUpInitialValues = {
  name: "",
  email: "",
  password: "",
};

const SignupForm = () => {
  const [signup, setSignup] = useState(signUpInitialValues);

  const { name, email, password } = signup;

  const navigate = useNavigate();

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: name });
      navigate("/");
      alert("register success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Heading>Create an Account</Heading>

      <form onSubmit={submitHandler}>
        {/* <VStack>
            <HStack>{loading && <Spinner />}</HStack>
          </VStack> */}
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          value={name}
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={(e) => onInputChange(e)}
        />
        <FormLabel htmlFor="email" mt={"1rem"}>
          Email
        </FormLabel>
        <Input
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => onInputChange(e)}
        />
        <FormLabel htmlFor="password" mt={"1rem"}>
          Password
        </FormLabel>
        <Input
          type="text"
          name="password"
          placeholder="Enter email"
          value={password}
          onChange={(e) => onInputChange(e)}
        />

        <Button w={"full"} type="submit" mt={"1rem"}>
          Sign Up
        </Button>
      </form>

      <Stack>
        <HStack m={"1rem 0"}>
          <Divider />
          <Text fontSize="sm" whiteSpace="nowrap" color="muted">
            or continue with
          </Text>
          <Divider />
        </HStack>
        <HStack>
          <Button w={"full"} variant={"outline"} leftIcon={<FcGoogle />}>
            <Center>
              <Text>Sign in with Google</Text>
            </Center>
          </Button>
        </HStack>
      </Stack>
    </>
  );
};
export default SignupForm;
