# File System API

## Intro

The goal of this file system API is to provide a simple Dockerized way to browse a specified target path. Dockerizing the application provides several benefits, such as speed and portability on different host OS thanks to how Docker uses the host kernel.

## Prerequisites

Ensure that you have both [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/linux/) installed prior to starting the application. Note that Docker Desktop has Docker Compose already preinstalled.

## Build and Run

Start the Docker application by providing a root directory:

<code>./bin/start.sh /path/to/root/directory</code>

Run unit tests:

<code>npm test</code>

Stop the Docker application:

<code>./bin/stop.sh</code>

## Interacting with the API

To interact with the API, simply invoke curl commands in the terminal.
The <code>directoryOrFileName</code> query parameter specifies the desired directory or file name to be created.
The <code>isFile</code> query parameter specifies whether or not to create a file or directory.
To specify file contents, simply change the string following <code>contents=</code> in the curl command.

Create new directory:

<code>curl -X POST "localhost:8080?directoryOrFileName=new-dir&isFile=false"</code>

Create new file new-file inside new-dir with contents "Hello\nWorld!:

<code>curl -X POST "localhost:8080/new-dir?directoryOrFileName=new-file&isFile=true" -H "application/x-www-form-urlencoded" -d 'contents=Hello\nWorld!'</code>

Read directory:

<code>curl localhost:8080/new-dir</code>

Read file:

<code>curl localhost:8080/new-dir/new-file</code>

Edit file:

<code>curl -X PUT localhost:8080/new-dir/new-file -H "application/x-www-form-urlencoded" -d 'contents=New Text'</code>

Delete directory or file:

<code>curl -X DELETE localhost:8080/new-dir/new-file</code>

## Notes

I spent around 8 hours working on this assignment. A significant portion (~70%) was spent on investigating how to use the node.js file system API to manipulate files and get directory/file information. Once the investigation was more or less complete, implementation and documentation was relatively quicker. Something I took a while investigating but failed to figure out was looking up an owner uid's corresponding system username. As such, owner is currently reported as just the owner uid.

Given more time, I would write unit tests for file CRUD operations with assistance from NPM's mock-fs package. In addition, I would create a SPA for navigating the specified file system. There would be buttons for creating new directories and files, as well as editing and deleting them. Then, I would write Cypress end-to-end tests for all the happy paths.
