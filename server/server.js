const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

/* Client Side */
// דף ברירת מחדל
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../client/index.html'));
});
// לטובת קבצי קוד ועיצוב
// שימו לב לשימוש בכוכבית
app.get('/client/*', function(req, res) {
	res.sendFile(path.join(__dirname, '../' + req.path));
});

/* Server Side - API
	להעלאה והצגה של תמונות
*/

const PICTURES_DIR = './pictures';

// קבלת תמונה ספציפית
app.get('/getPic/:filename', function(req, res) {
	res.sendFile(path.resolve(PICTURES_DIR + '/' + req.params.filename));
});

// קבלת רשימת תמונות
app.get('/getImages', function(req, res) {
	const files = fs.readdirSync(PICTURES_DIR);
	res.json(files);
});

// נגדיר לאיזו תיקייה ילכו העלאות קבצים
const upload = multer({dest:'./pictures/'});
// העלאת תמונות
app.post('/uploadImage', upload.single('upload'), function(req, res) {
	const file = req.file;
	console.log('got file:', file);
	fs.renameSync(path.resolve(file.path), path.resolve(file.destination + file.originalname));
	res.send('ok');
});

app.listen(80, function() {
	console.log('Server is up');
});