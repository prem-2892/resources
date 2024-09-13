import { Sequelize, DataTypes } from 'sequelize'
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  logging: false, // Disable SQL logging (optional)
})

const User =
  sequelize.models.User ||
  sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  })

export default User
