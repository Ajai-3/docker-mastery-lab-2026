# Practical Docker Example: Full Stack Application

In this practical guide, we will demonstrate how to use a `Dockerfile` and a `docker-compose.yml` file to spin up a multi-container application. We have provided the actual source code for this in the `example/` folder at the root of this project.

## How to Run This Example
If you want to recreate this on your machine, follow these steps:

1. Open your terminal.
2. Navigate to the `example` folder: 
   ```bash
   cd ../example
   ```
3. Run the following command to build the image and start the containers:
   ```bash
   docker-compose up -d --build
   ```
4. Open your browser and go to `http://localhost:8080`.
5. To stop the application, run:
   ```bash
   docker-compose down
   ```

---

## Exploring the Files

Inside the `example/` directory, you will find a working Node.js application. Let's break down the two most important files that make Docker run: the `Dockerfile` and the `docker-compose.yml`.

### 1. The Dockerfile (For the Web App)

The `Dockerfile` is used to build the container image for our Node.js application (`example/app.js`).

**What it does:**
* `FROM node:18-alpine`: We use an official, lightweight Linux image that already has Node.js installed.
* `WORKDIR /usr/src/app`: Creates a directory inside the container and sets it as the starting point for following commands.
* `COPY package*.json ./` and `RUN npm install`: We copy the dependency definitions and install them. Doing this first takes advantage of Docker's layer caching—saving time on future builds if our dependencies haven't changed.
* `COPY . .`: Copies our actual application code into the container.
* `EXPOSE 3000`: Documents that our Node.js app is set up to listen on port 3000.
* `CMD ["npm", "start"]`: The command that runs when the container actually starts up.

### 2. The Docker Compose File

The `docker-compose.yml` file allows us to define and run our multi-container application (our Node app AND a MongoDB database) simultaneously.

**What it does:**
* It defines two `services`: `web-app` and `mongo-db`.
* **Database (`mongo-db`)**: Pulls the official MongoDB image from Docker Hub.
* **Web App (`web-app`)**: Uses `build: .` to tell Docker to look in the current folder, find our `Dockerfile`, and build the image from scratch. It also passes an environment variable (`MONGO_URI`) so the Node app knows where the database is.

---

## Explaining Ports, Volumes, and Networks

This setup utilizes Docker's core networking and storage features. Here is why we configured them the way we did in the `docker-compose.yml`:

### Ports (`ports: ["8080:3000"]`)
* **What it does:** Found in the `web-app` service. It maps port `8080` on your host machine (your laptop) to port `3000` inside the `web-app` container.
* **Why we use it:** The Node.js app inside the container is listening on port `3000`. By mapping it, we can open our web browser on our laptop, go to `http://localhost:8080`, and traffic will be seamlessly forwarded into the container's port `3000`. We didn't expose a port for the database because we don't need to access the database directly from our laptop; only the web app needs to talk to it.

### Volumes (`volumes: [mongo-data:/data/db]`)
* **What it does:** Found in the `mongo-db` service. It creates a persistent storage area named `mongo-data` on your host machine and mounts it to `/data/db` inside the MongoDB container.
* **Why we use it:** Containers are ephemeral (temporary). If we delete the MongoDB container, all the database data inside it gets destroyed. MongoDB stores its database files in `/data/db`. By mapping a volume here, the data is saved safely on our laptop's hard drive. Even if the container is deleted and recreated (e.g., using `docker-compose down` and `up`), the database data remains intact.

### Networks (`networks: [example-network]`)
* **What it does:** Creates a custom bridge network named `example-network` and attaches both the `web-app` and `mongo-db` containers to it.
* **Why we use it:** Containers need a secure way to communicate with each other. By placing them on the same custom network:
  1. They are isolated from containers on other networks.
  2. They get **automatic DNS resolution**. Notice how the `web-app` connects to the database using `mongodb://mongo-db:27017`? We didn't need a hardcoded IP address. Docker's custom network automatically resolves the service name `mongo-db` to the correct container IP.
