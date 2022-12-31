const { appointment } = require('../models')
const { check, query, validationResult } = require("express-validator");
const { Op } = require('sequelize');

function isInteger(x) { return typeof x === "number" && isFinite(x) && Math.floor(x) === x; }

const list = async (req, res) => { 
  try {
    const appointments = await appointment.findAll({
      limit: 20
    })
    
    res.send({
      status  : "success",
      payload : appointments
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
    .exists().withMessage("date_appointment atribute is required")
    .notEmpty().withMessage("date_appointment atribute must not be empty")
    .isInt().withMessage("id atribute must be a integer")
    .run(req)
   
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ status  : "fail", error: result.array() });
  }

  try {
    const appointments = await appointment.findAll({
      where: {
        id_appointment: req.query.id
      },
      limit: 20
    })
    
    res.send({
      status  : "success",
      payload : appointments
    })
  } catch (err) {
    res.status(400).send({
      status  : "fail",
      error   : err
    })
  }
}

const report = async (req, res) => { 
  await check("id_patient")
    .exists().withMessage("id_patient atribute is required")
    .notEmpty().withMessage("id_patient atribute must not be empty")
    .isInt().withMessage("id atribute must be a integer")
    .run(req)

  await check("date_init")
    .exists().withMessage("date_init atribute is required")
    .notEmpty().withMessage("date_init atribute must not be empty")
    .run(req)

  await check("date_end")
    .exists().withMessage("date_end atribute is required")
    .notEmpty().withMessage("date_end atribute must not be empty")
    .run(req)
  
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ status  : "fail", error: result.array() });
  }
    
  let valid_date = Date.parse(req.body.date_init)
  if (!isInteger(valid_date)) {
    return res.status(400).json({ status  : "fail", error: "date_init atribute must be date_format (YYYY-MM-DD)" });
  }

  valid_date = Date.parse(req.body.date_end)
  if (!isInteger(valid_date)) {
    return res.status(400).json({ status  : "fail", error: "date_end atribute must be date_format (YYYY-MM-DD)" });
  }

  try {
    const appointments = await appointment.findAll({
      where: {
        id_patient: req.body.id_patient,
        date_appointment: {
          [Op.between] : [req.body.date_init , req.body.date_end ]
        }
      },
      limit: 20
    })
    
    res.send({
      status  : "success",
      payload : appointments
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
  await check("date_appointment")
    .exists().withMessage("date_appointment atribute is required")
    .notEmpty().withMessage("date_appointment atribute must not be empty")
    .run(req)

  await check("id_service")
    .exists().withMessage("id_service atribute is required")
    .notEmpty().withMessage("id_service atribute must not be empty")
    .isInt().withMessage("id_service atribute must be integer")
    .run(req)

  await check("id_patient")
    .exists().withMessage("id_patient atribute is required")
    .notEmpty().withMessage("id_patient atribute must not be empty")
    .isInt().withMessage("id_patient atribute must be integer")
    .run(req)

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ status  : "fail", error: result.array() });
    }

    const valid_date = Date.parse(req.body.date_appointment)
    if (!isInteger(valid_date)) {
      return res.status(400).json({ status  : "fail", error: "date_appointment atribute must be date_format (YYYY-MM-DD)" });
    }

  try {
    req.body.status = 1;

    const appointments = await appointment.create(req.body)
    res.send({
      status  : "success",
      payload : appointments
    })
  } catch (err) {
    res.status(400).send({
      status  : "fail",
      error   : "insert error, check id_patient or id_service"
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
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ status  : "fail", error: result.array() });
    }

    req.body.updatedAt = Date.now();
    
    let appointments = await appointment.update(req.body, { where: { id_appointment: req.body.id } })
    
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
  try {
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

    req.body.status     = 0;
    req.body.updatedAt  = Date.now();
    
    let appointments = await appointment.update(req.body, { where: { id_appointment: req.body.id } })
    
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

module.exports = {
  list,
  get,
  report,
  create,
  update,
  disable
}
