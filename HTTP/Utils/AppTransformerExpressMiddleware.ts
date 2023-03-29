import { AppResult, AppError } from "@carbonteq/hexapp";

const getDataFromAppResult = (data: any) => {
  if (data instanceof AppResult) {
    if (!data._isOk) {
      return AppError.fromErr(data.unwrapErr());
    }
    return data.unwrap();
  } else {
    return data;
  }
};

export const AppTransformerExpressMiddleware = (_req, resp, next) => {
  const oldSend = resp.send;

  resp.send = (data) => {
    if (data?.then !== undefined) {
      // Is Async
      return data
        .then((d: any) => {
          const finalData = getDataFromAppResult(d);
          resp.send = oldSend;
          return oldSend.call(resp, finalData);
        })
        .catch((err: unknown) => {
          resp.send = oldSend;
          next(err);
        });
    } else {
      try {
        const finalData = getDataFromAppResult(data);
        resp.send = oldSend;
        return oldSend.call(resp, finalData);
      } catch (err) {
        resp.send = oldSend;
        next(err);
      }
    }
  };

  next();
};
