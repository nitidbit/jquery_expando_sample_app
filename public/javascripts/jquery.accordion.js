/** 
    jQuery.accordion plugin

    Given a block that you want partially open all the time, use this plugin to animate opening from
    partially open to fully open.
  
    The plugin assumes a dom structure like this:

    <div id="accordion_me">
      <div class="accordion_viewport">
        <div class="accordion_contents">
          contents to be accordioned
        </div>
      </div>
      <!-- either use 1 toggle button -->
      <div class="accordion_toggle"></div>
      <!-- or 2 buttons which have open/close -->
      <div class="accordion_open_btn"></div>
      <div class="accordion_close_btn"></div>
    </div>

    with style
      #accordion_me .accordion_viewport { overflow:hidden;  height: <closed desired height>; position:relative; }
      #accordion_me .accordion_contents { position: absolute; top: 0; left: 0; }

    possible settings are (with their defaults)
      viewportClass: 'accordion_viewport'
      contentsClass: 'accordion_contents'
      toggleButtonClass: 'accordion_toggle'
      openButtonClass: 'accordion_open_btn'
      closeButtonClass: 'accordion_close_btn'
      openClass: 'open'
      closeClass: 'closed'
      duration: 1000,
      easing: 'easeOutQuad'
      afterAnimateCallback: function() {}
    
    Because this is built to either have a toggle button which opens and closes the view, 
    or 2 buttons which are used individually for open or close, you must specify at least
    the 'toggleButtonClass' or both 'openButtonClass' and 'closeButtonClass'.
    The initialization will fail if these conditions are not met.

    openClass is the class used to style the button when the accordion is open.
    closeClass is the class used to style the button when the accordion is closed.
    use .open and .close classes to modify the open/close button styling.
    afterAnimateCallback is a callback function that is called after the animation is all done.

    After the animation, the openClass or closeClass is set in the element's data hash with the
    key 'currentState'.  You can use this to figure out if the element is open or closed. 

    Sample Usage (given the above DOM structure) would be
    $('#accordion_me').accordion({toggleButtonClass: 'toggle_me'});

    Sample Usage with options:
    $('#accordion_me').accordion({ openClass: 'active',
                                   openButtonClass: 'open_btn',
                                   closeButtonClass: 'close_btn',
                                   afterAnimateCallback:function() { 
                                      alert("The current state of the box is " + $('#accordion_me').data('currentState'));
                                   }
                                 });


*/      

$.accordionDefaults = {
  viewportClass: 'accordion_viewport',
  contentsClass: 'accordion_contents',
  openClass: 'open',
  closeClass: 'closed',
  duration: 1000,
  easing: 'easeOutQuad',
  afterAnimateCallback: function() {},
};


$.fn.accordion = function( method ) {
  var inArgs = arguments;
  var methods = {
    init: function(options) {
      /* make sure we know how to find a control button */
      options = options || {};
      if (!((options.toggleButtonClass && options.toggleButtonClass.length) ||
            (options.openButtonClass && options.closeButtonClass && options.openButtonClass.length && options.closeButtonClass.length))) {
        throw "Unable to initialize accordion plugin.  You must specify either toggleButtonClass or both openButtonClass and closeButtonClass in your initialization";
      }

      var opts = $.extend({},$.accordionDefaults, options);
      var $this = $(this);
      opts.currentState = opts.closeClass;
      $this.data(opts);
      var $viewport = $('.' + opts.viewportClass, this);
      var $contents = $('.' + opts.contentsClass, this);
      var _that = this;
      
      var open_height = $contents.height();
      var closed_height = $viewport.height();
      var $container = $(this);

      var easing = (jQuery.easing[opts.easing] ? opts.easing : 'linear');
      /* toggle button bind */
      $('.' + opts.toggleButtonClass, this).bind('click', function() {
        var after_state = $container.data('openClass');
        var before_state = $container.data('closeClass');
        var new_height = open_height;
        if ($container.data('currentState') != $container.data('closeClass')) {
          after_state = $container.data('closeClass');
          before_state = $container.data('openClass');
          new_height = closed_height;
        }
        $('.' + $container.data('toggleButtonClass'), _that).removeClass(before_state).addClass(after_state);
        $viewport.stop().animate({
          height: new_height
        }, $container.data('duration'), easing, function() {
          // set the current state and call the callback
          $container.data('currentState',after_state);
          $container.data('afterAnimateCallback').call($container[0]);
        });
      });
      /* open button bind */
      $('.' + opts.openButtonClass, this).bind('click', function() {
        var after_state = $container.data('openClass');
        var before_state = $container.data('closeClass');
        $('.' + $container.data('openButtonClass'), _that).removeClass(before_state).addClass(after_state);
        $('.' + $container.data('closeButtonClass'), _that).removeClass(before_state).addClass(after_state);
        $viewport.stop().animate({
          height: open_height
        }, $container.data('duration'), easing, function() {
          // set the current state and call the callback
          $container.data('currentState',after_state);
          $container.data('afterAnimateCallback')();
        });
      });
      /* close button bind */
      $('.' + opts.closeButtonClass, this).bind('click', function() {
        var after_state = $container.data('closeClass');
        var before_state = $container.data('openClass');
        $('.' + $container.data('openButtonClass'), _that).removeClass(before_state).addClass(after_state);
        $('.' + $container.data('closeButtonClass'), _that).removeClass(before_state).addClass(after_state);
        $viewport.stop().animate({
          height: closed_height
        }, $container.data('duration'), easing, function() {
          // set the current state and call the callback
          $container.data('currentState',after_state);
          $container.data('afterAnimateCallback')();
        });
      });
    },
  };
  return this.each(function() {
    // If options exist, send them to init
    // and merge with default settings
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, inArgs );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.myPlugin' );
    }
    return methods.init.apply( this, inArgs );
  });
};