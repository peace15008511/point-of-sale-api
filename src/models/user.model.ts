import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelize";

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users", // Specify the table name explicitly
    timestamps: true, // Add createdAt and updatedAt timestamps
    underscored: true, // Use underscored naming for columns (e.g., created_at)
  }
);

export default User;
