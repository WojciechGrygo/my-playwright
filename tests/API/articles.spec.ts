import { generateArticle } from '../../src/factories/article.factory';
import { loginByApi } from '../../src/helpers/auth';
import { Article, ArticlesRequests } from '../../src/requests/articles';
import { expect, test } from '@playwright/test';

let token: string;
let articleID: number;
let articlesRequests: ArticlesRequests;
let articleData: Article;

test.describe.configure({ mode: 'serial' });
test.describe('Articles tests', async () => {
  test.beforeAll(async ({ request }) => {
    token = await loginByApi(request);
    articleData = generateArticle();
  });

  test.beforeEach(async ({ request }) => {
    articlesRequests = new ArticlesRequests(request, token);
  });

  test('Should create article', async () => {
    const response = await articlesRequests.createArticle(articleData);
    expect(response.status()).toBe(201);
    articleID = (await response.json()).id; // save article ID
  });

  test('Article should exists', async () => {
    const response = await articlesRequests.getArticle(articleID);
    expect(response.status()).toBe(200);
    // Assert title and body of Article
    const responseJson = await response.json();
    expect(responseJson.title).toEqual(articleData.title);
    expect(responseJson.body).toEqual(articleData.body);
  });

  test('Article should be deleted', async () => {
    const response = await articlesRequests.deleteArticle(articleID);
    expect(response.status()).toBe(200);
  });

  test('Article should not exist', async () => {
    const response = await articlesRequests.getArticle(articleID);
    expect(response.status()).toBe(404);
  });
});
