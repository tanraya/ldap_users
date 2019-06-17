require 'net-ldap'

DN = "uid=%d,ou=Users,dc=acme,dc=com"

class LdapService
  attr_reader :config

  def initialize(config)
    config['auth']['method'] = config['auth']['method'].to_sym
    config['auth'].symbolize_keys!
    config.symbolize_keys!

    @config = config
  end

  def create(user, password)
    open do |ldap|
      ldap.add(
        dn: DN % user.id,
        attributes: {
          cn: user.name,
          sn: user.lastname,
          displayName: user.name,
          objectClass: ['inetOrgPerson'],
          mobile: user.phone,
          userPassword: password
        }
      )
    end
  end

  def update(user, password)
    operations = []

    if user.saved_change_to_name?
      operations << [:replace, :cn, user.name]
      operations << [:replace, :sn, user.lastname]
      operations << [:replace, :displayName, user.name]
    end

    operations << [:replace, :mobile, user.phone] if user.saved_change_to_phone?
    operations << [:replace, :userPassword, password] if user.saved_change_to_password_digest?

    if operations.any?
      open do |ldap|
        ldap.modify(
          dn: DN % user.id,
          operations: operations
        )
      end
    end
  end

  def destroy(user)
    open do |ldap|
      ldap.delete(dn: DN % user.id)
    end
  end

  def destroy_all
    params = {
      base: 'ou=Users,dc=acme,dc=com',
      filter: Net::LDAP::Filter.eq('uid', '*'),
      attributes_only: false,
      attributes: ['uid'],
      return_result: false
    }

    open do |ldap|
      ldap.search(params) do |entry|
        ldap.delete(dn: entry.dn)
      end
    end
  end

  def user_ids
    uids = []
    params = {
      base: 'ou=Users,dc=acme,dc=com',
      filter: Net::LDAP::Filter.eq('uid', '*'),
      attributes_only: false,
      attributes: ['uid'],
      return_result: false
    }

    open do |ldap|
      ldap.search(params) do |entry|
        uids << entry.uid.first.to_i
      end
    end

    uids
  end

  protected

  def open(&block)
    Net::LDAP.open(config) do |ldap|
      block.call(ldap)
    end
  end
end
