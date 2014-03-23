Rentals.RentalsController = Ember.ArrayController.extend({
  actions: {
    createRental: function() {
      // Get the rental description
      var description = this.get('description');
      var price = this.get('price');
      if (!description.trim()) { return; } // Do nothing if empty

      var rental = this.store.createRecord('rental', {
        description: description,
        price: price
      });

      this.set('description', '');
      this.set('price', '');

      rental.save();
    }
  }
});