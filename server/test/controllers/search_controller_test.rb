require "test_helper"

class SearchControllerTest < ActionDispatch::IntegrationTest
  test "runs a search query against google" do
    get "/search?engine=google&text=test"
    assert_response :success
  end

  test "runs a search query against bing" do
    get "/search?engine=bing&text=test"
    assert_response :success
  end

  test "runs a search query against both google and bing" do
    get "/search?engine=both&text=test"
    assert_response :success
  end
end
