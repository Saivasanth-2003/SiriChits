

const express = require('express');
const app = express();
const userrouter = require('./routes/userroutes'); // ✅ match your actual file name
const connectDB = require('./config/database');
const chitGroupRouter = require('./routes/chitgroup_routes'); // ✅ match your actual file name
const actionRoutes = require('./routes/actions_routes');

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/auth/users', userrouter); // ✅ valid router
app.use('/', chitGroupRouter);
app.use('/', actionRoutes);


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
