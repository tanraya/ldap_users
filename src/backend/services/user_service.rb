require './models/user'
require './services/ldap_service'

class UserService
  attr_reader :ldap_service

  def initialize(ldap_service)
    @ldap_service = ldap_service
  end

  def all
    User.select(:id, :name, :phone)
  end

  def create(attrs)
    user = User.new(
      name: attrs[:name],
      phone: attrs[:phone],
      password: attrs[:password],
      password_confirmation: attrs[:password]
    )

    if user.valid?
      user.save
      ldap_service.create(user, attrs[:password])
    end

    user
  end

  def update(id, attrs)
    user = User.find(id)

    if user.update(attrs)
      ldap_service.update(user, attrs[:password])
    end

    user
  end

  def destroy(id)
    user = User.find(id)
    user.destroy

    ldap_service.destroy(user) if user.destroyed?

    user
  end

  def synced_with_ldap?
    user_ids = User.pluck(:id)
    ldap_user_ids = ldap_service.user_ids

    !(user_ids - ldap_user_ids).any?
  end

  def sync_with_ldap!
    user_ids = User.pluck(:id)
    ldap_user_ids = ldap_service.user_ids

    (user_ids - ldap_user_ids).each do |user_id|
      user = User.find(user_id)

      # Note: in real-world we should send password to email to notify an user
      ldap_service.create(user, SecureRandom.alphanumeric(8))
    end

    true
  end

  def remove_all
    User.destroy_all
    ldap_service.destroy_all
  end
end
