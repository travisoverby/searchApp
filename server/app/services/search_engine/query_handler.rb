require "json"
require "rest-client"
require "dotenv"
Dotenv.load

module SearchEngine
  class QueryHandler
    def initialize(engine)
      @engine = engine
    end
  
    def execute(query)
      case @engine
      when "google"
        execute_google_search query
      when "bing"
        execute_bing_search query
      when "both"
        execute_combined_search query
      end
    end
  
    private

    def execute_google_search(query)
      build_request_results "google", RestClient.get(build_get_request_url "google", query)
    end

    def execute_bing_search(query)
      build_request_results "bing", RestClient.get(build_get_request_url("bing", query), get_bing_headers("bing"))
    end

    def execute_combined_search(query) 
      google_results = execute_google_search(query)
      bing_results = execute_bing_search(query)

      combine_search_results(google_results, bing_results)
    end
  
    def build_get_request_url(engine, query)
      if engine == "google"
        url = ENV["GOOGLE_API_ENDPOINT"]
        engine_id = ENV["GOOGLE_SEARCH_ENGINE_ID"]
        key = ENV["GOOGLE_API_KEY"]

        "#{url}?key=#{key}&cx=#{engine_id}&q=#{query}"
      elsif engine == "bing"
        url = ENV['BING_API_ENDPOINT']

        "#{url}?q=#{query}&count=50"
      end
    end

    def get_bing_headers(engine)
      if engine == "bing"
        api_header = ENV["BING_API_HEADER"]
        api_key = ENV["BING_API_KEY"]
        {"#{api_header}" => api_key}
      end
    end

    def combine_search_results(google_results, bing_results)
      combined_results = []
      google_results.each do |result|
        combined_results.push result
      end
  
      bing_results.each do |result|
        combined_results.push result
      end

      combined_results
    end

    def build_request_results(engine, results)
      json_result = JSON.parse results.body
      built_results = []
      attr_map = {}

      if engine == "google"
        json_result = json_result["items"]
        attr_map[:title] = "title"
        attr_map[:link] = "link"
      elsif engine == "bing"
        json_result = json_result["webPages"]["value"]
        attr_map[:title] = "name"
        attr_map[:link] = "url"
      end

      json_result.each_with_index do |item, index|
        hash = {
          id: "#{engine}_#{index + 1}",
          engine: engine,
          title: item[attr_map[:title]],
          snippet: item["snippet"],
          link: item[attr_map[:link]]
        }
        built_results.push(hash)
      end

      built_results = built_results.sort_by { |res| res[:title] }
      built_results
    end
  end
end
