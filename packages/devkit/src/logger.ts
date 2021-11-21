import c from "chalk";
import { Table } from "console-table-printer";
import ora from "ora";
import readline from "readline";

export const table = Table;
export const chalk = c;

const brandColor = "#4E5BA6";

const withBrand = (str: string) => {
  return c.hex(brandColor).bold(str);
};

const withWarning = (str: string) => {
  return `⚠️  ${c.yellow(str)}`;
};

const withCaret = (str: string) => {
  return `${c.gray(">")} ${str}`;
};

const withCheck = (str: string) => {
  return `${c.green("✔")} ${str}`;
};

const withX = (str: string) => {
  return `${c.red.bold("✕")} ${str}`;
};

const withProgress = (str: string) => {
  return withCaret(str);
};

const withError = (str: string) => {
  return withX(c.red.bold(str));
};

const branded = (msg: string) => {
  console.log(c.hex(brandColor).bold(msg));
};

const clearLine = (msg?: string) => {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  msg && process.stdout.write(msg);
};

const clearConsole = () => {
  if (process.platform === "win32") {
    process.stdout.write("\x1B[2J\x1B[0f");
  } else {
    process.stdout.write("\x1B[2J\x1B[3J\x1B[H");
  }
};

const warning = (msg: string) => {
  console.log(withCaret(withWarning(msg)));
};

const error = (msg: string) => {
  console.error(withX(c.red.bold(msg)));
};

const meta = (msg: string) => {
  console.log(withCaret(c.gray(msg)));
};

const progress = (msg: string) => {
  console.log(withProgress(msg));
};

const info = (msg: string) => {
  console.log(c.bold(msg));
};

const spinner = (str: string) => {
  return ora({
    text: str,
    color: "cyan",
    spinner: "dots",
  });
};

const success = (msg: string) => {
  console.log(withCheck(c.green(msg)));
};

const variable = (val: any) => {
  return c.cyan.bold(`${val}`);
};

const debug = require("debug")("fx");

export const log = {
  withBrand,
  withWarning,
  withCaret,
  withCheck,
  withX,
  withProgress,
  withError,
  branded,
  clearLine,
  clearConsole,
  error,
  warning,
  meta,
  progress,
  spinner,
  success,
  variable,
  info,
  debug,
  table,
};
