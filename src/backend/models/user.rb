class User < ActiveRecord::Base
  has_secure_password

  validates :name, :phone, presence: true
  validates :name,
    format: { with: /\w+\s+\w+/i, message: "should contain firstname and lastname" }

  validates :password,
    length: { minimum: 8 },
    if: ->(record) { [record.new_record?, record.password.present?, record.password_confirmation.present?].any?  }

  def lastname
    name.split(/\s+/).last
  end

  def to_s
    name
  end
end
