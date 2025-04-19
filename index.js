import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import 'express-async-errors'

import 'dotenv/config'

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

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Eatoes</h1>')
})

const port = process.env.PORT;
const start = () => {
    app.listen(port,() => console.log(`server is running on ${port}`))
}
start()