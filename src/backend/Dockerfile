FROM ruby:2.5

RUN mkdir -p /usr/src/backend

WORKDIR /usr/src/backend

COPY src/backend/* ./

RUN set -x && bundle install
RUN set -x && rm -rf /usr/local/bundle/cache

ENV RACK_ENV=development
ENV RAILS_ENV=development

EXPOSE 9000
CMD ["shotgun", "index.rb", "-p", "9000", "-o", "0.0.0.0"]
