const Ticket = require('../models/Ticket');
const axios = require('axios');
const { Op } = require('sequelize');
require('dotenv').config(); 

// Crear un nuevo ticket
exports.createTicket = async (req, res) => {
  const { name, description, difficulty } = req.body;

  try {
    const getRandomOffset = (max) => {
      return Math.floor(Math.random() * max);
    };
    
    const gifResponse = await axios.get('https://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: process.env.GIPHY_API_KEY,
        q: difficulty,
        limit: 1,
        offset: getRandomOffset(50)  // Genera un offset aleatorio para obtener diferentes GIFs
      }
    });
    
    const gifUrl = gifResponse.data.data[0].images.original.url;

    const newTicket = await Ticket.create({ 
      name, 
      description, 
      difficulty, 
      gifUrl, 
      status: 'Pending'
    });
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el ticket' });
  }
};

// Obtener todos los tickets con filtros
exports.getAllTickets = async (req, res) => {
  const { status, difficulty, startDate, endDate } = req.query;
  
  const whereConditions = {};

  if (status) {
    whereConditions.status = status; 
  }

  if (difficulty) {
    whereConditions.difficulty = difficulty;
  }

  if (startDate && endDate) {
    whereConditions.createdAt = {
      [Op.between]: [new Date(startDate), new Date(endDate)]
    };
  }

  try {
    const tickets = await Ticket.findAll({ where: whereConditions });
    res.json(tickets);
  } catch (error) {
    console.error('Error al obtener los tickets:', error);
    res.status(500).json({ error: 'Error al obtener los tickets' });
  }
};

// Editar un ticket
exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket no encontrado' });

    const { name, description, difficulty } = req.body;
    ticket.name = name || ticket.name;
    ticket.description = description || ticket.description;
    ticket.difficulty = difficulty || ticket.difficulty;

    // Función para generar un offset aleatorio
    const getRandomOffset = (max) => {
      return Math.floor(Math.random() * max); 
    };

    if (difficulty) {
      const gifResponse = await axios.get('https://api.giphy.com/v1/gifs/search', {
        params: {
          api_key: process.env.GIPHY_API_KEY, 
          q: difficulty,
          limit: 1,
          offset: getRandomOffset(50)
        }
      });
      ticket.gifUrl = gifResponse.data.data[0].images.original.url;
    }

    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el ticket' });
  }
};


// Eliminar un ticket
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket no encontrado' });

    await ticket.destroy();
    res.json({ message: 'Ticket eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el ticket' });
  }
};

// Actualizar el estado de un ticket (completado/no completado)
exports.updateTicketStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }

    ticket.status = status;
    await ticket.save();

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado del ticket' });
  }
};

// Filtrar tickets por estado, dificultad o fecha
exports.filterTickets = async (req, res) => {
  const { status, difficulty, startDate, endDate } = req.query;

  try {
    const whereConditions = {};
    
    if (status) whereConditions.status = status;
    if (difficulty) whereConditions.difficulty = difficulty;
    if (startDate && endDate) {
      whereConditions.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const tickets = await Ticket.findAll({ where: whereConditions });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar los tickets' });
  }
};
