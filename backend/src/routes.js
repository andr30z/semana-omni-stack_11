const express = require('express');
const routes = express.Router();
const connection = require('./database/connection');
const ongController = require('./controller/OngController');
const incidentController = require('./controller/IncidentController');
const profileController = require('./controller/ProfileController');
const sessionController = require('./controller/SessionController');
const { Joi, celebrate, Segments } = require("celebrate");

routes.get('/ongs', ongController.index);
routes.get('/incident', celebrate({
  [Segments.QUERY]:Joi.object().keys({
    page:Joi.number()
  })
}), incidentController.index);

routes.get('/profile', celebrate({
  [Segments.BODY]: Joi.object({
    authorization:Joi.string().required()
  }).keys().unknown()
}),profileController.index)

routes.post('/ongs',celebrate({
  [Segments.BODY]: Joi.object().keys({
    name:Joi.string().required(),
    email:Joi.string().required().email(),
    whatsapp:Joi.string().required().regex(/^[0-9]{10,11}/),//agora o whatsapp tem q ter entre 11 e 10 digitos
    city:Joi.string().required(),
    uf:Joi.string().required().length(2),

  })
}), ongController.create);//celebrate deve ficar exatamente antes de ongController
routes.post('/incident',incidentController.create);
routes.post('/sessions', sessionController.create)

routes.delete('/incident/:id',celebrate({
  [Segments.PARAMS]:Joi.object().keys({
    id:Joi.number().required() 
  })
}),incidentController.delete)

module.exports = routes;