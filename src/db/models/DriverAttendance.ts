import { DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../../config/connection'

interface DriverAttendanceAttributes {
  id?: number
  driver_code?: string
  attendance_date?: Date
  attendance_status?: boolean
}

class DriverAttendance extends Model<DriverAttendanceAttributes> implements DriverAttendanceAttributes {
  public id!: number
  public driver_code!: string
  public attendance_date!: Date
  public attendance_status!: boolean
}

DriverAttendance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    driver_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attendance_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    attendance_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'driver_attendances',
    timestamps: false,
  }
)

export default DriverAttendance
