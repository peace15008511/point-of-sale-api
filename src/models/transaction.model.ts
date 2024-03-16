import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelize";

class Transaction extends Model {
  public transactionId!: number;
  public email!: string; // Changed from String to string

  // Corrected the datatype of totalAmount to match the database
  public totalAmount!: number;
  public totalQuantity!: number;
}

Transaction.init(
  {
    // Corrected column name to match the database
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
  },
  {
    sequelize,
    modelName: "Transaction",
    tableName: "transactions",
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
    tableName: "mainProducts",
  }
);

class UpsellProduct extends Model {
  public upsellProductId!: number; // Changed from String to number
  public name!: string; // Changed from String to string
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
    tableName: "upsellProducts",
  }
);

// Define associations with correct foreign key column names
Transaction.hasMany(MainProduct, {
  as: "mainProducts",
  foreignKey: "TransactionId",
});
MainProduct.belongsTo(Transaction, { foreignKey: "TransactionId" });

MainProduct.hasMany(UpsellProduct, {
  as: "upsellProducts",
  foreignKey: "MainProductId",
});
UpsellProduct.belongsTo(MainProduct, { foreignKey: "MainProductId" });

export { Transaction, MainProduct, UpsellProduct };
