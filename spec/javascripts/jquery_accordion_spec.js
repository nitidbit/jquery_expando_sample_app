// Uncomment for logging - make sure it's commented out for push/deploy 
// AM.__debug__ = true;
//
jQuery.fx.off = true;
describe("jquery accordion plugin", function() {
  describe('no button classes specified', function() {
    it('throws an error', function() {
      loadFixtures('jquery_accordion.html');
      var caught = false;
      var msg = '';
      try { 
        $('#accordion_me').accordion(); 
      }
      catch(err) { 
        caught = true; 
        msg = err;
      }
      expect(msg).toContain("Unable to initialize accordion plugin");
      expect(caught).toEqual(true);
    });
  });
  describe("one accordion initialized", function() {
    beforeEach(function() {
      loadFixtures('jquery_accordion.html');
      $('#accordion_me').accordion({toggleButtonClass:'accordion_open_close'});
    });
    it("container is less than viewport on init (fixture validation)", function() {
      expect($('#accordion_me').height()).toBeLessThan($('#accordion_me .accordion_contents').height());
    });
    it("click the open button opens the container to the size of the viewport", function() {
      $('#accordion_me .accordion_open_close').trigger('click');
      expect($('#accordion_me').height()).toEqual($('#accordion_me .accordion_contents').height() + 20); // + button height
    });
    it("click the open button sets the open class on the button", function() {
      $('#accordion_me .accordion_open_close').trigger('click');
      expect($('#accordion_me .accordion_open_close').hasClass('open')).toBeTruthy();
      expect($('#accordion_me .accordion_open_close').hasClass('closed')).toBeFalsy();
    });
    it("click the open button twice closes the container to it's original size", function() {
      $('#accordion_me .accordion_open_close').trigger('click');
      $('#accordion_me .accordion_open_close').trigger('click');
      expect($('#accordion_me').height()).toBeLessThan($('#accordion_me .accordion_contents').height());
      expect($('#accordion_me').height()).toEqual(40); // height + button
    });
    it("click the open button twice closes sets the closed class on the button", function() {
      $('#accordion_me .accordion_open_close').trigger('click');
      $('#accordion_me .accordion_open_close').trigger('click');
      expect($('#accordion_me .accordion_open_close').hasClass('closed')).toBeTruthy();
      expect($('#accordion_me .accordion_open_close').hasClass('open')).toBeFalsy();
    });
    describe('setting current_state', function() {
      it("returns closed class initially", function() {
        expect($('#accordion_me').data('currentState')).toEqual('closed');
      });
      it("returns true after it's been opened", function() {
        $('#accordion_me .accordion_open_close').trigger('click');
        expect($('#accordion_me').data('currentState')).toEqual('open');
      });
      it("returns false after it's been opened and closed", function() {
        $('#accordion_me .accordion_open_close').trigger('click');
        $('#accordion_me .accordion_open_close').trigger('click');
        expect($('#accordion_me').data('currentState')).toEqual('closed');
      });
    });
      
  });
  describe("two accordions initialized on the same page", function() {
    beforeEach(function() {
      afterCallback = jasmine.createSpy('afterCallback');
      loadFixtures('jquery_accordion.html');
      $('#accordion_me').accordion({toggleButtonClass:'accordion_open_close'});
      $('#custom_accordion').accordion({viewportClass: 'vp', contentsClass: 'contents', openClass: 'blurp', afterAnimateCallback:afterCallback, toggleButtonClass:'clickit'});
    });
    it("acts independently of the other accordion", function() {
      expect($('#custom_accordion').height()).toBeLessThan($('#custom_accordion .contents').height());
    });
    it("click the open button opens the correct container to the size of the viewport", function() {
      $('#custom_accordion .clickit').trigger('click');
      expect($('#accordion_me').height()).toEqual(40); // height + button
      expect($('#custom_accordion').height()).toBeGreaterThan(40);
    });
    it("click the open button sets the custom open class on the button", function() {
      $('#custom_accordion .clickit').trigger('click');
      expect($('#custom_accordion .clickit').hasClass('blurp')).toBeTruthy();
      expect($('#custom_accordion').data('currentState')).toEqual('blurp');
    });
    it("click triggers the afterCallback (on success)", function() {
      $('#custom_accordion .clickit').trigger('click');
      expect(afterCallback.mostRecentCall.object).toEqual($('#custom_accordion')[0]);
      expect(afterCallback).toHaveBeenCalled();
    });
  });
  describe("two button accordion", function() {
    /** closed height is 60 - 3 buttons at 20px each */
    beforeEach(function() {
      afterCallback2 = jasmine.createSpy('afterCallback2');
      loadFixtures('jquery_accordion.html');
      $('#accordion2').accordion({openButtonClass:'open_me', 
                                  viewportClass: 'vp',
                                  closeButtonClass:'close_me', afterAnimateCallback:afterCallback2});
    });
    it("click the open button opens the correct container to the size of the viewport", function() {
      $('#accordion2 .open_me').trigger('click');
      expect($('#accordion2').height()).toBeGreaterThan(60);
    });
    it("click the open button properly sets the current_state to open", function() {
      $('#accordion2 .open_me').trigger('click');
      expect($('#accordion2').data('currentState')).toEqual('open');
    });
    it("click the open button twice leaves everything open", function() {
      $('#accordion2 .open_me').trigger('click');
      $('#accordion2 .open_me').trigger('click');
      expect($('#accordion2').height()).toBeGreaterThan(60);
      expect($('#accordion2').data('currentState')).toEqual('open');
    });
    it("click triggers the afterCallback (on success)", function() {
      $('#accordion2 .open_me').trigger('click');
      expect(afterCallback2).toHaveBeenCalled();
    });
    it("click open sets open class on both buttons", function() {
      $('#accordion2 .open_me').trigger('click');
      expect($('#accordion2 .open_me.open').length).toEqual(1);
      expect($('#accordion2 .close_me.open').length).toEqual(1);
    });
    it("click open sets open class on both buttons", function() {
      $('#accordion2 .close_me').trigger('click');
      expect($('#accordion2 .open_me.closed').length).toEqual(1);
      expect($('#accordion2 .close_me.closed').length).toEqual(1);
    });
    it("click twice triggers the afterCallback once", function() {
      $('#accordion2 .open_me').trigger('click');
      $('#accordion2 .open_me').trigger('click');
      expect(afterCallback2).toHaveBeenCalled();
    });
    it("click open then close leaves the window closed", function() {
      $('#accordion2 .open_me').trigger('click');
      $('#accordion2 .close_me').trigger('click');
      expect($('#accordion2').height()).toEqual(60);
      expect($('#accordion2').data('currentState')).toEqual('closed');
    });
  });
});

