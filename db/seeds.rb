# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require "open-uri"

puts "Destroying tables..."
# Unnecessary if using `rails db:seed:replant`
User.destroy_all

puts "Resetting primary keys..."
# For easy testing, so that after seeding, the first `User` has `id` of 1
ApplicationRecord.connection.reset_pk_sequence!('users')

puts "Creating users..."
# Create one user with an easy to remember username, email, and password:
user = User.create!(
  username: 'Demo-lish', 
  email: 'demo@user.io', 
  password: 'password'
)

file = URI.open("https://datcord-seeds.s3.us-west-1.amazonaws.com/datcorddefault.jpeg")
user.photo.attach(io: file, filename: "demo")


puts "Done!"
