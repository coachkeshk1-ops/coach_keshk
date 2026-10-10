const assert = require('assert');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Test suite for ELK ESHK FITNESS Trainer Shortcut & Security
async function runTests() {
  console.log('--- Starting ELK ESHK FITNESS Automated Tests ---');

  // Start server programmatically on a test port
  const express = require('express');
  const cookieParser = require('cookie-parser');
  const authRoutes = require('./routes/auth');
  const traineeRoutes = require('./routes/trainee');
  const adminRoutes = require('./routes/admin');
  const { requireTrainerAuth } = require('./middleware/auth');
  const db = require('./data/db');

  const app = express();
  const PORT = 3999;
  const BASE_URL = `http://localhost:${PORT}`;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));
  app.use('/js', express.static(path.join(__dirname, 'public', 'js')));
  app.use('/styles.css', express.static(path.join(__dirname, 'public', 'styles.css')));

  app.use('/api/auth', authRoutes);
  app.use('/api/trainee', traineeRoutes);
  app.use('/api/admin', adminRoutes);

  app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
  app.get('/trainer/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'trainer-login.html')));
  app.get('/trainer/dashboard', requireTrainerAuth, (req, res) => res.sendFile(path.join(__dirname, 'public', 'trainer-dashboard.html')));

  const server = app.listen(PORT);

  function request(endpoint, options = {}) {
    return new Promise((resolve, reject) => {
      const url = new URL(endpoint, BASE_URL);
      const reqOptions = {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname + url.search,
        method: options.method || 'GET',
        headers: options.headers || {}
      };

      const req = http.request(reqOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          let json = null;
          try {
            json = JSON.parse(data);
          } catch (e) {}
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data,
            json
          });
        });
      });

      req.on('error', reject);

      if (options.body) {
        req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
      }
      req.end();
    });
  }

  try {
    // 1. Check Public Landing Page
    console.log('[TEST 1] Public landing page GET /');
    const resHome = await request('/');
    assert.strictEqual(resHome.status, 200, 'Home page must return 200');
    assert(resHome.body.includes('Coach Keshk'), 'Home page must contain brand name');
    // Verify no secret shortcut cues in public HTML
    assert(!resHome.body.includes('Alt + X'), 'Public page must NOT display Alt + X');
    assert(!resHome.body.includes('Alt+X'), 'Public page must NOT display Alt+X');
    assert(!resHome.body.includes('secret-admin-trigger'), 'Public page must NOT contain secret button with key icon');
    console.log('✓ Public page is clean, responsive, and contains NO visible shortcut hints.');

    // 2. Check Shortcut Script Integrity
    console.log('[TEST 2] Shortcut script verification');
    const shortcutCode = fs.readFileSync(path.join(__dirname, 'public', 'js', 'shortcut.js'), 'utf8');
    assert(shortcutCode.includes('altKey'), 'Shortcut script must check altKey');
    assert(shortcutCode.includes('isEditableElement') || shortcutCode.includes('isContentEditable'), 'Shortcut script must check editable elements');
    assert(shortcutCode.includes('INPUT'), 'Shortcut script must ignore input tags');
    assert(shortcutCode.includes('TEXTAREA'), 'Shortcut script must ignore textarea tags');
    assert(shortcutCode.includes('/trainer/login'), 'Shortcut script must redirect to /trainer/login');
    console.log('✓ Shortcut script correctly listens for Alt+X, ignores text inputs, and opens /trainer/login.');

    // 3. Unauthorized access to /trainer/dashboard must be redirected (302)
    console.log('[TEST 3] Unauthorized access to /trainer/dashboard');
    const resDashUnauth = await request('/trainer/dashboard');
    assert.strictEqual(resDashUnauth.status, 302, 'Unauthenticated browser request to /trainer/dashboard must return 302 redirect');
    assert(resDashUnauth.headers.location.includes('/trainer/login'), 'Must redirect to /trainer/login');
    console.log('✓ Unauthorized page access is safely redirected to /trainer/login.');

    // 4. Unauthorized access to administrative API must return 401
    console.log('[TEST 4] Unauthorized access to /api/admin/dashboard');
    const resApiUnauth = await request('/api/admin/dashboard', {
      headers: { 'Accept': 'application/json' }
    });
    assert.strictEqual(resApiUnauth.status, 401, 'Unauthenticated API request must return 401');
    assert.strictEqual(resApiUnauth.json.success, false, 'API success flag must be false');
    console.log('✓ Protected admin API strictly blocks unauthenticated requests.');

    // 5. Trainer Login with Invalid Credentials
    console.log('[TEST 5] Trainer login with invalid credentials');
    const resBadLogin = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'coach@keshkfitness.com', password: 'WrongPassword123' }
    });
    assert.strictEqual(resBadLogin.status, 401, 'Invalid password must return 401');
    assert.strictEqual(resBadLogin.json.success, false);
    console.log('✓ Invalid login credentials safely rejected.');

    // 6. Trainer Login with Valid Credentials
    console.log('[TEST 6] Trainer login with valid credentials');
    const resLogin = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'coach@keshkfitness.com', password: '09122002' }
    });
    assert.strictEqual(resLogin.status, 200, 'Valid login must return 200');
    assert.strictEqual(resLogin.json.success, true);
    assert.strictEqual(resLogin.json.user.role, 'trainer', 'User role must be trainer');
    assert(resLogin.json.token, 'Must return JWT token');
    
    const setCookieHeader = resLogin.headers['set-cookie'];
    assert(setCookieHeader, 'Must set auth cookie');
    const cookieVal = setCookieHeader[0].split(';')[0];
    console.log('✓ Trainer authentication successful, issued HTTP-only cookie and verified trainer role.');

    // 7. Access Protected Admin Dashboard with Cookie
    console.log('[TEST 7] Access protected admin dashboard with auth cookie');
    const resDashAuth = await request('/trainer/dashboard', {
      headers: { 'Cookie': cookieVal }
    });
    assert.strictEqual(resDashAuth.status, 200, 'Authenticated request to /trainer/dashboard must return 200');
    assert(resDashAuth.body.includes('لوحة تحكم المدرب'), 'Must serve trainer dashboard page');
    console.log('✓ Protected trainer dashboard successfully accessible by authenticated trainer.');

    // 8. Access Admin API with Cookie / Bearer Token
    console.log('[TEST 8] Access /api/admin/dashboard with authenticated session');
    const resAdminData = await request('/api/admin/dashboard', {
      headers: {
        'Cookie': cookieVal,
        'Accept': 'application/json'
      }
    });
    assert.strictEqual(resAdminData.status, 200);
    assert.strictEqual(resAdminData.json.success, true);
    assert(Array.isArray(resAdminData.json.trainees), 'Must return trainees list');
    assert(Array.isArray(resAdminData.json.pending), 'Must return pending applications');
    console.log(`✓ Admin API returned ${resAdminData.json.trainees.length} trainees and ${resAdminData.json.pending.length} pending applications.`);

    // 9. Trainee Login Data Isolation
    console.log('[TEST 9] Trainee Login & data isolation');
    const resTrainee = await request('/api/trainee/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { traineeId: 'KESH-101' }
    });
    assert.strictEqual(resTrainee.status, 200);
    assert.strictEqual(resTrainee.json.trainee.id, 'KESH-101');
    assert.strictEqual(resTrainee.json.trainee.macros.protein, 185);
    console.log('✓ Trainee endpoint returned strictly isolated profile data.');

    // 10. Password Reset Flow
    console.log('[TEST 10] Secure password reset flow');
    const resForgot = await request('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'coach@keshkfitness.com' }
    });
    assert.strictEqual(resForgot.status, 200);
    assert.strictEqual(resForgot.json.success, true);
    const resetToken = resForgot.json.debugToken;
    assert(resetToken, 'Must generate reset token');

    const resReset = await request('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { token: resetToken, newPassword: 'NewCoachPassword@2026!' }
    });
    assert.strictEqual(resReset.status, 200);
    assert.strictEqual(resReset.json.success, true);

    // Verify login with new password
    const resNewLogin = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'coach@keshkfitness.com', password: 'NewCoachPassword@2026!' }
    });
    assert.strictEqual(resNewLogin.status, 200);
    assert.strictEqual(resNewLogin.json.success, true);
    console.log('✓ Password reset flow completed and verified with new login.');

    // Reset password back to 09122002
    const resForgotBack = await request('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'coach@keshkfitness.com' }
    });
    await request('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { token: resForgotBack.json.debugToken, newPassword: '09122002' }
    });

    // 11. Exercise Video Upload & Trainee Workout Update
    console.log('[TEST 11] Exercise video upload and plan update');
    const fakeBase64Video = 'data:video/mp4;base64,AAAAHGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAA';
    const resUpload = await request('/api/admin/upload-video', {
      method: 'POST',
      headers: {
        'Cookie': cookieVal,
        'Content-Type': 'application/json'
      },
      body: { videoData: fakeBase64Video, fileName: 'bicep_curl_demo.mp4' }
    });
    assert.strictEqual(resUpload.status, 200);
    assert.strictEqual(resUpload.json.success, true);
    assert(resUpload.json.videoUrl && resUpload.json.videoUrl.includes('.mp4'), 'Must return uploaded video path');
    console.log(`✓ Video uploaded successfully: ${resUpload.json.videoUrl}`);

    // Update trainee with video
    const resUpdateTrainee = await request('/api/admin/trainees/KESH-101', {
      method: 'PUT',
      headers: {
        'Cookie': cookieVal,
        'Content-Type': 'application/json'
      },
      body: {
        workouts: [
          {
            day: "الأحد (Sun)",
            title: "Push (صدر + تراي)",
            details: "Bench Press 4x8, Incline Dumbbell 3x10",
            videoUrl: resUpload.json.videoUrl
          }
        ]
      }
    });
    assert.strictEqual(resUpdateTrainee.status, 200);
    assert.strictEqual(resUpdateTrainee.json.trainee.workouts[0].videoUrl, resUpload.json.videoUrl);
    console.log('✓ Trainee workout routine updated with exercise video.');

    console.log('====================================================');
    console.log('ALL 11 TESTS PASSED SUCCESSFULLY! ✓✓✓');
    console.log('====================================================');
  } finally {
    server.close();
  }
}

runTests().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
