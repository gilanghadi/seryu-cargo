import { DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../../config/connection'
import ShipmentCost from './ShipmentCost'

interface DriverAttributes {
  id?: number
  driver_code?: string
  name?: string
}

class Driver extends Model<DriverAttributes> implements DriverAttributes {
  public id!: number
  public driver_code!: string
  public name!: string
}

Driver.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    driver_code: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'drivers',
    timestamps: false,
  }
)

export default Driver
