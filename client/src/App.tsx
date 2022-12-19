import React from "react";
import { defaultTheme, Provider, Flex, Grid } from "@adobe/react-spectrum";
import { Search } from "./features/search/Search";

function App() {
  return (
    <Provider theme={defaultTheme} height="100%">
      <Search />
    </Provider>
  );
}

export default App;
