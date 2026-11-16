require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'koasocial_prod_db',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.get('/api/health', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1');
        res.json({ status: 'OK', database: 'Connected', timestamp: new Date() });
    } catch (err) {
        res.status(500).json({ status: 'Error', error: err.message });
    }
});

// Socket.io Real-Time Messaging & Typing Events
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join_room', (userId) => {
        socket.join(`user_${userId}`);
    });

    socket.on('send_message', (data) => {
        io.to(`user_${data.receiverId}`).emit('receive_message', data);
    });

    socket.on('typing', (data) => {
        io.to(`user_${data.receiverId}`).emit('display_typing', data);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
    server.listen(PORT, () => {
        console.log(`KoaSocial Backend Server running on port ${PORT}`);
    });
}

module.exports = { app, server, pool };
