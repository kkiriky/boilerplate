import { rest } from 'msw';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { MockUser } from '@/api/user/user.types';

let mockUsers = [...Array(100)].map((_, i) => ({
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
    return res(ctx.status(200), ctx.json(mockUsers));
  }),
  rest.delete('/api/user', async (req, res, ctx) => {
    const { id } = await req.json<{ id: number }>();
    mockUsers = mockUsers.filter((user) => user.id !== id);

    return res(ctx.status(200));
  }),
  rest.delete('/api/users', async (req, res, ctx) => {
    const idList = await req.json<number[]>();

    for (const id of idList) {
      mockUsers = mockUsers.filter((user) => user.id !== id);
    }

    return res(ctx.status(200));
  }),
  rest.patch('/api/users', async (req, res, ctx) => {
    const editedUserInfoList = await req.json<MockUser[]>();

    for (const info of editedUserInfoList) {
      const index = mockUsers.findIndex((user) => user.id === info.id);
      mockUsers[index] = info;
    }

    return res(ctx.status(200));
  }),
];
