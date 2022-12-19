import React, { ReactNode, useState, useCallback } from "react";
import {
  Flex,
  SearchField,
  Picker,
  ActionButton,
  Item,
} from "@adobe/react-spectrum";

import { useAppDispatch } from "../../app/hooks";
import { executeSearchQuery } from "./searchSlice";
import { SearchEngine, SearchResult, SearchQuery } from "../../app/types";
import { capitalize } from "../../app/utils";

export function SearchBar() {
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState<string>("");
  const [engine, setEngine] = useState<SearchEngine>("google");

  const onSubmit = useCallback(async () => {
    const searchQuery: SearchQuery = { query, engine } as {
      query: string;
      engine: SearchEngine;
    };
    await dispatch(executeSearchQuery(searchQuery));
  }, [query, engine]);

  return (
    <Flex direction="row" gap="size-100" alignItems="center">
      <SearchField
        width="70%"
        label={
          engine === "both"
            ? `Search Google and Bing`
            : `Search ${capitalize(engine)}`
        }
        isRequired
        necessityIndicator="icon"
        value={query}
        onChange={setQuery}
        onSubmit={onSubmit}
      />
      <Picker
        width="20%"
        label="Pick a search engine"
        selectedKey={engine}
        onSelectionChange={(selection: any) => {
          setEngine(selection);
        }}
      >
        <Item key="google">Google</Item>
        <Item key="bing">Bing</Item>
        <Item key="both">Both</Item>
      </Picker>
      <ActionButton
        width="10%"
        isDisabled={query === ""}
        marginTop="size-300"
        type="submit"
        onPress={onSubmit}
      >
        Search
      </ActionButton>
    </Flex>
  );
}
