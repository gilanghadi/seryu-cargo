import express from 'express'
import DriverController from '../controllers/DriverController'
const router = express.Router()

router.get('/salary/driver/list', DriverController.getSalaryDriver)

export default router
