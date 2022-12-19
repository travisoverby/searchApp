import {
  SEARCH_API_ENDPOINT,
} from "../../app/constants";

import {
  SearchEngine,
} from "../../app/types";

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export async function executeQuery(query: string, engine: SearchEngine) {
    const url = new URL(SEARCH_API_ENDPOINT);
    url.searchParams.set('engine', engine);
    url.searchParams.set('text', query);
    const response = await fetch(url);
    console.log('response: ', response);
    const responseJSON = await response.json();
    console.log('responseJSON: ', responseJSON);
    return responseJSON;
}
