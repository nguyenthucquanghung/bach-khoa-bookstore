const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BaseModel = require('./BaseModel');

const bookSchema = new Schema({

    name: {
        type: String
    },
    tiki_url: {
        type: String
    },
    book_cover: {
        id: {
            type: Number
        },
        value: {
            type: String
        }
    },
    short_description: {
        type: String
    },
    discount_price: {
        type: Number
    },
    real_price: {
        type: Number
    },
    discount: {
        type: Number
    },
    discount_rate: {
        type: Number
    },
    rating_average: {
        type: Number
    },
    review_count: {
        type: Number
    },
    thumbnail_url: {
        type: String
    },
    has_ebook: {
        type: Boolean
    },
    inventory_status: {
        type: String
    },
    inventory_type: {
        type: String
    },
    description: {
        type: String
    },
    images: {
        type: [{
            base_url: {
                type: String
            },
            thumbnail_url: {
                type: String
            },
            small_url: {
                type: String
            },
            medium_url: {
                type: String
            },
            large_url: {
                type: String
            }
        }]
    },
    publisher: {
        id: {
            type: Number
        },
        name: {
            type: String
        },
        slug: {
            type: String
        }
    },
    authors: {
        type: [{
            id: {
                type: Number
            },
            name: {
                type: String
            },
            slug: {
                type: String
            }
        }]
    },
    specifications: {
        type: [
            {
                name: {
                    type: String
                },
                attributes: {
                    type: [
                        {
                            name: {
                                type: String
                            },
                            value: {
                                type: String
                            }
                        }
                    ]
                }
            }
        ]
    },
    stock_item: {
        qty: {
            type: Number
        },
        min_sale_qty: {
            type: Number
        },
        max_sale_qty: {
            type: Number
        },
        preorder_date: {
            type: Number
        }
    },
    quantity_sold: {
        text: {
            type: String
        },
        value: {
            type: Number
        }
    },
    all_time_quantity_sold: {
        type: Number
    },
    breadcrumbs: {
        type: [
            {
                name: {
                    type: String
                },
                category_id: {
                    type: Number
                }
            }
        ]
    },
    categories: Array
});

bookSchema.method('toClient', function () {
    // const book = this.toObject();

    // delete employee.__v;
    // delete employee.deletedAt;
    // delete employee.createdAt;
    // delete employee.updatedAt;

    // return book;
    return (this.toObject());
});

const bookModel = BaseModel.model('books', bookSchema);

class Book {
    static countBooks(conditions) {
        return new Promise((resolve, reject) => {
            const query = bookModel.find(conditions).count();

            query.lean().exec((err, docs) => {
                if (docs) {
                    resolve(docs);
                } else {
                    reject(err);
                }
            });
        });

    }
    static getBooks(conditions, selectParams, limit = 48, skip=0) {
        return new Promise((resolve, reject) => {
            const query = bookModel.find(conditions).limit(limit).skip(skip);

            if (selectParams) {
                query.select(selectParams);
            }

            query.lean().exec((err, docs) => {
                if (docs) {
                    resolve(docs);
                } else {
                    reject(err);
                }
            });
        });
    }
}

module.exports = Book;