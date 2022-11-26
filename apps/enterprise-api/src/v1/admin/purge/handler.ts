import { RequestHandler } from 'express';

export const post: RequestHandler = async (request, response) => {
  console.log('purging');

  response.json({ status: 'ok' });
};
