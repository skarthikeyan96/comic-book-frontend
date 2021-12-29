import axios from "axios";

export default class StrapiClient {
  static fetchData: any;
  constructor() {}

  async fetchData(path: string, query: {populate: string[]}) {
    const url = `${process.env.STRAPI_API_URL}${path}`;

    const response = await axios.get(url, { params: query});
    return response.data.data;
  }
}
