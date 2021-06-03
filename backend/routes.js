/**
 * We define all our routes in this file. Routes are matched using `path`.
 * 1. If "path" is a string, then we simply match with url
 * 2. If "path" is a object, then we assume it is a RegEx and use RegEx matching
 */

const cartController = require('./controllers/CartController');
const bookController = require('./controllers/BookController');
const categoryController = require('./controllers/CategoryController');
const userController = require('./controllers/UserController');

const routes = [
    {
        method: 'POST',
        path: '/user',
        handler: userController.signUp.bind(userController)
    },
    {
        method: 'POST',
        path: '/user/cart',
        handler: userController.addToCart.bind(userController)
    },
    {
        method: 'DELETE',
        path: '/user/cart',
        handler: userController.deleteFromCart.bind(userController)
    },
    {
        method: 'DELETE',
        path: '/user/cart/item',
        handler: userController.deleteItemFromCart.bind(userController)
    },
    {
        method: 'POST',
        path: '/user/cart/buy',
        handler: userController.buy.bind(userController)
    },
    {
        method: 'GET',
        path: '/user/profile',
        handler: userController.getUser.bind(userController)
    },
    {
        method: 'POST',
        path: '/user/login',
        handler: userController.signIn.bind(userController)
    },
    {
        method: 'POST',
        path: '/user/logout',
        handler: userController.signOut.bind(userController)
    },
    {
        method: 'POST',
        path: '/user/logoutall',
        handler: userController.signOutAll.bind(userController)
    },
    {
        method: 'GET',
        path: '/books',
        handler: bookController.index.bind(bookController)
    },
    {
        method: 'GET',
        path: '/search/books',
        handler: bookController.search.bind(bookController)
    },
    {
        method: 'GET',
        path: '/employee',
        handler: cartController.index.bind(cartController)
    },
    {
        method: 'GET',
        path: /\/employee\/([0-9a-z]+)/,
        handler: cartController.show.bind(cartController)
    },
    {
        method: 'POST',
        path: '/employee',
        handler: cartController.create.bind(cartController)
    },
    {
        method: 'PUT',
        path: /\/employee\/([0-9a-z]+)/,
        handler: cartController.update.bind(cartController)
    },
    {
        method: 'DELETE',
        path: /\/employee\/([0-9a-z]+)/,
        handler: cartController.delete.bind(cartController)
    },
    {
        method: 'POST',
        path: '/project',
        handler: categoryController.create.bind(categoryController)
    },
    {
        method: 'GET',
        path: '/project',
        handler: categoryController.index.bind(categoryController)
    },
    {
        method: 'GET',
        path: /\/project\/([0-9a-z]+)/,
        handler: categoryController.show.bind(categoryController)
    },
    {
        method: 'PUT',
        path: /\/project\/([0-9a-z]+)/,
        handler: categoryController.update.bind(categoryController)
    },
    {
        method: 'DELETE',
        path: /\/project\/([0-9a-z]+)/,
        handler: categoryController.delete.bind(categoryController)
    },
];

module.exports = routes;