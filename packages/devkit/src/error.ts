export const throwHandledError = ({
  command,
  message,
  error,
}: {
  command: string;
  message: string;
  error: any;
}) => {
  console.error(error);
  throw {
    command,
    message,
  };
};
