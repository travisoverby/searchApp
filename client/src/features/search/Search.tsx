import React from "react";
import { Flex, View, Heading, Content } from "@adobe/react-spectrum";

import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";

export function Search() {
  return (
    <Flex direction="column" gap="size-500" alignItems="center" height="100%">
      <View height="size-800">
        <Heading level={1} width="100%">
          Enter your search query
        </Heading>
      </View>
      <Content width="80%">
        <View flexBasis="auto" paddingBottom="size-200">
          <SearchBar />
        </View>
        <View marginTop="size-500">
          <SearchResults />
        </View>
      </Content>
    </Flex>
  );
}
