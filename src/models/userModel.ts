import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelize";

class User extends Model {}

User.init(
  {
    // Define your model attributes
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
    modelName: "User", // Your model name
  }
);

export default User;

export interface UserModel {
  id: number;
  email: string;
  password: string;
}
