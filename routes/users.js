const express = require('express');
const router = express.Router();
const User = require('../models/user');

// 用户注册
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    const newUser = new User({ name, email, password, role });
    try {
        await newUser.save();
        res.status(201).send({ user: newUser });
    } catch (error) {
        res.status(400).send(error);
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
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.userId });
        if (!user) {
            return res.status(404).send('User not found');
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
        const user = await User.findOneAndUpdate({ email: userId }, { name, email }, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
