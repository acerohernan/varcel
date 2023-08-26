import { Button, ChakraBaseProvider } from "@chakra-ui/react";
import { theme } from "./theme";

function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <h1>Hello world</h1>
      <Button>Hi</Button>
    </ChakraBaseProvider>
  );
}

export default App;
