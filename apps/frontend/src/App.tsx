import { ChakraBaseProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";

import { theme } from "./theme";
import { router } from "./router";

function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraBaseProvider>
  );
}

export default App;
