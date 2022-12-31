const PatientsController = require('./controllers/PatientsController')
const ServicesController = require('./controllers/ServicesController')
const AppointmentsController = require('./controllers/AppointmentsController')

module.exports = (app) => {
  //PATIENT
  app.get('/patient/list', PatientsController.list)
  app.get('/patient/get', PatientsController.get)
  app.post('/patient/create', PatientsController.create)
  app.put('/patient/update', PatientsController.update)
  app.post('/patient/disable', PatientsController.disable)
  app.delete('/patient/delete', PatientsController.destroy)

  //SERVICE
  app.get('/service/list', ServicesController.list)
  app.get('/service/get', ServicesController.get)
  app.post('/service/create', ServicesController.create)
  app.put('/service/update', ServicesController.update)
  app.post('/service/disable', ServicesController.disable)
  app.delete('/service/delete', ServicesController.destroy)

  //APPOINTMENT
  app.get('/appointment/list', AppointmentsController.list)
  app.post('/appointment/report', AppointmentsController.report)
  app.post('/appointment/create', AppointmentsController.create)
  app.put('/appointment/update', AppointmentsController.update)
  app.post('/appointment/disable', AppointmentsController.disable)
}
