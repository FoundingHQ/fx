/**
 * This trustProxyMiddleware replicates Express' app.set("trust proxy", true) to make auth work on Vercel. (inspired by blitz-js/blitz#966)
 */
export const trustProxyMiddleware = (req: any, _: any, next: any) => {
  req.protocol = getProtocol(req);
  next();
};

const getProtocol = (req: any) => {
  // @ts-ignore the types for req.connection are incorrect
  if (req.connection?.encrypted) {
    return "https";
  }

  const forwardedProto =
    req.headers && (req.headers["x-forwarded-proto"] as string);
  if (forwardedProto) {
    return forwardedProto.split(/\s*,\s*/)[0];
  }

  return "http";
};
