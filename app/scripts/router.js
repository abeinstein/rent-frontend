Rentals.Router.map(function () {
  this.resource('rentals', { path: '/' });
  this.resource('login');
});

Rentals.ApplicationRoute = Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
  actions: {
    authenticateSession: function() {
      this.get('session').authenticate('authenticators:facebook', {});
    }
  }
});

Rentals.RentalsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('rental');
  }
});

// Rentals.LoginRoute = Ember.Route.extend({

// });