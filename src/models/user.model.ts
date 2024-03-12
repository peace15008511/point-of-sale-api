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

// Synchronize the model with the database to create the table if it doesn't exist
(async () => {
  try {
    await sequelize.sync();
    console.log("User table synced successfully");
  } catch (error) {
    console.error("Error syncing User table:", error);
  }
})();

export default User;
