const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {bookSchema} = require("./Book");

const BaseModel = require('./BaseModel');

const cartSchema = new Schema({
    time: Number,
    status: Number,
    userId: {
        type: String,
        index: true
    },
    username: String,
    email: String,
    books: [{
        qty: Number,
        book: {
            type: bookSchema
        }
    }]
});


const cartModel = BaseModel.model('carts', cartSchema);

class Cart {
    static create (data) {
        const newProject = cartModel(data);

        return new Promise((resolve, reject) => {
            const error = newProject.validateSync();
            if (error) {
                reject(error);
            }

            newProject.save((err, obj) => {
                if (obj) {
                    resolve(obj);
                }
                else {
                    reject(err);
                }
            });
        });
    }

    static getAll (conditions, selectParams) {
        return new Promise((resolve, reject) => {
            const query = cartModel.find(conditions);

            if (selectParams) {
                query.select(selectParams);
            }

            query.lean().exec((err, docs) => {
                if (docs) {
                    resolve(docs);
                }
                else {
                    reject(err);
                }
            });
        });
    }

    static get (conditions, selectParams) {
        return new Promise((resolve, reject) => {
            const query = cartModel.findOne(conditions);

            if (selectParams) {
                query.select(selectParams);
            }

            query.lean().exec((err, docs) => {
                if (docs) {
                    resolve(docs);
                }
                else {
                    reject(err);
                }
            });
        });
    }

    static remove (conditions) {
        return new Promise((resolve, reject) => {
            cartModel.remove(conditions, (err, docs) => {
                if (docs) {
                    resolve(docs);
                }
                else {
                    reject(err);
                }
            });
        });
    }
    // PUT /cart/:id
    static findOneAndUpdate (conditions, updateData, options) {
        return new Promise((resolve, reject) => {
            cartModel.findOneAndUpdate(conditions, updateData, options, (err, docs) => {
                if (docs) {
                    resolve(docs);
                }
                else {
                    reject(err);
                }
            });
        });
    }

    static aggregation (pipeline) {
        return new Promise((resolve, reject) => {
            projectModel.aggregate(pipeline, (err, docs) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(docs);
                }
            });
        });
    }

    static update (conditions, updateData, options) {
        return new Promise((resolve, reject) => {
            cartModel.update(conditions, updateData, options, (err, docs) => {
                if (docs) {
                    resolve(docs);
                }
                else {
                    reject(err);
                }
            });
        });
    }
}


module.exports = Cart;