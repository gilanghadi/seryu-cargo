import { DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../../config/connection'

interface ShipmentAttributes {
  shipment_no?: string
  shipment_date?: Date
  shipment_status?: string
}

class Shipment extends Model<ShipmentAttributes> implements ShipmentAttributes {
  public shipment_no!: string
  public shipment_date!: Date
  public shipment_status!: string
}

Shipment.init(
  {
    shipment_no: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    shipment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    shipment_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'shipments',
    timestamps: false,
  }
)

export default Shipment
