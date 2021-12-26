import { Box, ChakraProvider, CSSReset } from "@chakra-ui/react";
import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <CSSReset />
      <Box p={4}>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
};

export default MyApp;
