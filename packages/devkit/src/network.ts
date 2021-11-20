import got, { Response } from "got";

const parseJsonRes = (res: Response<string>) => JSON.parse(res.body);

export const gotJSON = (url: string) => got(url).then(parseJsonRes);

export const gotStream = (url: string) => got.stream(url);

export const isUrlValid = async (url: string) => {
  return (await got(url).catch((e) => e)).statusCode === 200;
};
