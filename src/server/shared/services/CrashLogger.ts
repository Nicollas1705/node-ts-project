// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const crashLogger = (message?: any, ...optionalParams: any[]) => {
  console.log(message, optionalParams); // TODO: search for monitoring Node apps with logs
};
