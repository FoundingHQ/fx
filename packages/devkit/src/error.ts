export const throwHandledError = ({
  command,
  message,
  error,
}: {
  command: string;
  message: string;
  error?: any;
}) => {
  if (error) console.error(error);
  throw {
    command,
    message,
  };
};

export const onPromptCancel = () => {
  throwHandledError({
    command: "prompt",
    message: "User cancelled step",
  });
};
