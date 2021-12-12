import c from "chalk";
import { Table } from "console-table-printer";
import ora from "ora";
import readline from "readline";

export const table = Table;
export const chalk = c;

export const logger = {
  withWarning(str: string) {
    return `⚠️  ${c.yellow(str)}`;
  },
  withCaret(str: string) {
    return `${c.gray(">")} ${str}`;
  },
  withCheck(str: string) {
    return `${c.green("✔")} ${str}`;
  },
  withX(str: string) {
    return `${c.red.bold("✕")} ${str}`;
  },
  withProgress(str: string) {
    return logger.withCaret(str);
  },
  withError(str: string) {
    return logger.withX(c.red.bold(str));
  },
  withMeta(str: string) {
    return c.dim(str);
  },
  withVariable(str: string) {
    return c.green(`${str}`);
  },
  withCommand(str: string) {
    return c.cyan(`${str}`);
  },
  withIndent(str: string, indent = 0) {
    const indents = "   ".repeat(indent);
    return `${indents}${str}`;
  },
  spinner(str?: string) {
    const spinner = ora({
      text: str,
      color: "cyan",
      spinner: "dots",
    });
    if (str) spinner.start();
    return spinner;
  },
  clearLine(msg?: string) {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    msg && process.stdout.write(msg);
  },
  clearConsole() {
    if (process.platform === "win32") {
      process.stdout.write("\x1B[2J\x1B[0f");
    } else {
      process.stdout.write("\x1B[2J\x1B[3J\x1B[H");
    }
  },
  title(msg: string) {
    console.log(c.bold(msg));
  },
  list(msgs: string[]) {
    console.log(msgs.map((m) => logger.withCaret(m)).join("\n"));
  },
  error(msg: string) {
    console.error(logger.withX(c.red.bold(msg)));
  },
  warning(msg: string) {
    console.log(logger.withWarning(msg));
  },
  meta(msg: string) {
    console.log(logger.withMeta(msg));
  },
  progress(msg: string) {
    console.log(logger.withCaret(msg));
  },
  success(msg: string) {
    console.log(logger.withCheck(msg));
  },
  log(msg: string, indents = 0, newLine = false) {
    console.log(logger.withIndent(msg, indents));
    if (newLine) console.log();
  },
  newLine() {
    console.log();
  },
  table,
};
