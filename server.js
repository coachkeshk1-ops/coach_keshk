const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const traineeRoutes = require('./routes/trainee');
const adminRoutes = require('./routes/admin');
const { requireTrainerAuth } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Body & Cookie Parsing (Support high-resolution video uploads up to 100MB)
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cookieParser());

// Static Assets (CSS, JS, Images, Videos)
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));
app.use('/styles.css', express.static(path.join(__dirname, 'public', 'styles.css')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/trainee', traineeRoutes);
app.use('/api/admin', adminRoutes);

// Page Routes

// 1. Public Home & Trainee Portal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 2. Responsive Trainer Authentication & Password Reset (Bookmarked on mobile/desktop)
app.get('/trainer/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'trainer-login.html'));
});

app.get('/trainer-login', (req, res) => {
  res.redirect('/trainer/login');
});

app.get('/trainer/reset-password', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'trainer-login.html'));
});

// 3. Protected Trainer Dashboard Route
// Protected server-side: redirects unauthorized visitors to /trainer/login
app.get('/trainer/dashboard', requireTrainerAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'trainer-dashboard.html'));
});

app.get('/trainer', requireTrainerAuth, (req, res) => {
  res.redirect('/trainer/dashboard');
});

// 404 handler
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(404).json({ success: false, error: 'Endpoint not found' });
  }
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>404 - Not Found</title>
      <style>
        body { background: #0d1117; color: #f0f6fc; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .box { background: #161b22; padding: 2rem; border-radius: 12px; border: 1px solid #30363d; text-align: center; }
        a { color: #10b981; text-decoration: none; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="box">
        <h2>404 - Page Not Found</h2>
        <p><a href="/">Return Home</a></p>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`ELK ESHK FITNESS Platform is running on http://localhost:${PORT}`);
  console.log(`- Public Website: http://localhost:${PORT}/`);
  console.log(`- Trainer Login:  http://localhost:${PORT}/trainer/login`);
  console.log(`- Secret Shortcut: Alt + X (on desktop, discreet)`);
  console.log(`====================================================`);
});
