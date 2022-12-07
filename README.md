# File System API

## Intro

The goal of this file system API is to provide a simple Dockerized way to browse a specified target path. Dockerizing the application provides several benefits, such as speed and portability on different host OS thanks to how Docker uses the host kernel.

## Build and Run

Start the Docker application by providing a root directory:

<code>./bin/start.sh /path/to/root/directory</code>

Run unit tests:

<code>npm test</code>

Stop the Docker application:

<code>./bin/stop.sh</code>
