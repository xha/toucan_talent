module.exports = (sequelize, DataTypes) => {
  const patient = sequelize.define('patient', {
    id_patient  : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name        : DataTypes.STRING,
    email       : DataTypes.STRING,
    address     : DataTypes.STRING,
    status      : {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  })

  return patient
}
