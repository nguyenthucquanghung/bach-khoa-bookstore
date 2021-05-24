import scrapy
import json
import pymongo

class TikiBookSpider(scrapy.Spider):
    name = 'tiki_books'

    book_list_url_format = 'https://tiki.vn/api/v2/products?limit={}&category={}&page={}&urlKey={}'
    book_detail_url_format = 'https://tiki.vn/api/v2/products/{}?platform=web&include=tag,images,gallery,promotions,badges,stock_item,variants,product_links,discount_tag,ranks,breadcrumbs,top_features,cta_desktop'
    limit = 48
    category = 8322
    page = 1
    urlKey = 'sach-van-hoc'
    start_url = book_list_url_format.format(limit, category, page, urlKey)

    headers = {
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36'
    }

    mongodb_client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = mongodb_client['bachkhoabookstore']
    book_detail_collection = db['books']
    no_inserted = 0

    def start_requests(self):
        yield scrapy.Request(
            url=self.start_url,
            headers=self.headers,
            callback=self.parse_pages
        )

    def parse_pages(self, response):
        num_of_pages = int(json.loads(response.body)['paging']['last_page'])
        for i in range(num_of_pages):
            yield scrapy.Request(
                url=self.book_list_url_format.format(
                    self.limit,
                    self.category,
                    str(i + 1),
                    self.urlKey
                ),
                headers=self.headers,
                callback=self.parse_books
            )

    def parse_books(self, response):
        books = json.loads(response.body)['data']
        for book in books:
            yield response.follow(
                url=self.book_detail_url_format.format(str(book['id'])),
                headers=self.headers,
                callback=self.parse_book_detail
            )

    def parse_book_detail(self, response):
        res_body = json.loads(response.body)
        book_detail = {
            'name': res_body['name'],
            'tiki_url': 'https://tiki.vn/' + res_body['url_path'],
            'book_cover': res_body['book_cover'],
            'short_description': res_body['short_description'],
            'discount_price': res_body['price'],
            'real_price': res_body['list_price'],
            'discount': res_body['discount'],
            'discount_rate': res_body['discount_rate'],
            'rating_average': res_body['rating_average'],
            'review_count': res_body['review_count'],
            'thumbnail_url': res_body['thumbnail_url'],
            'has_ebook': res_body['has_ebook'],
            'inventory_status': res_body['inventory_status'],
            'inventory_type': res_body['inventory_type'],
            'description': res_body['description'],
            'images': res_body['images'],
            'publisher': {},
            'authors': [],
            'specifications': res_body['specifications'],
            'stock_item': {},
            'quantity_sold': {},
            'all_time_quantity_sold': res_body['all_time_quantity_sold'],
            'breadcrumbs': [],
            'categories': []
        }

        if 'publisher' in res_body:
            book_detail['publisher'] = res_body['publisher']
        if 'authors' in res_body:
            book_detail['authors'] = res_body['authors']
        if 'quantity_sold' in res_body:
            book_detail['quantity_sold'] = res_body['quantity_sold']
        if 'stock_item' in res_body:
            book_detail['stock_item'] = res_body['stock_item']
        if 'breadcrumbs' in res_body:
            book_detail['breadcrumbs'] = res_body['breadcrumbs']
            book_detail['categories'] = res_body['breadcrumbs']
        self.book_detail_collection.insert_one(book_detail)
        book_detail['_id'] = 0
        yield book_detail
