import { APIRequestContext } from '@playwright/test';

export interface Article {
  title: string;
  body: string;
}

export class ArticlesRequests {
  constructor(
    private request: APIRequestContext,
    private accessToken: string,
  ) {}

  /**
   * Create a new article
   * @returns The response from the API
   */
  async createArticle(articleData: Article) {
    return await this.request.post(`${process.env.URL}/api/articles`, {
      headers: {
        Authorization: this.accessToken,
      },
      data: {
        title: articleData.title,
        body: articleData.body,
        date: '2025-09-05T15:55:16+02:00',
        image: '.\\data\\images\\256\\team-testers_ea249b9f-ac0d-442f-bdcf-84b35cc8391b.jpg',
      },
    });
  }

  /**
   * Delete an article
   * @param articleID The ID of the article to delete
   * @returns The response from the API
   */
  async deleteArticle(articleID: number) {
    return await this.request.delete(`${process.env.URL}/api/articles/${articleID}`, {
      headers: {
        Authorization: this.accessToken,
      },
    });
  }

  /**
   * Get an article by ID
   * @param articleID The ID of the article to get
   * @returns The response from the API
   */
  async getArticle(articleID: number) {
    return await this.request.get(`${process.env.URL}/api/articles/${articleID}`, {
      headers: {
        Authorization: this.accessToken,
      },
    });
  }
}
