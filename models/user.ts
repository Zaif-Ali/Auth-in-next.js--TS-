import mongoose, { Schema, Error } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/IRserver';


const userSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
        },
        role: {
            type: String,
            default: 'user',
            enum: ['user', 'admin'],
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (_doc, ret) {
                delete ret.password;
            },
        },
    }
);

userSchema.pre<IUser>('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        return next();
    } catch (error: unknown) {
        return next(error as Error);
    }
});

export default mongoose.models.Users || mongoose.model<IUser>('Users', userSchema);
