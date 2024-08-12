const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(express.json());

// Set up MySQL connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'bannerDB'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected');
});

// API to get user-specific banner data
app.get('/api/banner/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `
        SELECT * FROM banner 
        WHERE isVisible = 1 AND start_time <= NOW() AND (end_time IS NULL OR end_time >= NOW()) 
        AND (user_id IS NULL OR user_id = ?) 
        ORDER BY user_id DESC 
        LIMIT 1`;
    db.query(query, [userId], (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    });
});

// API to update banner data
app.post('/api/banner', (req, res) => {
    const { description, timer, link, isVisible, startTime, endTime, mediaType, mediaUrl } = req.body;
    db.query(
        `UPDATE banner SET description = ?, timer = ?, link = ?, isVisible = ?, start_time = ?, end_time = ?, media_type = ?, media_url = ? WHERE id = 1`,
        [description, timer, link, isVisible, startTime, endTime, mediaType, mediaUrl],
        (err, result) => {
            if (err) throw err;
            res.send({ message: 'Banner updated' });
        }
    );
});

// API to track banner views
app.post('/api/banner/view', (req, res) => {
    const { id } = req.body;
    db.query(`UPDATE banner SET views = views + 1 WHERE id = ?`, [id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'View count updated' });
    });
});

// API to track banner clicks
app.post('/api/banner/click', (req, res) => {
    const { id } = req.body;
    db.query(`UPDATE banner SET clicks = clicks + 1 WHERE id = ?`, [id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Click count updated' });
    });
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});

app.get('/api/analytics', (req, res) => {
    const query = `SELECT id, description, views, clicks FROM banner`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
