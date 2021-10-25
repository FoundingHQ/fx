@founding/fs
============

Scaffold your application

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@founding/fs.svg)](https://npmjs.org/package/@founding/fs)
[![CircleCI](https://circleci.com/gh/FoundingHQ/scaffold/tree/master.svg?style=shield)](https://circleci.com/gh/FoundingHQ/scaffold/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/@founding/fs.svg)](https://npmjs.org/package/@founding/fs)
[![License](https://img.shields.io/npm/l/@founding/fs.svg)](https://github.com/FoundingHQ/scaffold/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @founding/fs
$ fs COMMAND
running command...
$ fs (-v|--version|version)
@founding/fs/0.0.0 darwin-x64 node-v16.8.0
$ fs --help [COMMAND]
USAGE
  $ fs COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`fs hello [FILE]`](#fs-hello-file)
* [`fs help [COMMAND]`](#fs-help-command)

## `fs hello [FILE]`

describe the command here

```
USAGE
  $ fs hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ fs hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/FoundingHQ/scaffold/blob/v0.0.0/src/commands/hello.ts)_

## `fs help [COMMAND]`

display help for fs

```
USAGE
  $ fs help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_
<!-- commandsstop -->
