export const BASE_URL = "http://localhost:3000";

export default class Api {
  static async get(url) {
    const response = await fetch(`${BASE_URL}/${url}`);

    return await response.json();
  }

  static async getWithParams(url, params) {
    const response = await fetch(
      `${BASE_URL}/${url}?${new URLSearchParams(params)}`
    );

    return await response.json();
  }

  static async post(url, body) {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  }
}
