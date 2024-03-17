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
  public price!: number;
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
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Products",
    tableName: "products",
    timestamps: true, // Add created_at and updated_at timestamps
    underscored: true, // Use underscored naming for columns (e.g., created_at)
  }
);

// Define the many-to-many association for upsell products
Products.belongsToMany(Products, {
  as: "UpsellProducts",
  foreignKey: "main_product_id",
  through: "upsell_products",
  otherKey: "upsell_product_id",
});

export default Products;
