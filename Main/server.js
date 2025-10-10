const express = require('express');
const fs = require('fs');
const path = require('path');

// creates the express application to merge the layout and page content
const app = express();
const PORT = 8080;

// Serve static assets (CSS, JS, images, etc)
app.use('/Assets', express.static(path.join(__dirname, 'Assets')));
app.use('/styles.css', express.static(path.join(__dirname, 'styles.css')));
app.use('/main.js', express.static(path.join(__dirname, 'main.js')));

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

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});