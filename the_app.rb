require 'sinatra'

TEXT =<<EOM
<!-- Thanks to http://slipsum.com/ for the text generator -->
<!-- start slipsum code -->

<h3>No, motherfucker</h3>
<p>Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun in American crime. Like they're actually proud of that shit.  </p>

<h3>I'm serious as a heart attack</h3>
<p>Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun in American crime. Like they're actually proud of that shit.  </p>

<h3>I'm serious as a heart attack</h3>
<p>Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'? </p>

<h3>Is she dead, yes or no?</h3>
<p>Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends. </p>

<!-- please do not remove this line -->

<div style="display:none;">
<a href="http://slipsum.com">lorem ipsum</a></div>

<!-- end slipsum code -->

EOM

class TheApp < Sinatra::Base
  set :environment, :production
  set :logging, true
  set :port, 5678
  set :root, Dir.pwd

  puts root
  get '/' do
    @text = TEXT
    haml :index
    
  end
  run! if app_file == $0
end
