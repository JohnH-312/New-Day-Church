const express = require('express');
const fs = require('fs');
const path = require('path');
// You need: npm install express nodemailer body-parser
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// creates the express application to merge the layout and page content
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
            // If you want to change page titles do something with this v
			const html = layout
				.replace('<!-- PAGE_TITLE -->', page.charAt(0).toUpperCase() + page.slice(1))
				.replace('<!-- PAGE_CONTENT -->', content);
			res.send(html);
		});
	});
});

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Server running at port ${PORT}/`);
});


app.use(bodyParser.urlencoded({ extended: false }));

app.post('/send-email', async (req, res) => {
  const { firstName, lastName, email, subject, body } = req.body;

  // Set up nodemailer transport (configure with your SMTP info)
  let transporter = nodemailer.createTransport({
    service: 'gmail', // or your SMTP provider
    auth: {
      user: 'jonnyhughes312@gmail.com',
	  pass: 'qxnv fzsl ibsp bczx' // You have to set up App password in whatever email provider
    }
  });

  let mailOptions = {
    from: email,
    to: 'jonnyhughes312+test@gmail.com', // The default receiving address
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

