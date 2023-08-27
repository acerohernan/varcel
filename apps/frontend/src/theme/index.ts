import { extendBaseTheme } from "@chakra-ui/react";
import chakraTheme from "@chakra-ui/theme";

const { Button, Heading } = chakraTheme.components;

export const theme = extendBaseTheme({
  components: {
    Heading,

    Button,
  },
});
