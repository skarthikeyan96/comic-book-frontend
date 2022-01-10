import { Box, ChakraProvider, CSSReset } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import store from "../redux/store"; // Importing redux store

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <CSSReset />
        <Box p={4}>
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </Provider>
  );
};

export default MyApp;
