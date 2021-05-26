const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BaseModel = require('./BaseModel');
const {bookSchema} = require("./Book");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    currentCart: [{
        qty: Number,
        book: {
            type: bookSchema
        }
    }],
    boughtCarts: [{
        time: Number,
        status: Number,
        books: [{
            qty: Number,
            book: {
                type: bookSchema
            }
        }]
    }]
});

userSchema.method('toClient', function () {
    const user = this.toObject();

    delete user.__v;
    delete user.createdAt;
    delete user.updatedAt;

    return user;
});


userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

userSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

const userModel = BaseModel.model('user', userSchema)

class User {
    static register(userData) {
        userData.name = userData.username.replace(/[^a-zA-Z0-9]/g,'');
        userData.password = userData.password.replace(/[^a-zA-Z0-9]/g,'_');
        const newUser = userModel(userData);

        return new Promise((resolve, reject) => {
            const error = newUser.validateSync();
            if (error) reject(error);
            newUser.save((err, obj) => {
                if (obj) resolve(obj);
                else reject(err);
            })
        });
    }
    static logIn(loginData, selectParams) {
        loginData.name = loginData.username.replace(/[^a-zA-Z0-9]/g,'');
        loginData.password = loginData.password.replace(/[^a-zA-Z0-9]/g,'_');
        const {email} = loginData;
        return new Promise((resolve, reject) => {
            const query = userModel.findOne({email});
            if (selectParams) {
                query.select(selectParams);
            }
            query.exec((err, doc) => {
                if (doc) resolve(doc);
                else reject(err);
            })
        })
    }

    static signUp(userData) {
        const newUser = userModel(userData);

        return new Promise((resolve, reject) => {
            const error = newUser.validateSync();
            if (error) reject(error);
            newUser.save((err, obj) => {
                if (obj) resolve(obj);
                else reject(err);
            })
        });
    }

    static signIn(loginData, selectParams) {
        const {email} = loginData;
        return new Promise((resolve, reject) => {
            const query = userModel.findOne({email});
            if (selectParams) {
                query.select(selectParams);
            }
            query.exec((err, doc) => {
                if (doc) resolve(doc);
                else reject(err);
            })
        })
    }

    static getUser(conditions, selectParams) {
        return new Promise((resolve, reject) => {
            const query = userModel.find(conditions);
            if (selectParams) query.select(selectParams);

            query.exec((err, doc) => {
                if (doc) resolve(doc);
                else reject(err);
            })
        })
    }


}

module.exports = User;
