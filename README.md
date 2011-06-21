# Simple Sinatra App template

This app is a simple starting point for a Sinatra app which uses Capistrano to deploy and run the app with a thin server.

You'll need to modify the thin/*.yml config files and the app main file and name along with config.ru (which starts the app by class name).

##Notes:

I went through the process of cloning this and starting up a new app from this template.  There were a few extra steps i had to do to make things really roll...

* add a new user on my server 
  * added a user, we'll call her Jane
  * set up jame's ssh keys so she can get to the git repo
  * add jane to rvm (system wide setup) so she can install 
* setup sinatra_app.conf file which looks much like [this gist](https://gist.github.com/1037191)
  * it requires Apache modules proxy, proxy_http, proxy_balancer, and rewrite
* the cap deploy was seemingly unhappy with an empty dir.
  * created shared dir
  * created shared/log
* add Jane to the sudoers list so she could restart apache on deploy

##Refs: 

* [Sinatra](www.sinatrarb.com)
* [Capistrano](https://github.com/capistrano/capistrano/wiki)
* [Thin](http://code.macournoyer.com/thin/)
