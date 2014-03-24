Rentals.ApplicationController = Ember.Controller.extend({
  actions: {
    signUp: function() {
      var facebook_auth = new Rentals.FacebookAuthenticator();
      var promise = facebook_auth.authenticate();
      promise.then(function(response){
        console.log("UserID: " + response.userID);
        var data = {
          'fb_id': response.userID,
          'renter_name': 'Andrew Beinstein',
          'email_address': 'andrew.beinstein@gmail.com'
        };
        // TODO: Fix this janky ass jquery shit
        jQuery.post('http://rent-stuff.herokuapp.com/renter/', data)
        .done(function(data){
          console.log("Data: " + data);
        })
        .fail(function(data){
          console.log("Failed: " + data);
        });

      }, function(error) {
        console.log("Error: " + error);
      });
    }
  }
});