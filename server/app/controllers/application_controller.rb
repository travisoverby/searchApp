class ApplicationController < ActionController::API
  rescue_from ActionController::ParameterMissing, with: :handle_parameter_missing

  def handle_parameter_missing(exception)
    puts "this is the exception: #{exception}"
    render json: { error: exception.message, statusCode: 400 }, status: :bad_request
  end
end
