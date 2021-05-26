const User = require('./../models/User');
const helpers = require('./../common/helpers');
const bcrypt = require('bcryptjs');
const auth = require('./../middleware/auth');
const Book = require('./../models/Book');
const Cart = require('./../models/Cart');
const {CartStatus} = require('./../common/constants');
const mongoose = require('mongoose');

class UserController {
    // POST /user
    async signUp(req, res, param, postData) {
        const userData = JSON.parse(postData);
        try {
            const newUser = await User.signUp(userData);
            const token = await newUser.generateAuthToken();
            return helpers.success(res, {newUser, token});
        } catch (error) {
            if (error.name === 'ValidationError') {
                return helpers.validationError(res, error);
            } else if (error.message.indexOf('duplicate key error') !== -1) {
                return helpers.validationError(res, 'Email already exists');
            } else {
                return helpers.error(res);
            }
        }
    }

    async signIn(req, res, param, postData) {
        const signInData = JSON.parse(postData);
        try {
            const user = await User.signIn(signInData);
            const isPasswordMatch = await bcrypt.compare(signInData.password, user.password);
            if (isPasswordMatch) {
                const token = await user.generateAuthToken();
                return helpers.success(res, {user, token});
            } else {
                return helpers.unauthorized(res, "Wrong password!");
            }
        } catch (error) {
            return helpers.error(res, error);
        }
    }

    async signOut(req, res) {
        const user = await auth(req, res);
        try {
            if (user) {
                user.tokens = user.tokens.filter((token) => {
                    return token.token !== req.headers.authorization.replace('Bearer ', '')
                });
                await user.save();
                return helpers.success(res);
            } else return helpers.unauthorized(res);
        } catch (error) {
            return helpers.unauthorized(res);
        }
    }

    async signOutAll(req, res) {
        const user = await auth(req, res);
        try {
            if (user) {
                user.tokens.splice(0, user.tokens.length)
                await user.save();
                return helpers.success(res);
            } else return helpers.unauthorized(res);
        } catch (error) {
            return helpers.unauthorized(res);
        }
    }

    async getUser(req, res) {
        const user = await auth(req, res);
        return helpers.success(res, user);
    }

    async addToCart(req, res, param, postData) {
        try {
            const bookData = JSON.parse(postData);
            const user = await auth(req, res);

            let inCartAlready = false;
            for (let i = 0; i < user.currentCart.length; ++i) {
                if (user.currentCart[i].book._id.equals(bookData.bookId)) {
                    user.currentCart[i].qty += 1;
                    inCartAlready = true;
                    user.save();
                    break;
                }
            }
            if (!inCartAlready) {
                const book = await Book.getBookById(bookData.bookId);
                user.currentCart = user.currentCart.concat({
                    qty: 1,
                    book: book[0]
                });
                await user.save();
            }
            return helpers.success(res);
        } catch (error) {
            return helpers.error(res, error)
        }
    }

    async deleteFromCart(req, res, param, postData, params) {
        try {
            const user = await auth(req, res);

            for (let i = 0; i < user.currentCart.length; ++i) {
                if (user.currentCart[i].book._id.equals(params.bookId)) {
                    if (user.currentCart[i].qty > 1) {
                        user.currentCart[i].qty -= 1;
                    } else {
                        user.currentCart.splice(i, 1);
                    }
                    user.save();
                    break;
                }
            }
            return helpers.success(res);
        } catch (error) {
            return helpers.error(res, error)
        }
    }

    async deleteItemFromCart(req, res, param, postData, params) {
        try {
            const user = await auth(req, res);
            for (let i = 0; i < user.currentCart.length; ++i) {
                if (user.currentCart[i].book._id.equals(params.bookId)) {
                    user.currentCart.splice(i, 1);
                    user.save();
                    break;
                }
            }
            return helpers.success(res);
        } catch (error) {
            return helpers.error(res, error)
        }
    }

    async buy(req, res) {
        try {
            const user = await auth(req, res);
            const newCart = await Cart.create({
                time: (new Date()).getTime(),
                status: 0,
                userId: user._id,
                username: user.name,
                email: user.email,
                books: user.currentCart
            });
            user.boughtCarts.push({
                time: (new Date()).getTime(),
                books: user.currentCart
            });
            user.currentCart = [];
            user.save();

            return helpers.success(res);
        } catch (error) {
            console.log(error)
            return helpers.error(res, error)
        }

    }
}

module.exports = new UserController();