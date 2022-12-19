module SearchEngine
  class QueryExecutor
    def self.execute(engine, query)
      handler = SearchEngine::QueryHandler.new engine
      handler.execute query
    end
  end
end