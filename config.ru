require 'rubygems'
require 'sinatra'

set :environment, :production
set :port, 5000
disable :run, :reload

require './the_app.rb'

DataMapper::setup(:default, "sqlite3://#{Dir.pwd}/the_app.db")

run TheApp.new
