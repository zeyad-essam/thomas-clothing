export default class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          title: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    if (this.queryStr.colors !== undefined) {
      this.query = this.query.find({
        "color.text": { $in: this.queryStr.colors },
      });
    }

    if (this.queryStr.sizes !== undefined) {
      this.query = this.query.find({
        availableSizes: { $in: this.queryStr.sizes },
      });
    }

    if (this.queryStr.min_price !== undefined) {
      this.query = this.query.find({
        price: { $gt: Number(this.queryStr.min_price) },
      });
    }

    if (this.queryStr.max_price !== undefined) {
      this.query = this.query.find({
        price: { $lt: Number(this.queryStr.max_price) },
      });
    }

    return this;
  }

  pagination(resultPerRequest) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerRequest * (currentPage - 1);

    this.query = this.query.limit(resultPerRequest).skip(skip);

    return this;
  }
}
