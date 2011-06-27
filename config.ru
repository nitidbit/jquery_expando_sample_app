require 'rubygems'
require 'sinatra'
require 'datamapper'

disable :run, :reload

require './the_app.rb'

run TheApp.new
