// user.model.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelize";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Add more attributes as needed
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
