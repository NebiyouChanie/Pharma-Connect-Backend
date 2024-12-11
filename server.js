const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

//DB Connect
connectDB()

/*Routes*/
// user routes
app.use('/api/v1/users', require('./routes/UserRoutes'))


//pharmacist routes

app.use("/api/v1/pharmacist",require("./routes/PharmacistRoutes"))

// Testing
app.get('/', (req, res) => {
    res.send("hello world")
})

//testing port
const port=5000

app.listen(port, () => {
    console.log("Server is listesning on port:", process.env.PORT)
})
