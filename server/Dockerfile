FROM ruby:3.1

WORKDIR /app
COPY Gemfile Gemfile.lock ./

RUN apt-get update -qq && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
  && apt install nodejs \
  && npm install -g yarn \
  && bundle config --global frozen 1 \
  && bundle install

COPY . .

RUN chmod +x ./entrypoint.sh \
  && yarn install
ENTRYPOINT ["./entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]