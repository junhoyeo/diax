import { NextApiRequest, NextApiResponse } from 'next';

export declare type NextApiAsynchronousApiHandler<
  Request extends NextApiRequest = NextApiRequest,
  Response extends NextApiResponse = NextApiResponse,
> = (request: Request, response: Response) => void | Promise<void>;

export const allowCORS =
  <
    Request extends NextApiRequest = NextApiRequest,
    Response extends NextApiResponse = NextApiResponse,
  >(
    apiHandler: NextApiAsynchronousApiHandler<Request, Response>,
  ): NextApiAsynchronousApiHandler<Request, Response> =>
  async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    );
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    return await apiHandler(req, res);
  };
