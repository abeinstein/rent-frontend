Rentals.Rental = DS.Model.extend({
  description: DS.attr('string'),
  datePosted: DS.attr('date'),
  dateDue: DS.attr('date'),
  price: DS.attr('number')
});

Rentals.Rental.FIXTURES = [
{
  id: 1,
  description: "Honors Calculus",
  price: 15
},
{
  id: 2,
  description: "Introduction to Cell Biology",
  price: 10
},
{
  id: 3,
  description: "Rudin's Analysis",
  price: 20
},
{
  id: 4,
  description: "Dummit and Foote's Abstract Algebra (4th ed)",
  price: 30
}
];