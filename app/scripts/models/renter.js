Rentals.Renter = DS.Model.extend({
  fb_id: DS.attr('string'),
  name: DS.attr('string'),
  email: DS.attr('email'),
  pending_rentals: DS.hasMany('rental', {
    inverse: 'rentee',
    async: true
  }),
  owned_rentals: DS.hasMany('rental', {
    inverse: 'renter',
    async: true
  })
});


Rentals.Renter.FIXTURES = [
  {
    id: '1084382373',
    fb_id: '1084382373',
    name: 'Andrew Beinstein',
    email: 'andrew.beinstein@gmail.com',
    pending_rentals: [1],
    owned_rentals: [2]
  }, 
  {
    id: '74534523234',
    fb_id: '74534523234',
    name: 'Adam Gluck',
    email: 'adamt.gluck@gmail.com',
    pending_rentals: [2, 3],
    owned_rentals: [4]
  },
  {
    id: '74534523234',
    fb_id: '328772342',
    name: 'Mitch Levy',
    email: 'gc2maxpro@gmail.com',
    pending_rentals: [4],
    owned_rentals: [1, 3]
  }
];