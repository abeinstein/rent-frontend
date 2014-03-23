//Rentals.ApplicationAdapter = DS.FixtureAdapter;
Rentals.RentalAdapter = DS.RESTAdapter.extend({
  host: 'http://rent-stuff.herokuapp.com'
});

Rentals.RentalSerializer = DS.RESTSerializer.extend({
  serialize: function(rental, options) {
    var json = {
      'textbook_name': rental.get('description'),
    };

    // if (options.includeId) {
    //   json.POST_ID_ = post.get('id');
    // }

    return json;
  },

  keyForAttribute: function(attr) {
    if (attr === 'description') {
      return 'textbook_name';
    } else if (attr === 'price') {
      return 'rental_price';
    } else {
      return this._super(attr);
    }
  }
});