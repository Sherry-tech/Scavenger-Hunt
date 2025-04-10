require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const session = require('express-session')
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js')

//routes
const userRoutes = require('./routes/appRoutes/userRoutes.js');
const huntRoutes = require('./routes/appRoutes/huntRoutes.js');
const locationRoutes = require('./routes/appRoutes/locationRoutes.js');
const teamRoutes = require('./routes/appRoutes/teamRoutes.js');
const ronaldRequestRoutes = require('./routes/appRoutes/ronaldRequestRoutes.js');

//dashboard routes
const dashboardUserRoutes = require('./routes/dashboardRoutes/dashboardUserRoutes.js');
const dashboardHuntRoutes = require('./routes/dashboardRoutes/dashboardHuntRoutes.js');
const dashboardLocationRoutes = require('./routes/dashboardRoutes/dashboardLocationRoutes.js');
const dashboardExperienceRoutes = require('./routes/dashboardRoutes/dashboardExperienceRoutes.js');
const dashboardClueRoutes = require('./routes/dashboardRoutes/dashboardClueRoutes.js');
const dashboardRonaldRequestRoutes = require('./routes/dashboardRoutes/dashboardRonaldRequestRoutes.js');

//Express Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // to support URL-encoded bodies
app.use(cors())

app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
)

// Static folder for serving images
// app.use('/images', express.static(path.join(__dirname, 'images')))

//App Routes Middlewares
app.use('/api', userRoutes)
app.use('/api', huntRoutes)
app.use('/api', locationRoutes)
app.use('/api', teamRoutes)
app.use('/api', ronaldRequestRoutes)

// Admin Routes Middlewares
app.use('/api', dashboardUserRoutes);
app.use('/api', dashboardHuntRoutes);
app.use('/api', dashboardLocationRoutes);
app.use('/api', dashboardExperienceRoutes);
app.use('/api', dashboardClueRoutes);
app.use('/api', dashboardRonaldRequestRoutes);

//Error Middlewares
app.use(notFound)
app.use(errorHandler)

//Setup enviornment port
app.set('port', process.env.PORT || 4000)
var server = app.listen(app.get('port'), function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Node.js API app listening at http://%s:%s', host, port)
})

//Headers Middlewares
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})
