import express from 'express'
import { router } from './router/index.js'
import { connectToDatabase } from './db/index.js'
import { success, error, info } from './utils/chalk.js'
import http from 'http'
import 'dotenv/config'
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// creating express app/server
const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 5000


// http://localhost:5000
app.use('/api/flights', router.flightRouter)
app.use('/api/passengers', router.passengerRouter)
app.use('/api/airports', router.airportRouter)
app.use('/api/planes', router.planeRouter)
app.use('/api/admins', router.adminRouter)


app.use(express.static(path.join(__dirname, '../client')));
// app.use(express.static(path.join(__dirname, '../client/src')));
app.use(express.static(path.join(__dirname, '../client/src'), { 
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.use(bodyParser.json()) 






// Connecting to the database
connectToDatabase()
.then(() => console.log(success("[database] [success] Connected to database")))
.catch(() => console.log(error("[database] [error] Doesn't connected to database")))


// starting up the server
server.listen(port, () => {
    console.log(success(`[server] [success] Server has been started... 
                        \n[server] [success] URL: http://localhost:${port}`))
})
