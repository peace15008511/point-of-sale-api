import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelize";

class Transaction extends Model {
  public transactionId!: number;
  public email!: string;
  public totalAmount!: number;
  public totalQuantity!: number;
  totalMainProductsQauntity!: number;
  totalUpsellProductsQauntity!: number;
}

Transaction.init(
  {
    transactionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    totalQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalMainProductsQauntity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalUpsellProductsQauntity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Transaction",
    tableName: "transactions",
    timestamps: true, // Add created_at and updated_at timestamps
    underscored: true, // Use underscored naming for columns (e.g., created_at)
  }
);

class MainProduct extends Model {
  public mainProductId!: number;
  public name!: string; // Changed from String to string
  public description!: string;
  public price!: number;
  public quantity!: number;
}

MainProduct.init(
  {
    mainProductId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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
    // Added foreign key to associate with Transaction
    TransactionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "MainProduct",
    tableName: "main_products_transactions",
    timestamps: true, // Add created_at and updated_at timestamps
    underscored: true, // Use underscored naming for columns (e.g., created_at)
  }
);

class UpsellProduct extends Model {
  public upsellProductId!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public quantity!: number;
}

UpsellProduct.init(
  {
    upsellProductId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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
    // Added foreign key to associate with MainProduct
    MainProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UpsellProduct",
    tableName: "upsell_products_transactions",
    timestamps: true, // Add created_at and updated_at timestamps
    underscored: true, // Use underscored naming for columns (e.g., created_at)
  }
);

// Define associations
Transaction.hasMany(MainProduct, {
  as: "mainProducts",
  foreignKey: "transaction_id",
});
MainProduct.belongsTo(Transaction, { foreignKey: "transaction_id" });

MainProduct.hasMany(UpsellProduct, {
  as: "upsellProducts",
  foreignKey: "main_product_id",
});
UpsellProduct.belongsTo(MainProduct, { foreignKey: "main_product_id" });

export { Transaction, MainProduct, UpsellProduct };
