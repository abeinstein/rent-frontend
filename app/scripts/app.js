var FacebookLoader = Ember.Object.create({
  setup: function(settings) {
    this.loadScript().then(function(fb) {
      console.log('in setup callabck');
    });
  },
  loadScript: function() {
    return new Ember.RSVP.Promise(function(resolve) {
      window.fbAsyncInit = function() {
        FB.init({
          appId: '268533916642683'
        });
        resolve();
        console.log('in fbAsyncInit');
      };
      (function(d){
       var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement('script'); js.id = id; js.async = true;
       js.src = "//connect.facebook.net/en_US/all.js";
       ref.parentNode.insertBefore(js, ref);
      }(document));
    });
  }
});

FacebookLoader.setup();

Ember.Application.initializer({
  name: 'authentication',
  initialize: function(container, application) {
    Ember.SimpleAuth.Session.reopen({
            account: function() {
              var user_id = this.get('userID');
              if (!Ember.isEmpty(user_id)) {
                return container.lookup('store:main').find('renter', {fb_id: user_id});
              }
              console.log('In init: ' + user_id);
            }.property('userID')
          });

    container.register('authenticators:facebook', Rentals.FacebookAuthenticator);
    Ember.SimpleAuth.setup(container, application);
  }
});

var Rentals = window.Rentals = Ember.Application.create();

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');
require('scripts/auth');
