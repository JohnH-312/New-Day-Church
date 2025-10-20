const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const http = require('http');


const app = express();
const PORT = 8000;

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
http.createServer(app).listen(PORT, 'localhost', () => {
  console.log(`HTTP server running at http://localhost:${PORT}/`);
});