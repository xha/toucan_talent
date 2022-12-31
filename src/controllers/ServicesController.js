const { service, appointment } = require('../models')
const { check, query, validationResult } = require("express-validator");

const list = async (req, res) => { 
  try {
    const services = await service.findAll({
      limit: 20
    })
    
    res.send({
      status  : "success",
      payload : services
    })
  } catch (err) {
    res.status(400).send({
      status  : "fail",
      error   : err
    })
  }
}

const get = async (req, res) => { 
  await check("id")
    .exists().withMessage("id atribute is required")
    .notEmpty().withMessage("id atribute must not be empty")
    .isInt().withMessage("id atribute must be a integer")
    .run(req)

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ status  : "fail", error: result.array() });
  }

  try {
    const services = await service.findAll({
      where: {
        id_service: req.query.id
      },
      limit: 20
    })
    
    res.send({
      status  : "success",
      payload : services
    })
  } catch (err) {
    res.status(400).send({
      status  : "fail",
      error   : err
    })
  }
}

const create = async (req, res) => { 
  //VALIDATIONS
  await check("name")
    .exists().withMessage("name atribute is required")
    .notEmpty().withMessage("name atribute must not be empty")
    .isString().withMessage("name atribute must be a string")
    .run(req)

  await check("cost")
    .exists().withMessage("cost atribute is required")
    .notEmpty().withMessage("cost atribute must not be empty")
    .isFloat().withMessage("cost atribute must be numeric")
    .run(req)

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ status  : "fail", error: result.array() });
  }

  try {
    req.body.status = 1;

    const services = await service.create(req.body)
    res.send({
      status  : "success",
      payload : services
    })
  } catch (err) {
    res.status(400).send({
      status  : "fail",
      error   : err
    })
  }
}

const update = async (req, res) => { 
  //VALIDATIONS
  await check("id")
    .exists().withMessage("id atribute is required")
    .notEmpty().withMessage("id atribute must not be empty")
    .isInt().withMessage("id atribute must be a integer")
    .run(req)

  await check("name")
    .exists().withMessage("name atribute is required")
    .notEmpty().withMessage("name atribute must not be empty")
    .isString().withMessage("name atribute must be a string")
    .run(req)

  await check("cost")
    .exists().withMessage("cost atribute is required")
    .notEmpty().withMessage("cost atribute must not be empty")
    .isFloat().withMessage("cost atribute must be numeric")
    .run(req)

  await check("status")
    .exists().withMessage("status atribute is required")
    .notEmpty().withMessage("status atribute must not be empty")
    .isBoolean().withMessage("status atribute must be a boolean")
    .run(req)

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ status  : "fail", error: result.array() });
  }

  try {
    req.body.updatedAt = Date.now();
    
    let services = await service.update(req.body, { where: { id_service: req.body.id } })
    
    res.send({
      status  : "success",
      payload : req.body
    })
  } catch (err) {
    res.status(400).send({
      status  : "fail",
      error   : err
    })
  }
}

const disable = async (req, res) => { 
  //VALIDATIONS
  await check("id")
    .exists().withMessage("id atribute is required")
    .notEmpty().withMessage("id atribute must not be empty")
    .isInt().withMessage("id atribute must be a integer")
    .run(req)

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ status  : "fail", error: result.array() });
  }

  try {
    req.body.status     = 0;
    req.body.updatedAt  = Date.now();
    
    let services = await service.update(req.body, { where: { id_service: req.body.id } })
    
    res.send({
      status  : "success",
      payload : req.body
    })
  } catch (err) {
    res.status(400).send({
      status  : "fail",
      error   : err
    })
  }
}

const destroy = async (req, res) => { 
  //VALIDATIONS
  await check("id")
    .exists().withMessage("id atribute is required")
    .notEmpty().withMessage("id atribute must not be empty")
    .isInt().withMessage("id atribute must be a integer")
    .run(req)

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ status  : "fail", error: result.array() });
  }

  try {
    const appointments = await appointment.findAll({
      where: {
        id_service: req.body.id
      },
      limit: 20
    })

    if (appointments.length > 0) {
      return res.status(400).json({ status  : "fail", error: "appointments have this service" });
    }

    let services = await service.destroy({ where: { id_service: req.body.id } })
    
    res.send({
      status  : "success",
      payload : 'id ' + req.body.id + ' deleted'
    })
  } catch (err) {
    res.status(400).send({
      status  : "fail",
      error   : err
    })
  }
}

module.exports = {
  list,
  get,
  create,
  update,
  disable,
  destroy
}
