require('dotenv').config()
const path = require('path')
const Sequelize = require('sequelize')
const db = {}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    port: process.env.DB_PORT,
    dialect: process.env.DIALECT,
    host: process.env.HOST
  }
)

//TABLES
let patient       = require(path.join(__dirname, 'patient'))(sequelize, Sequelize.DataTypes)
let appointment   = require(path.join(__dirname, 'appointment'))(sequelize, Sequelize.DataTypes)
let service       = require(path.join(__dirname, 'service'))(sequelize, Sequelize.DataTypes)
db['patient']     = patient
db['appointment'] = appointment
db['service']     = service

//RELATIONSHIP
service.hasMany(appointment, {as : 'fk_appointments_services', foreignKey : 'id_service'});
patient.hasMany(appointment, {as : 'fk_appointments_patients', foreignKey : 'id_patient'});
appointment.belongsTo(patient, {foreignKey : 'id_patient'});
appointment.belongsTo(service, {foreignKey : 'id_service'});

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
