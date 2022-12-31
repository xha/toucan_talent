module.exports = (sequelize, DataTypes) => {
  const appointment = sequelize.define('appointment', {
    id_appointment  : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    observation     : DataTypes.STRING,
    date_appointment: DataTypes.DATE,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  })

  return appointment
}
