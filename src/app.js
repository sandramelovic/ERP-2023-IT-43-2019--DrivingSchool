import express from 'express'
import config from './config'
import cookieParser from 'cookie-parser'
import programsRoutes from './routes/programs.routes'
import programTypesRoutes from './routes/programTypes.routes'
import categoriesRoutes from './routes/categories.routes'
import instructorsRoutes from './routes/instructors.routes'
import ordersRoutes from './routes/orders.routes'
import orderItemsRoutes from './routes/orderItems.routes'
import vehiclesRoutes from './routes/vehicles.routes'
import paymentsRoutes from './routes/payments.routes'
import usersRoutes from './routes/users.routes'
import errorHandler from './helpers/error-handler'

const app = express()

//settings
app.set('port', config.port)

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use(programsRoutes)
app.use(programTypesRoutes)
app.use(categoriesRoutes)
app.use(instructorsRoutes)
app.use(ordersRoutes)
app.use(orderItemsRoutes)
app.use(vehiclesRoutes)
app.use(paymentsRoutes)
app.use(usersRoutes)
app.use(errorHandler)

export default app