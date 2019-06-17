require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/cross_origin'
require 'json'

require './services/user_service'
require './services/ldap_service'

set :database_file, 'config/database.yml'

ldap_config = YAML.load_file('./config/ldap.yml')[Sinatra::Application.environment.to_s]
ldap_service = LdapService.new(ldap_config)
user_service = UserService.new(ldap_service)

configure do
  enable :cross_origin
end

options '*' do
  response.headers['Access-Control-Allow-Methods'] = 'GET, PATCH, POST, DELETE, OPTIONS'
  response.headers['Access-Control-Allow-Headers'] = 'Authorization, Content-Type, Accept'
  200
end

before do
  content_type 'application/json'
  response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
end

def result(user, success)
  {
    success: success,
    errors: user.errors.messages,
    result: user.as_json(only: [ :id, :name, :phone ])
  }.to_json
end

### App
# Retrieve all users
get '/' do
  user_service.all.to_json
end

# Check is users synced with LDAP
get '/synced' do
  {
    synced: user_service.synced_with_ldap?
  }.to_json
end

# Sync users with LDAP
patch '/sync' do
  {
    synced: user_service.sync_with_ldap!
  }.to_json
end

# Update user
patch '/:id' do
  payload = JSON.parse(request.body.read).symbolize_keys
  user = user_service.update(params[:id], payload)

  result(user, user.valid?)
end

# Create user
post '/' do
  payload = JSON.parse(request.body.read).symbolize_keys
  user = user_service.create(payload)

  result(user, user.valid?)
end

delete '/:id' do
  user = user_service.destroy(params[:id])

  result(user, user.destroyed?)
end
