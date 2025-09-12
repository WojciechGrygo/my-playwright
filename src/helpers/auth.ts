import { APIRequestContext } from '@playwright/test';

export async function loginByApi(request: APIRequestContext) {
  const userName = process.env.USER;
  const password = process.env.PASSWORD;

  const response = await request.post(`${process.env.URL}/api/login`, {
    data: {
      email: userName,
      password: password,
    },
  });

  return `Bearer ${(await response.json()).access_token}`;
}
