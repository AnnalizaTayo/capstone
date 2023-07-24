import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (password) {
                // Check if password contains at least one uppercase letter
                return /[A-Z]/.test(password);
            },
            message: 'Password should contain at least one uppercase letter',
        }
    },
    role: {
        type: String,
        default:'moderator',
        enum: ['admin','moderator'],
        lowercase: true,
        index: true,
        required: true,
        select: false   // Hide this field in queries by default for security reasons
    }
});

export const UserModel = mongoose.model('users', UserSchema, 'user_list');
