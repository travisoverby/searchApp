import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { SearchEngine, SearchQuery, SearchResult, SearchStatus } from '../../app/types';
import { executeQuery } from './searchAPI';

export interface SearchState {
  status: SearchStatus;
  results: SearchResult[];
}

const initialState: SearchState = {
  status: "idle",
  results: [],
};

export const executeSearchQuery = createAsyncThunk(
  "search/executeQuery",
  async ({ query, engine }: SearchQuery) => {
    const results = await executeQuery(query, engine);
    console.log('results in thunk: ', results);
    if (results.error) {
      const { error, status, exception } = results;
      throw new Error(JSON.stringify({
        error,
        status,
        exception,
      }));
    }
    return results;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setStatus: (state: SearchState, action: PayloadAction<SearchStatus>) => {
      state.status = action.payload;
    },
    resetResults: (state: SearchState) => {
      state.results = [];
    },
    setResults: (state: SearchState, action: PayloadAction<SearchResult[]>) => {
      state.results = action.payload; 
    },
    updateResults: (state: SearchState, action: PayloadAction<SearchResult[]>) => {
      state.results = [ ...state.results, ...action.payload ];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(executeSearchQuery.pending, (state: SearchState, action) => {
        console.log('pending action: ', action);
        state.status = "loading";
      })
      .addCase(executeSearchQuery.fulfilled, (state: SearchState, action: PayloadAction<SearchResult[]>) => {
        console.log('idle action: ', action);
        state.status = "idle";
        state.results = action.payload;
      })
      .addCase(executeSearchQuery.rejected, (state: SearchState, action) => {
        state.status = "failed";
        state.results = [];
      });
  },
});

export const { resetResults, setResults, updateResults } = searchSlice.actions;
export const searchResults = (state: RootState) => state.search.results;
export const searchStatus = (state: RootState) => state.search.status;

export default searchSlice.reducer;