const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    create,
    new: newFlight,
    show,
    newTicket
};

function newFlight(req, res){
    const newFlight = new Flight();
    const dt = newFlight.departs;
    let offset = dt.getTimezoneOffset() * 6000;
    let localDate = new Date(dt -offset).toISOString();
    res.render('flights/new', {title: 'New Flight', localDate});
};

function index(req, res){
    Flight.find({}, function(err, flightDocuments){
        console.log(flightDocuments)
        res.render('flights/index', {
            title: 'Flights',
            flights: flightDocuments
        })
    })
};

function show(req, res) {
    const newFlight = new Flight();
    const dt = newFlight.departs;
    let offset = dt.getTimezoneOffset() * 60000;
    let localDate = new Date(dt - offset).toISOString();  
    Flight.findById(req.params.id, function (err, flight) {
        console.log(flight, flight.destinations)
        Ticket.find({flight: flight._id}, function(err, tickets){
            res.render('flights/show', { title: 'Flight Details', localDate, flight , tickets });
        });
    });
  };

function create(req, res){
    Flight.create(req.body, function(err, flightDocuments){
        res.redirect('/flights')
    })
};

function newTicket(req, res){
    Flight.findById(req.params.id, function(err, flight){
        console.log(flight)
    res.render('tickets/new', {title: 'New Ticket', flight })
})
}