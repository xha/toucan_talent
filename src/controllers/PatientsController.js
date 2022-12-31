const { patient, appointment } = require('../models')
const { check, query, validationResult } = require("express-validator");

const list = async (req, res) => { 
  try {
    const patients = await patient.findAll({
      limit: 20
    })
    
    res.send({
      status  : "success",
      payload : patients
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
    const patients = await patient.findAll({
      where: {
        id_patient: req.query.id
      },
      limit: 20
    })
    
    res.send({
      status  : "success",
      payload : patients
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

  await check("email")
    .exists().withMessage("email atribute is required")
    .notEmpty().withMessage("email atribute must not be empty")
    .isEmail().withMessage("email atribute must be a email format")
    .run(req)

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ status  : "fail", error: result.array() });
  }

  try {
    req.body.status = 1;

    const patients = await patient.create(req.body)
    res.send({
      status  : "success",
      payload : patients
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

  await check("email")
    .exists().withMessage("email atribute is required")
    .notEmpty().withMessage("email atribute must not be empty")
    .isEmail().withMessage("email atribute must be a email format")
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
    
    let patients = await patient.update(req.body, { where: { id_patient: req.body.id } })
    
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
    
    let patients = await patient.update(req.body, { where: { id_patient: req.body.id } })
    
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
      return res.status(400).json({ status  : "fail", error: "appointments have this patient" });
    }

    let patients = await patient.destroy({ where: { id_patient: req.body.id } })
    
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
