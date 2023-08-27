import { Box, Button, Heading } from "@chakra-ui/react";
import { BsGithub } from "react-icons/bs";
import { LiaGitlab } from "react-icons/lia";
import { FaBitbucket } from "react-icons/fa";

const LoginPage = () => {
  return (
    <Box
      width="100%"
      height="100vh"
      backgroundColor="#000000"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <Heading textColor="white" size="md" textAlign="center">
          Login to Latin Station
        </Heading>
        <Box display="grid" gap={4} marginTop="8">
          <Button leftIcon={<BsGithub />} width="100%" size="sm" fontSize="0.8rem" paddingX={9} paddingY={4}>
            Continue to GitHub
          </Button>
          <Button
            leftIcon={<LiaGitlab />}
            width="100%"
            size="sm"
            colorScheme="purple"
            fontSize="0.8rem"
            paddingX={9}
            paddingY={4}
          >
            Continue to GitLab
          </Button>
          <Button
            leftIcon={<FaBitbucket />}
            width="100%"
            size="sm"
            colorScheme="blue"
            fontSize="0.8rem"
            paddingX={9}
            paddingY={4}
          >
            Continue to GitBucket
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
