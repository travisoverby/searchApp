require "json"
require "rest-client"
require "dotenv"

Dotenv.load

module SearchEngine
  class SearchQuery
    attr_reader :engine, :url, :headers

    def initialize(engine, query)
      @engine = engine
      @headers = nil
      case engine
      when "google"
        @url = build_google_search_query query
      when "bing"
        @url = build_bing_search_query query
        @headers = bing_headers
      end
    end

    def build_query(engine, query)
      case engine
      when "google"
        build_google_search_query query
      when "bing"
        build_bing_search_query query
    end

    private

    def build_google_search_url(query)
      endpoint = ENV["GOOGLE_API_ENDPOINT"]
      engine_id = ENV["GOOGLE_SEARCH_ENGINE_ID"]
      key = ENV["GOOGLE_API_KEY"]
      "#{endpoint}?key=#{key}&cx=#{engine_id}&q=#{query}"
    end

    def build_bing_search_url(query)
      endpoint = ENV['BING_API_ENDPOINT']
      "#{endpoint}?q=#{query}&count=50"
    end

    def bing_headers
      api_header = ENV["BING_API_HEADER"]
      api_key = ENV["BING_API_KEY"]
      {"#{api_header}" => api_key}
    end
  end
end