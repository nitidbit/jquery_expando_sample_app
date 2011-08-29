require 'sinatra'

class TheApp < Sinatra::Base
  set :environment, :production
  set :logging, true
  set :root, Dir.pwd
  set :port, 5678
  APP_ROOT = root

  get '/' do
    'yo'
  end
  run! if app_file == $0
end
