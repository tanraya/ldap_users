require 'faker'
require_relative '../services/user_service'
require_relative '../services/ldap_service'

ldap_config = YAML.load_file(File.dirname(__FILE__) + '/../config/ldap.yml')['development']
ldap_service = LdapService.new(ldap_config)
user_service = UserService.new(ldap_service)

user_service.remove_all

10.times do
  password = Faker::Internet.password(8)

  user_service.create(
    name: Faker::Name.unique.name,
    phone: Faker::PhoneNumber.phone_number_with_country_code,
    password: password,
    password_confirmation: password
  )
end

# Add user only to DB, not to LDAP
password = Faker::Internet.password(8)

User.create(
  name: Faker::Name.unique.name,
  phone: Faker::PhoneNumber.phone_number_with_country_code,
  password: password,
  password_confirmation: password
)
