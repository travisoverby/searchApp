import React, { ReactNode, useState, useCallback } from "react";
import {
  Heading,
  TooltipTrigger,
  Tooltip,
  Link,
  TableView,
  TableHeader,
  IllustratedMessage,
  Content,
  Column,
  Row,
  Cell,
  TableBody,
} from "@adobe/react-spectrum";
import NotFound from "@spectrum-icons/illustrations/NotFound";
import { useAppSelector } from "../../app/hooks";
import { searchResults, searchStatus } from "./searchSlice";
import { capitalize } from "../../app/utils";

export function SearchResults() {
  const results = useAppSelector(searchResults);
  const status = useAppSelector(searchStatus);

  const renderEmptyState = useCallback(() => {
    return (
      <IllustratedMessage>
        <NotFound />
        <Heading>No results</Heading>
        <Content>No results found</Content>
      </IllustratedMessage>
    );
  }, []);

  const renderCell = useCallback((item: any, columnKey: any) => {
    let text = item[columnKey];
    if (columnKey === "link") {
      return (
        <Cell>
          <TooltipTrigger>
            <Link>
              <a href={text} target="_blank">
                {text}
              </a>
            </Link>
            <Tooltip placement="right">{text}</Tooltip>
          </TooltipTrigger>
        </Cell>
      );
    }

    if (columnKey === "engine") {
      text = capitalize(text);
    }

    return <Cell>{text}</Cell>;
  }, []);

  return (
    <TableView
      aria-label="Results table"
      height="60vh"
      overflowMode="truncate"
      renderEmptyState={renderEmptyState}
    >
      <TableHeader>
        <Column key="engine">Search Engine</Column>
        <Column key="title">Title</Column>
        <Column key="snippet">Snippet</Column>
        <Column key="link">Link</Column>
      </TableHeader>
      <TableBody
        items={status === "loading" ? [] : results}
        loadingState={status === "loading" ? "loading" : "idle"}
      >
        {(item: any) => (
          <Row>{(columnKey: any) => renderCell(item, columnKey)}</Row>
        )}
      </TableBody>
    </TableView>
  );
}
