require "json"
class SearchController < ApplicationController
  def index
    query_results = SearchEngine::QueryExecutor.execute(engine_params, query_params)
    render json: query_results
  end

  private
  
  def engine_params
    params.require(:engine)
  end

  def query_params
    params.require(:text)
  end
end
