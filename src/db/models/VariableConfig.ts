import { DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../../config/connection'

interface VariableConfigAttributes {
  key?: string
  value?: number
}

class VariableConfig extends Model<VariableConfigAttributes> implements VariableConfigAttributes {
  public key!: string
  public value!: number
}

VariableConfig.init(
  {
    key: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'variable_configs',
    timestamps: false,
  }
)

export default VariableConfig
