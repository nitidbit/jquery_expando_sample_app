# jQuery Expando Plugin by 2rye

## Code
This plugin provides a method to have a simple expandable section of text which does not completely close,
but can be set to a particular open and close size with an open and close buttons.

Once you've got the source code, 

    % bundle install
    % bundle exec rake run

That should get you on your way.  Point your browser to [localhost:5678](http://localhost:5678) and you should see the plugin demo page.

## Tests
Part of having the test app means we get to include some framework-y stuff.  We've bundled jasmine and jasmine-headless-webkit with this pile of source.  If you want to try it out,

    % bundle exec rake jasmine:ci

will run the javascript tests in a local browser and report the results on the command line.

    % bundle exec rake jasmine

will start the jasmine server and let you hit http://localhost:8888 to check out the tests.

##Refs: 

* [2rye](http://www.2rye.com/)
* [jQuery](http://jquery.com/)
* [Jasmine](https://jasmine.github.io/)
* [Sinatra](http://www.sinatrarb.com)
* [Thin](http://code.macournoyer.com/thin/)
* [Samuel L. Ipsum](http://slipsum.com/)
