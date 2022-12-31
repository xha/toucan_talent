module.exports = (sequelize, DataTypes) => {
  const service = sequelize.define('service', {
    id_service  : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name        : DataTypes.STRING,
    cost        : {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    status      : {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  })

  return service
}
