import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { apiClient } from "../Utils/apiClient";
import { RegisterUserInterface } from "./types";

export const Login = () => {
  const userContext = useContext(UserContext);
  const [registerUser, setRegisterUser] = useState<RegisterUserInterface>({
    username: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [login, setLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (key: string, value: string) => {
    setRegisterUser({ ...registerUser, [key]: value });
  };

  const handleRegisterClick = () => {
    apiClient
      .post(`/api/User/${login ? "login-user" : "create-user"}`, {
        userName: registerUser.username,
        password: registerUser.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        userContext.setUser({ username: registerUser.username });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsDisabled(
      !(registerUser.username.length > 0 && registerUser.password.length > 6)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerUser]);

  return (
    <Flex
      height="100vh"
      width="100vw"
      align="center"
      justify="center"
      backgroundColor="#222222"
    >
      <Text position="absolute" top={5} left={10} fontSize={20} color="#F3EFE0">
        RetroRetreat
      </Text>

      <Flex
        direction="column"
        width="25%"
        height="50%"
        align="center"
        justify="space-around"
      >
        <Text fontSize={50} color="#F3EFE0">
          Welcome
        </Text>
        <Input
          color="#F3EFE0"
          variant="flushed"
          placeholder="Username"
          onChange={(e) => {
            handleInputChange("username", e.target.value);
          }}
        />
        <Input
          color="#F3EFE0"
          variant="flushed"
          placeholder="Password"
          type="password"
          onChange={(e) => {
            handleInputChange("password", e.target.value);
          }}
        />

        <Button isDisabled={isDisabled} onClick={handleRegisterClick}>
          {login ? "Login" : "Register"}
        </Button>

        {login ? (
          <Flex
            justify="center"
            width="50vw"
            color="#F3EFE0"
            cursor="pointer"
            onClick={() => {
              setLogin(!login);
            }}
          >
            <Text>Don't have an accout? </Text>
            <Text marginLeft={1} textDecoration="underline">
              Create one!
            </Text>
          </Flex>
        ) : (
          <Flex
            justify="center"
            width="50vw"
            color="#F3EFE0"
            cursor="pointer"
            onClick={() => {
              setLogin(!login);
            }}
          >
            <Text>Already have an account? </Text>
            <Text marginLeft={1} textDecoration="underline">
              Login!
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
