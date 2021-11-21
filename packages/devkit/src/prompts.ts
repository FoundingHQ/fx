import p from "prompts";
import { throwHandledError } from "./error";

export function prompts<T extends string = string>(
  questions: p.PromptObject<T> | Array<p.PromptObject<T>>,
  options?: p.Options
) {
  return p(questions, {
    ...options,
    onCancel: () => {
      throwHandledError({
        command: "prompt",
        message: "Cancelled by user",
      });
    },
  });
}
