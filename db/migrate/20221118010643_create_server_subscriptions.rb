class CreateServerSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :server_subscriptions do |t|
      t.references :user, foreign_key: true, null: false, index: false
      t.references :server, foreign_key: true, null: false
      t.timestamps
    end
    add_index :server_subscriptions, [:user_id, :server_id], unique: true
  end
end
