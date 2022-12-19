export type SearchEngine = 'google' | 'bing' | 'both';
export type SearchStatus = "inactive" | "idle" | "loading" | "failed";

export interface SearchStatusMetaData {
  statusCode: number;
  error: string;
  exception?: string;
}
export interface SearchStatusData {
  status: SearchStatus;
  metaData: SearchStatusMetaData;
}

export interface SearchQuery {
  engine: SearchEngine;
  query: string;
}

export interface SearchResult {
  engine: Omit<SearchEngine, "both">;
  title: string;
  snippet: string;
  link: string;
}
