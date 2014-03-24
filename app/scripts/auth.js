Rentals.FacebookAuthenticator = Ember.SimpleAuth.Authenticators.Base.extend({
  restore: function(properties) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(properties.accessToken)) {
        resolve(properties);
      } else {
        reject();
      }
    });
  },

  authenticate: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      FB.getLoginStatus(function(fbResponse) {
        if (fbResponse.status === 'connected') {
          Ember.run(function() {
            resolve({accessToken: fbResponse.authResponse.accessToken,
              userID: fbResponse.authResponse.userID
            });
          });
        } else {
          FB.login(function(fbResponse) {
            if (fbResponse.authResponse) {
              Ember.run(function() {
                resolve({accessToken: fbResponse.authResponse.accessToken,
                  userID: fbResponse.authResponse.userID});
              });
            } else {
              reject();
            }
          }, {scope: 'email'});
        }
      });
    });
  },
  invalidate: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      FB.logout(function(response) {
        Ember.run(resolve);
      });
    });
  }
});