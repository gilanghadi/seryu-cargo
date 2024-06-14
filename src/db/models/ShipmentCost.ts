import { DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../../config/connection'
import Driver from './Driver'

interface ShipmentCostAttributes {
  id?: number
  driver_code?: string
  shipment_no?: string
  total_costs?: number
  cost_status?: string
}

class ShipmentCost extends Model<ShipmentCostAttributes> implements ShipmentCostAttributes {
  public id!: number
  public driver_code!: string
  public shipment_no!: string
  public total_costs!: number
  public cost_status!: string
}

ShipmentCost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    driver_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shipment_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_costs: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cost_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'shipment_costs',
    timestamps: false,
  }
)

ShipmentCost.hasMany(Driver, { foreignKey: 'driver_code' })

export default ShipmentCost
