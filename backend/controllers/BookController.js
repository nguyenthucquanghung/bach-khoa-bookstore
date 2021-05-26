const Book = require('./../models/Book');
const helpers = require('./../common/helpers');

class BookController {
    // GET /books
    async index(req, res, param, postData, params) {
        try {
            const selectParams = {
                _id: 1,
                name: 1,
                images: 1,
                discount_price: 1,
                short_description: 1,
                authors: 1,
                book_cover: 1,
                categories: 1
            };

            const _total = await Book.countBooks({
                categories: {$elemMatch: {category_id: parseInt(params.categoryId)}}
            });
            const _pageSize = parseInt(params.pageSize);
            const _noOfPages = Math.ceil(_total / _pageSize);
            const _curPage = parseInt(params.page);
            const _skip = (_curPage - 1) * _pageSize;
            const meta = {
                total: _total,
                noOfPages: _noOfPages,
                currentPage: _curPage,
                pageSize: _pageSize
            }

            const books = await Book.getBooks({
                categories: {$elemMatch: {category_id: parseInt(params.categoryId)}}
            }, selectParams, _pageSize, _skip);

            return helpers.success(res, books, meta);
        } catch (error) {
            return helpers.error(res, error);
        }
    }

    // GET /search/books
    async searchBook(req, res, param, postData, params) {
        params.searchText = params.searchText.replace(/[^a-zA-Z0-9]/g,' ');
        try {
            const selectParams = {
                _id: 1,
                name: 1,
                images: 1,
                discount_price: 1,
                short_description: 1,
                authors: 1,
                book_cover: 1,
                categories: 1
            };

            const _total = await Book.countBooks({
                $text: {$search: params.searchText}
            });
            const _pageSize = parseInt(params.pageSize);
            const _noOfPages = Math.ceil(_total / _pageSize);
            const _curPage = parseInt(params.page);
            const _skip = (_curPage - 1) * _pageSize;
            const meta = {
                total: _total,
                noOfPages: _noOfPages,
                currentPage: _curPage,
                pageSize: _pageSize
            }

            const books = await Book.getBooks({
                $text: {$search: params.searchText}
            }, selectParams, _pageSize, _skip);

            return helpers.success(res, books, meta);
        } catch (error) {
            return helpers.error(res, error);
        }
    }
    // GET /search/books
    async search(req, res, param, postData, params) {
        try {
            const selectParams = {
                _id: 1,
                name: 1,
                images: 1,
                discount_price: 1,
                short_description: 1,
                authors: 1,
                book_cover: 1,
                categories: 1
            };

            const _total = await Book.countBooks({
                $text: {$search: params.searchText}
            });
            const _pageSize = parseInt(params.pageSize);
            const _noOfPages = Math.ceil(_total / _pageSize);
            const _curPage = parseInt(params.page);
            const _skip = (_curPage - 1) * _pageSize;
            const meta = {
                total: _total,
                noOfPages: _noOfPages,
                currentPage: _curPage,
                pageSize: _pageSize
            }

            const books = await Book.getBooks({
                $text: {$search: params.searchText}
            }, selectParams, _pageSize, _skip);

            return helpers.success(res, books, meta);
        } catch (error) {
            return helpers.error(res, error);
        }
    }
}

module.exports = new BookController();