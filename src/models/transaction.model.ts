import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelize";

class Transactions extends Model {
  public email!: string;
  public transactionId!: number;
  public totalQuantity!: number;
  public totalAmount!: String;
}

Transactions.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transactionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    totalAmount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Transactions",
    tableName: "transactions", // Specify the table name explicitly
    timestamps: true, // Add createdAt and updatedAt timestamps
    underscored: true, // Use underscored naming for columns (e.g., created_at)
  }
);

export default Transactions;
