import { rest } from 'msw';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

const mockData = [...Array(10)].map((_, i) => ({
  id: i + 1,
  name: faker.person.fullName(),
  phone: `010-${faker.number.int({
    min: 1000,
    max: 9999,
  })}-${faker.number.int({ min: 1000, max: 9999 })}`,
  email: faker.internet.email(),
  createdAt: dayjs(faker.date.recent({ days: 365 }))
    .toDate()
    .getTime(),
}));

export const userHandlers = [
  rest.get('/api/users', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData));
  }),
  rest.delete('/api/user', async (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.delete('/api/users', async (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.patch('/api/users', (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
