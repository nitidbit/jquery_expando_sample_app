require 'sinatra'

class TheApp < Sinatra::Base
  set :environment, :production
  set :logging, true
  set :port, 5678
  set :root, Dir.pwd

  puts root
  get '/' do
    'yo'
  end
  run! if app_file == $0
end
