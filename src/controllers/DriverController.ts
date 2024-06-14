import { Request, Response } from 'express'
import sequelizeConnection from '../config/connection'
import VariableConfig from '../db/models/VariableConfig'
import Driver from '../db/models/Driver'
import { QueryTypes } from 'sequelize'

const getSalaryDriver = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { month, year, current, page_size } = req.query
    const limit = page_size ? parseInt(page_size as string) : 10
    const offset = current ? parseInt(current as string) : 0

    const attendanceSalaryConfig = await VariableConfig.findOne({ where: { key: 'DRIVER_MONTHLY_ATTENDANCE_SALARY' } })
    if (!attendanceSalaryConfig) {
      return res.status(500).json({ message: 'DRIVER_MONTHLY_ATTENDANCE_SALARY config not found' })
    }
    const DRIVER_MONTHLY_ATTENDANCE_SALARY = attendanceSalaryConfig.value

    const drivers = await sequelizeConnection.query(
      `
      SELECT
        d.driver_code,
        d.name,
        COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) AS total_pending,
        COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) AS total_confirmed,
        COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0) AS total_paid,
        COALESCE(COUNT(DISTINCT da.attendance_date) * :attendanceSalary, 0) AS total_attendance_salary,
        COALESCE(SUM(sc.total_costs) + (COUNT(DISTINCT da.attendance_date) * :attendanceSalary), 0) AS total_salary,
        COALESCE(COUNT(DISTINCT s.shipment_no), 0) AS count_shipment
      FROM
        drivers d
      LEFT JOIN
        driver_attendances da ON d.driver_code = da.driver_code
      LEFT JOIN
        shipment_costs sc ON d.driver_code = sc.driver_code
      LEFT JOIN
        shipments s ON sc.shipment_no = s.shipment_no AND s.shipment_status <> 'CANCELLED'
      WHERE
        EXTRACT(MONTH FROM da.attendance_date) = :month
        AND EXTRACT(YEAR FROM da.attendance_date) = :year
      GROUP BY
        d.driver_code, d.name
      ORDER BY
        d.driver_code
      LIMIT :limit OFFSET :offset;
      `,
      {
        replacements: {
          month,
          year,
          attendanceSalary: DRIVER_MONTHLY_ATTENDANCE_SALARY,
          limit,
          offset,
        },
        type: QueryTypes.SELECT,
      }
    )

    const totalDrivers = await Driver.count()

    return res.status(200).json({
      data: drivers,
      total_row: totalDrivers,
      current: offset,
      page_size: limit,
    })
  } catch (error) {
    console.error('Error fetching driver salary list:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default {
  getSalaryDriver,
}
