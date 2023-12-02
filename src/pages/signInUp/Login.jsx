import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  InputGroup,
  InputRightElement,
  HStack,
  VStack,
  Divider,
  Checkbox,
  Image,
  Stack,
  Center,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";

const loginInitialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [login, setLogin] = useState(loginInitialValues);

  const { email, password } = login;
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        alert('login successfully')
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Invalid email or password");
    }
  };

  return (
    <>
      <FormControl mt={"1rem"}>
        <VStack>
          <HStack></HStack>
        </VStack>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          type="email"
          name="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => onInputChange(e)}
        />
        <FormLabel mt={"1rem"} htmlFor="password">
          Password
        </FormLabel>

        <Input
          pr="4.5rem"
          name="password"
          value={password}
          type="text"
          placeholder="Enter password"
          onChange={(e) => onInputChange(e)}
        />
        <Button
          mt={"1.4rem"}
          width={"full"}
          type="submit"
          variant={"solid"}
          onClick={submitHandler}
        >
          Login
        </Button>
      </FormControl>

      <Stack>
        <HStack m={"1rem 0"}>
          <Divider />
          <Text fontSize="sm" whiteSpace="nowrap" color="muted">
            or continue with
          </Text>
          <Divider />
        </HStack>
        <HStack>
          <Button
            w={"full"}
            variant={"outline"}
            leftIcon={<FcGoogle />}
          ></Button>
        </HStack>
      </Stack>
    </>
  );
};

export default Login;
