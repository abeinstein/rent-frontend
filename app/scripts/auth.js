Rentals.FacebookAuthenticator = Ember.SimpleAuth.Authenticators.Base.extend({
  restore: function(properties) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(properties.userID)) {
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
          console.log("AccountID: " + fbResponse.authResponse.userID);
          Ember.run(function() {
            resolve({accessToken: fbResponse.authResponse.accessToken,
              accountID: fbResponse.authResponse.userID
            });
          });
        } else {
          FB.login(function(fbResponse) {
            console.log(fbResponse.authResponse);
            if (fbResponse.authResponse) {
              Ember.run(function() {
                resolve({accessToken: fbResponse.authResponse.accessToken,
                  accountID: fbResponse.authResponse.userID});
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
      Ember.run(resolve);
      FB.logout(); // Sometimes this doesn't work, but fuck it for now. Some sort of cookie issue
    });
  }
});