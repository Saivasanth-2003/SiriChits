

const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const setupSocket = require('./sockets/index.js');
const router = require('./routes/chitplan.js');
const userrouter = require('./routes/userroutes'); // ✅ match your actual file name
const connectDB = require('./config/database');
const chitGroupRouter = require('./routes/chitgroup_routes'); // ✅ match your actual file name
const actionRoutes = require('./routes/actions_routes');

app.use(express.json());
app.use(cors());

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
setupSocket(io);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/auth/users', userrouter); // ✅ valid router
app.use('/', router);  //chitplans
app.use('/', chitGroupRouter);
app.use('/', actionRoutes);


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
