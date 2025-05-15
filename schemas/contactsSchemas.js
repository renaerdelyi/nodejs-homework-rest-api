const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9+\s()-]{6,20}$/).required()
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[0-9+\s()-]{6,20}$/)
}).min(1); 

module.exports = {
  contactSchema,
  updateContactSchema
};