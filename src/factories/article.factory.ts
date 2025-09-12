import { faker } from '@faker-js/faker';

export function generateArticle() {
  return { title: faker.lorem.words(3), body: faker.lorem.paragraphs(5) };
}
