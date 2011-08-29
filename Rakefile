require 'rake'
require 'sinatra'
require './the_app.rb'

desc 'run the server'
# so we don't have to run thin if we don't want to
task :run do |t|
  require './the_app.rb'
  TheApp.run!
end


begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end
