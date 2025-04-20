import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import 'express-async-errors'
import cookieParser from 'cookie-parser'

import 'dotenv/config'

// Local imports
import AuthRoutes  from './Routes/authentication.js'
import UserRoutes from './Routes/userRoute.js'
import FoodItemRoutes from './Routes/foodItemRoute.js'
import CategoryRoutes from './Routes/categoryRoute.js'
import errorHandlerMiddleware from './ErrorClass/error-handler.js'
import notFound from './ErrorClass/notFound.js'
const app = express()

//  Middlewares
app.use(
    cors({
        credentials:true,
        origin: 'http://localhost:3000'
    })
)
app.use(morgan('tiny'))
// app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', AuthRoutes)
app.use('/api/user',  UserRoutes)
app.use("/api/foodItem", FoodItemRoutes)
app.use("/api/categories", CategoryRoutes)

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Eatoes</h1>')
})

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT;
const start = () => {
    app.listen(port,() => console.log(`server is running on ${port}`))
}
start()