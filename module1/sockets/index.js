const Message = require('../../../server/models/message.js');

let userCount = 0;
let usernames = {};

let highestBid = 3000;
let bidHistory = [];

let timerStart = null;
let timerDuration = 0;
const MAX_TIMER = 30 * 60 * 1000; // 30 min
const INITIAL_TIMER = 10 * 60 * 1000; // 10 min
let timerRunning = false;

function broadcastTimer(io) {
  io.emit('timer_update', {
    expiry: timerStart ? timerStart + timerDuration : null,
    running: timerRunning,
  });
}

const setupSocket = (io) => {
  io.on('connection', async (socket) => {
    userCount++;
    io.emit('user_count', userCount);

    // Send bid state
    socket.emit('bid_update', { highestBid, history: bidHistory });

    // Send chat history
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const messages = await Message.find({ createdAt: { $gte: tenMinutesAgo } }).sort({ createdAt: 1 });
    socket.emit('chat_history', messages);

    console.log('User connected:', socket.id);

    socket.on('register_username', (username) => {
      usernames[socket.id] = username;
      io.emit('usernames', Object.values(usernames));
    });

    socket.on('start_timer', () => {
      if (!timerRunning) {
        timerStart = Date.now();
        timerDuration = INITIAL_TIMER;
        timerRunning = true;
        broadcastTimer(io);
      }
    });

    socket.on('extend_timer', (extraMs) => {
      if (timerRunning && timerDuration + extraMs <= MAX_TIMER) {
        timerDuration += extraMs;
        broadcastTimer(io);
      }
    });

    // Send timer state to new user
    socket.emit('timer_update', {
      expiry: timerStart ? timerStart + timerDuration : null,
      running: timerRunning,
    });

    socket.on('send_message', async (data) => {
      const msg = new Message(data);
      await msg.save();
      io.emit('receive_message', data);
    });

    socket.on('place_bid', (data) => {
      if (data.amount > highestBid) {
        highestBid = data.amount;
        bidHistory.push(data);
        io.emit('bid_update', { highestBid, history: bidHistory });
      }
    });

    socket.on('disconnect', () => {
      userCount--;
      delete usernames[socket.id];
      io.emit('user_count', userCount);
      io.emit('usernames', Object.values(usernames));
    });
  });

  // Timer check interval
  setInterval(() => {
    if (timerRunning && timerStart && timerDuration) {
      if (Date.now() >= timerStart + timerDuration) {
        console.log('Timer expired');
        timerRunning = false;
        broadcastTimer(io);
      }
    }
  }, 1000);
};

module.exports = setupSocket;
