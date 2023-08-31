import { Model, DataTypes } from "sequelize";

import { sequelize } from "../utils/db";

class MyObject extends Model {
  public id!: number;
  public name!: string;
}

MyObject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "myobject",
  }
);

export default MyObject;
