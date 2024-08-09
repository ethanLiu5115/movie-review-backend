const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['user', 'admin'] }, // 确保角色只能是'user'或'admin'
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
