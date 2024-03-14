import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelize";

class Products extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: string;
  public quantity!: number;
}

Products.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "Products",
    tableName: "products", // Specify the table name explicitly
    timestamps: true, // Add createdAt and updatedAt timestamps
    underscored: true, // Use underscored naming for columns (e.g., created_at)
  }
);

// Synchronize the model with the database to create the table if it doesn't exist
(async () => {
  try {
    await sequelize.sync();
    console.log("Products table synced successfully");
  } catch (error) {
    console.error("Error syncing Products table:", error);
  }
})();

export default Products;
