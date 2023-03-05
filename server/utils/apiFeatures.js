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

    if (this.queryStr.priceRange !== undefined) {
      this.query = this.query.find({
        price: {
          $gte: Number(this.queryStr.priceRange[0]),
          $lte: Number(this.queryStr.priceRange[1]),
        },
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
