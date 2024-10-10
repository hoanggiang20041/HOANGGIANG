const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 5500;

app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { fullName, username, email, password, tel } = req.body;

    if (!fullName || !username || !email || !password || !tel) {
        return res.status(400).send('Vui lòng cung cấp đủ thông tin.');
    }

    const userData = { fullName, username, email, password, tel };

    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).send('Error reading file');
        }

        let users = [];
        if (data) {
            try {
                users = JSON.parse(data);
            } catch (e) {
                return res.status(500).send('Error parsing JSON');
            }
        }

        const emailExists = users.some(user => user.email === email);
        const usernameExists = users.some(user => user.username === username);
        const phoneExists = users.some(user => user.tel === tel);

        if (emailExists) {
            return res.status(400).send('Email đã tồn tại.');
        }

        if (usernameExists) {
            return res.status(400).send('Tên người dùng đã tồn tại.');
        }

        if (phoneExists) {
            return res.status(400).send('Số điện thoại đã tồn tại.');
        }

        users.push(userData);

        fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing file');
            }
            res.status(200).send({ message: 'Đăng ký thành công!' });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});