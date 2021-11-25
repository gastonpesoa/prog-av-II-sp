require('./db/mongo')
const { PORT } = require('./utils/config')
const express = require('express')
const cors = require('cors')
const { handlerNotFound, handlerError, logger } = require('./utils/middleware')
const loginRouter = require('./routes/LoginRouter')
const usersRouter = require('./routes/usersRouter')
const mascotasRouter = require('./routes/mascotasRouter')
const tiposRouter = require('./routes/tiposRouter')

const app = express()
app.use(cors())
app.use(express.json())
app.use(logger)

app.get('/', (req, res) => {
    res.send("<h1>Servidor Mascotas</h1>")
})

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/mascotas', mascotasRouter)
app.use('/api/tipos', tiposRouter)

app.use(handlerNotFound)
app.use(handlerError)

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})