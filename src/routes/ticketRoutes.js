const express = require('express');
const ticketController = require('../controllers/ticketController');
const router = express.Router();

router.post('/', ticketController.createTicket);
router.get('/', ticketController.getAllTickets);
router.put('/:id', ticketController.updateTicket);
router.delete('/:id', ticketController.deleteTicket);
router.patch('/:id/status', ticketController.updateTicketStatus);


module.exports = router;
