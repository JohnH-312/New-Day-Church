const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const https = require('https');

// Path to your SSL certificate and key files
const sslKeyPath = path.join(__dirname, 'key.pem');
const sslCertPath = path.join(__dirname, 'cert.pem');

// Read SSL credentials
const privateKey = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app = express();
const PORT = 443;

// Serve static assets (CSS, JS, images, etc)
app.use('/Assets', express.static(path.join(__dirname, 'Assets')));
app.use('/styles.css', express.static(path.join(__dirname, 'styles.css')));
app.use('/scripts.js', express.static(path.join(__dirname, 'scripts.js')));

// "Smart" page rendering
app.get(['/', '/:page.html'], (req, res) => {
    const page = req.params.page || 'index';
    const layoutPath = path.join(__dirname, 'layout.html');
    const contentPath = path.join(__dirname, `${page}.html`);

    // Read layout and content
    fs.readFile(layoutPath, 'utf8', (err, layout) => {
        if (err) return res.status(500).send('Layout not found');
        fs.readFile(contentPath, 'utf8', (err2, content) => {
            if (err2) return res.status(404).send('Page not found');
            const html = layout
                .replace('<!-- PAGE_TITLE -->', page.charAt(0).toUpperCase() + page.slice(1))
                .replace('<!-- PAGE_CONTENT -->', content);
            res.send(html);
        });
    });
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/send-email', async (req, res) => {
  const { firstName, lastName, email, subject, body } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jonnyhughes312@gmail.com',
      pass: 'qxnv fzsl ibsp bczx'
    }
  });

  let mailOptions = {
    from: email,
    to: 'jonnyhughes312+test@gmail.com',
    subject: subject,
    text: `From: ${firstName} ${lastName} <${email}>\n\n${body}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Email sent!');
  } catch (error) {
    res.status(500).send('Failed to send email. ' + error);
  }
});

// Create HTTPS server
https.createServer(credentials, app).listen(PORT, '0.0.0.0', () => {
  console.log(`HTTPS server running at port ${PORT}/`);
});

/* 
  Notes:
  - Your SSL files must exist at 'key.pem' and 'cert.pem' in the project root (or adjust the paths).
  - Browsers may show warnings if you use self-signed certificates.
  - For production, consider using Let's Encrypt for free SSL certs.
  - You may need to run the server as root to use port 443 (or use a reverse proxy with Nginx/Apache).
*/