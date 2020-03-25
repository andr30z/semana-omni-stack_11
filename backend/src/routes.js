const express = require('express');
const routes = express.Router();
const connection = require('./database/connection');
const ongController = require('./controller/OngController');
const incidentController = require('./controller/IncidentController');
const profileController = require('./controller/ProfileController');
const sessionController = require('./controller/SessionController');

routes.get('/ongs', ongController.index);
routes.get('/incident', incidentController.index);
routes.get('/profile', profileController.index)

routes.post('/ongs', ongController.create);
routes.post('/incident',incidentController.create);
routes.post('/sessions', sessionController.create)

routes.delete('/incident/:id',incidentController.delete)

module.exports = routes;