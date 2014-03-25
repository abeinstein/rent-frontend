Rentals.Router.map(function () {
  this.resource('rentals');
  this.resource('login');
  this.resource('dashboard', { path: '/dashboard/:user_id'});
});

Rentals.ApplicationRoute = Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
  actions: {
    authenticateSession: function() {
      this.get('session').authenticate('authenticators:facebook', {});
    }
  }
});

Rentals.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('rentals');
  }
});

Rentals.RentalsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('rental');
  }
});

Rentals.DashboardRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('renter', params.user_id);
  }
});

// Rentals.LoginRoute = Ember.Route.extend({

// });