const express = require('express');
const app = express();
const port = 1234;
const conn = require('./mariadb.js');

// body-parser 미들웨어 추가 (POST, PUT 요청 처리)
app.use(express.json());

// 게시판 전체 조회
app.get('/memos', (req, res) => {
    conn.query('SELECT * FROM posts', function(err, results) {
        if (err) {
            return res.status(500).json({ error: 'Database query failed', details: err });
        }
        res.status(200).json(results);
    });
});

// 게시판 개별 조회
app.get('/memos/:id', (req, res) => {
    const postId = req.params.id;
    conn.query('SELECT * FROM posts WHERE id = ?', [postId], function(err, results) {
        if (err) {
            return res.status(500).json({ error: 'Database query failed', details: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(results[0]); // 첫 번째 결과만 반환
    });
});

// 게시판 등록
app.post('/memos', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }
    const query = 'INSERT INTO posts (title, content) VALUES (?, ?)';
    conn.query(query, [title, content], function(err, results) {
        if (err) {
            return res.status(500).json({ error: 'Database query failed', details: err });
        }
        res.status(201).json({
            message: '게시글이 성공적으로 등록되었습니다.',
            post: {
                id: results.insertId,
                title: title,
                content: content,
                created_at: new Date().toISOString()
            }
        });
    });
});

// 게시판 수정
app.put('/memos/:id', (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }
    const query = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
    conn.query(query, [title, content, postId], function(err, results) {
        if (err) {
            return res.status(500).json({ error: 'Database query failed', details: err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json({
            message: '게시글이 성공적으로 수정되었습니다.',
            post: {
                id: postId,
                title: title,
                content: content
            }
        });
    });
});

// 게시판 삭제
app.delete('/memos/:id', (req, res) => {
    const postId = req.params.id;
    const query = 'DELETE FROM posts WHERE id = ?';
    conn.query(query, [postId], function(err, results) {
        if (err) {
            return res.status(500).json({ error: 'Database query failed', details: err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json({
            message: '게시글이 성공적으로 삭제되었습니다.'
        });
    });
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});