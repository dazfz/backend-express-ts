import { Model, DataTypes } from "sequelize";

import { sequelize } from "../utils/db";

export class User extends Model {
  public id!: number;
  public username!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "user",
  }
);

export default User;
