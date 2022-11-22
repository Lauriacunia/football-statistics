const express = require('express');
const morgan = require('morgan');
const futbolRoutes = require('./routes/futbolRoutes');

const {Server: ioServer} = require('socket.io');
const app = express();
const PORT = 8080 || process.env.PORT;



//** Middlewares */
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



/** ROUTER */
app.use("/api/futbol", futbolRoutes);



/** CONNECTION SERVER HTTP*/

const server = app.listen(PORT);
server.on("error", (error) => console.log(`Error en servidor ${error}`));

