const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

const cron = require('node-cron');
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config({path: './.env'})
const connect = require('./connection');
connect();
const express = require("express");
const router = require('./router');
const updateTokenStatus = require('./utils/updateTokenStatus');
const app = express();
app.use(cors({origin: '*'}))

app.use(express.json());

// Define acron job to run at 12:00 midnight each day
cron.schedule('0 0 * * *', () => {
  console.log('Cron job is running at 12:00 midnight each day!');
  updateTokenStatus();
});

app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
  console.log(`app listening on port ${PORT}`)
})