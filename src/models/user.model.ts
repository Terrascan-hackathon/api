import bcrypt from 'bcrypt';
import mongoose , { Schema } from 'mongoose';
import * as interfaces from '../interfaces/interfaces';

const UserSchema: Schema = new Schema (
    {
        _id: { type: mongoose.Types.ObjectId },
        email: { type: String, trim: true, unique: true, lowercase: true, required: true },
        password: { type: String, minLength: 8, maxLength: 64, trim: true, required: false },
        role: { type: String, enum: ['authority', 'reporter'], required: true },
        loggedIn: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

UserSchema.pre<interfaces.IUser>('save', function(next) {
    let user = this;

    user.updatedAt = new Date();
    
    //Store email as lowercase
    if (user.isModified('email')) {
        user.email = user.email.toLowerCase().trim();
    }

    //Hash password if it's new or modified.
    if (!user.isModified('password')) return next();

    //generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }

        //Has the password using generated salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

export default mongoose.model<interfaces.IUser>('User', UserSchema);
