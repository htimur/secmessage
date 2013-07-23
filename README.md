# Secmessage
## _a simple service to send encrypted messages_

This app is of course a proof-of-concept. The idea is to encrypt short messages
using the [Stanford Javascript Crypto Library](http://crypto.stanford.edu/sjcl/)

Javascript encryption is [by no means secure](http://www.matasano.com/articles/javascript-cryptography/).

## Installation

Clone this repository.

run

    npm install

inside the secmessage directory to install all dependent nodejs modules.

run

    bower install

inside the public directory to install all dependent javascript libraries modules.

##TODO

In the future would be good to use grunt/jake to build the project

## Running

* ./bin/dev_start.sh will start your server.js node app in single-CPU mode with hot-realoading of code enabled.
* ./bin/start.sh will start your server.js without hot-reloading, but with as many child processes as you have CPU cores.

By default, dev_start.sh also lets Express.js handle static files so you don't have to have a web server. The production
version: start.sh assumes you want your web-server (Nginx?) to take on this job.

Run tests with:

    npm test

## Contextualizing Runtime Environment

Following environmental variables can affect the runtime behavior and startup mode:

* NODE_LAUNCH_SCRIPT - defaults to "server.js"
* NODE_ENV - defaults to "production"
* NODE_CLUSTERED - defaults to 1 (on)
* NODE_HOT_RELOAD - defaults to 0 (off)
* NODE_SERVE_STATIC - defaults to 0 (off) - in production you should serve static content with NginX, not: Node.
* NODE_CONFIG_DIR - defaults to "config" folder in the current folder
* NODE_LOG_DIR - defaults to "logs" folder in the current folder

## Hot Reloading vs. Daemon-izing Script.

In production environments it is a good idea to daemon-ize your Node process using Forever.js. Forever will restart
the process if it accidentally crashes.

In development, it is much more important to have "hot-reloading" of code available. This feature can be provided
with Supervisor.js package. If you set NODE_HOT_RELOAD to 1, start.sh will run in hot-reloading mode watching your
main script, libs folder and config folder.

Unfortunately, Supervisor and Forever packages do not work nicely with each other, so you can only use one
or the other, at this point. Setting NODE_HOT_RELOAD to 1 disables backgrounding of your script and runs your Node
application in foreground (which, to be fair, in most cases, is what you probably want during development, anyway).

## File Limits

Hot reloading uses native file watching features of *nix systems. This is extremely handy and efficient, but 
unfortunately most systems have very low limits on watched and open files. If you use hot reloading a lot, you should
expect to see: "Error: watch EMFILE" or similar.

To solve the problem you need to raise your filesystem limits. This may be a two-step process. On Linux, there're hard
limits (something root user can change in /etc/limits.conf or /ets/security/limits.conf) that govern the limits individual
users can alter from command-line.

Put something like this (as root) in your /etc/limits.conf or /etc/security/limits.conf:

```bash
* hard nofile 10000
```

Then log out, log back in and run:

```bash
> ulimit -n 10000
```

You should probably put `ulimit -n 10000` in your .profile file, because it does not persist between restarts.

For OS-X and Solaris-specific instructions see [a Stackoverflow Answer](http://stackoverflow.com/questions/34588/how-do-i-change-the-number-of-open-files-limit-in-linux/34645#34645)

On certain Linux distributions you may also need to raise iNotify limit:

```bash
sysctl fs.inotify.max_user_instances=16384 && echo sysctl fs.inotify.max_user_instances=16384  | sudo tee /etc/rc.local  
```

And last, but not least, it's a good idea to also run:

```bash
> sudo sysctl -w kern.maxfiles=40960 kern.maxfilesperproc=20480
```