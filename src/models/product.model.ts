import {
  DataTypes,
  Model,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
} from "sequelize";
import sequelize from "../database/sequelize";

class Products extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: string;
  public quantity!: number;

  // Define association methods
  public addUpsellProduct!: BelongsToManyAddAssociationMixin<Products, number>;
  public getUpsellProducts!: BelongsToManyGetAssociationsMixin<Products>;
  public removeUpsellProduct!: BelongsToManyRemoveAssociationMixin<
    Products,
    number
  >;
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

// Define the many-to-many association for upsell products
Products.belongsToMany(Products, {
  as: "UpsellProducts",
  foreignKey: "productId",
  through: "ProductUpsells",
  otherKey: "upsellProductId",
});

export default Products;
