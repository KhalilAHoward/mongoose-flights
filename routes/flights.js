var express = require('express');
var router = express.Router();

const flightCtrl = require('../controllers/flights');

//GET ROUTES
router.get('/', flightCtrl.index);
router.get('/new', flightCtrl.new);
router.get('/:id', flightCtrl.show);
router.get('/:id/tickets/new', flightCtrl.newTicket);

//POST ROUTES
router.post('/', flightCtrl.create);


module.exports = router;