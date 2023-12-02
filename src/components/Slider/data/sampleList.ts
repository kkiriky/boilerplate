import { faker } from '@faker-js/faker';

export const sampleList = [...Array(6)].map(() =>
  faker.image.urlPicsumPhotos()
);

export const sampleList2 = [...Array(3)].map(() =>
  faker.image.urlPicsumPhotos()
);

export const sampleList3 = [...Array(10)].map(() =>
  faker.image.urlPicsumPhotos()
);
