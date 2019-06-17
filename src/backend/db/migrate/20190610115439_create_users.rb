class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name, null: false, limit: 36
      t.string :phone, null: false, limit: 15
      t.string :password_digest, null: false, limit: 72
    end
  end
end
