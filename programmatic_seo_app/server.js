// server.js
// A custom Next.js server to support Zero-Lag Socket.io connections
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Initialize Socket.io
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Rate Limiter Memory
  const rateLimitMap = new Map();
  const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
  const MAX_MESSAGES_PER_WINDOW = 10; // Max 10 messages per minute per user

  io.on('connection', (socket) => {
    console.log(`[AI-SDR] Client connected: ${socket.id}`);

    socket.on('user_message', async (data) => {
      const now = Date.now();
      const ip = socket.handshake.address; // Basic IP tracking via socket

      // Rate Limiting Logic
      if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, { count: 1, firstMessageTime: now });
      } else {
        const rateData = rateLimitMap.get(ip);
        if (now - rateData.firstMessageTime > RATE_LIMIT_WINDOW_MS) {
          // Reset window
          rateData.count = 1;
          rateData.firstMessageTime = now;
        } else {
          rateData.count++;
          if (rateData.count > MAX_MESSAGES_PER_WINDOW) {
            console.warn(`[AI-SDR] Rate limit exceeded for IP: ${ip}`);
            socket.emit('error_message', { error: 'You are sending messages too fast. Please wait a moment.' });
            return; // STOP execution, don't call AI
          }
        }
      }

      console.log(`[AI-SDR] Message received from ${socket.id}:`, data);
      
      try {
        const { sessionId, message } = data;
        
        // Tell UI AI is typing
        socket.emit('ai_typing', { status: true });

        // Call our internal Next.js API route to process the AI logic
        // We use localhost:3000 assuming the server runs on 3000.
        // Wait, server.js gets the port from process.env.PORT || 3000
        const port = process.env.PORT || 3000;
        const response = await fetch(`http://localhost:${port}/api/chat/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, message })
        });

        const result = await response.json();

        if (result.success) {
          socket.emit('ai_response', { text: result.text });
        } else {
          socket.emit('error_message', { error: 'Failed to process message.' });
        }
      } catch (err) {
        console.error("Chat Flow Error:", err);
        socket.emit('ai_response', { text: "I'm having a technical hiccup, can you please call us directly?" });
      } finally {
        socket.emit('ai_typing', { status: false });
      }
    });

    socket.on('disconnect', () => {
      console.log(`[AI-SDR] Client disconnected: ${socket.id}`);
    });
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT} with Zero-Lag WebSockets`);
  });
});
