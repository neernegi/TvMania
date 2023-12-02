import React from "react";
import Login from "./Login";
import {
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
} from "@chakra-ui/react";
import SignupForm from "./Register";

const SignInUpTab = () => {
  return (
    <Box>
      <Container
        borderRadius="xl"
        style={{ maxWidth: "400px", margin: "5% auto" }}
      >
        <Tabs isManual variant="enclosed">
          <TabList justifyContent={"center"}>
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignupForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};

export default SignInUpTab;
