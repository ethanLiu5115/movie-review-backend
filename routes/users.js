// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// 用户注册
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        // 检查邮箱是否已注册
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'The email address has been used. Please use another one. ' });
        }

        const newUser = new User({ name, email, password, role });
        await newUser.save();
        res.status(201).send({ user: newUser });
    } catch (error) {
        res.status(400).send({ message: 'Registration failed. Try again later. ' });
    }
});

// 用户登录
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send({ user });
    } catch (error) {
        res.status(500).send(error);
    }
});

// 获取用户信息
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// 更新用户信息
router.put('/', async (req, res) => {
    const { userId, name, email } = req.body;
    try {
        const user = await User.findOneAndUpdate({ _id: userId }, { name, email }, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
