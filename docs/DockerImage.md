# Docker Images

## What is a Docker Image?
A Docker image is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries, and settings. Images are the blueprints from which Docker containers are created.

## How Docker Images Work
Docker images are built using a layered file system (UnionFS). Each instruction in a `Dockerfile` creates a new layer in the image. When you change the Dockerfile and rebuild the image, only those layers which have changed are rebuilt. This makes Docker images lightweight, small, and fast when compared to other virtualization technologies.

## Creating a Docker Image
Docker images are typically built using a `Dockerfile`—a text document that contains all the commands a user could call on the command line to assemble an image.

### Basic Dockerfile Instructions
* `FROM`: Specifies the base image to build upon (e.g., `FROM node:18-alpine`).
* `WORKDIR`: Sets the working directory inside the container.
* `COPY`: Copies files from the host machine into the image.
* `ADD`: Similar to COPY, but can also extract tar files and download files from URLs.
* `RUN`: Executes commands in a new layer and commits the results (e.g., `RUN npm install`).
* `ENV`: Sets environment variables.
* `EXPOSE`: Documents which ports the container listens on at runtime.
* `CMD`: Provides defaults for an executing container. There can only be one CMD instruction in a Dockerfile.
* `ENTRYPOINT`: Configures a container that will run as an executable.

### Example Dockerfile
```dockerfile
# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run app.js when the container launches
CMD ["node", "app.js"]
```

## Common Docker Image Commands

* **Build an image from a Dockerfile:**
  ```bash
  docker build -t my-app:v1 .
  ```
  *(The `.` specifies the current directory as the build context)*

* **List all local images:**
  ```bash
  docker images
  ```

* **Remove an image:**
  ```bash
  docker rmi <image_id_or_name>
  ```

* **Inspect an image:**
  ```bash
  docker inspect <image_id_or_name>
  ```

## Best Practices
1. **Use Official Base Images:** Start from official images from Docker Hub whenever possible.
2. **Minimize Layers:** Combine `RUN` commands using `&&` to reduce the number of layers.
3. **Use `.dockerignore`:** Exclude files not relevant to the build (like `.git`, `node_modules`, local logs) to speed up the build context transfer.
4. **Multi-Stage Builds:** Use multi-stage builds to keep the final image size small by separating the build environment from the runtime environment.
5. **Tag Consistently:** Use meaningful tags (like version numbers) rather than relying solely on `latest`.
