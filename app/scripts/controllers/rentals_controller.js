Rentals.RentalsController = Ember.ArrayController.extend({
  actions: {
    createRental: function() {
      // Get the rental description
      var controller = this;
      var description = this.get('description');
      var price = this.get('price');
      if (!description.trim()) { return; } // Do nothing if empty

      var store = this.get('store');
      var acc = this.get('session.account');

      acc.then(function(val) {
        var rental = store.createRecord('rental', {
          description: description,
          price: price,
          owner: val
        });


        controller.set('description', '');
        controller.set('price', '');

        rental.save();

        val.get('owned_rentals').then(function(rentals) {
          rentals.pushObject(rental);
          val.set('owned_rentals', rentals);
        });

      }, function(error) {
        console.log(error);
      });
      
    },

    requestRental: function(rental) {
      var acc = this.get('session.account');
      var store = this.get('store');

      var controller = this;

      acc.then(function(val) {
        rental.set('rentee', val);
        val.get('pending_rentals').then(function(rentals){
          rentals.pushObject(rental);
        });
        rental.save();
        controller.transitionToRoute('dashboard', val);
      });

      console.log("Request rental: " + rental.get('description'));
    }
  }
});