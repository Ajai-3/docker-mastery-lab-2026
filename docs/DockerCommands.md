# 🐳 Essential Docker Commands Reference

A categorized guide to the most frequently used Docker commands for managing images, containers, and the system.

---

## 1. Container Management
Commands used to control the lifecycle of containers.

| Command | Description |
| :--- | :--- |
| `docker run <image>` | Create and start a container from an image. |
| `docker run -d <image>` | Run a container in the background (detached mode). |
| `docker run -it <image> /bin/bash` | Start a container and open an interactive shell. |
| `docker ps` | List all currently running containers. |
| `docker ps -a` | List all containers (including stopped ones). |
| `docker stop <container_id>` | Gracefully stop a running container. |
| `docker start <container_id>` | Start a stopped container. |
| `docker rm <container_id>` | Remove a specific container. |
| `docker rm -f $(docker ps -aq)` | **Danger:** Remove all containers on the system. |

---

## 2. Image Management
Commands used to build, download, and manage Docker images.

| Command | Description |
| :--- | :--- |
| `docker build -t <name> .` | Build an image from a Dockerfile in the current directory. |
| `docker images` | List all images stored locally. |
| `docker pull <image>` | Download an image from Docker Hub. |
| `docker push <image>` | Upload an image to a registry. |
| `docker rmi <image_id>` | Remove a specific image from local storage. |
| `docker tag <source> <target>` | Create a tag/alias for an image. |

---

## 3. Inspection & Logs
Commands used for debugging and viewing container activity.

| Command | Description |
| :--- | :--- |
| `docker logs <container_id>` | View the output/logs of a container. |
| `docker logs -f <container_id>` | Follow (live stream) the logs of a container. |
| `docker inspect <id>` | View detailed low-level info about a container or image. |
| `docker exec -it <container_id> sh` | Execute a command inside a running container. |
| `docker top <container_id>` | Display the running processes inside a container. |

---

## 4. System & Cleanup
Commands to manage the Docker environment and reclaim disk space.

| Command | Description |
| :--- | :--- |
| `docker version` | Show the Docker version information. |
| `docker info` | Show system-wide information. |
| `docker system prune` | Remove unused data (stopped containers, dangling images). |
| `docker stats` | Show a live stream of container resource usage (CPU/RAM). |

---

## 5. Network & Volumes
Commands for managing data persistence and connectivity.

| Command | Description |
| :--- | :--- |
| `docker network ls` | List all Docker networks. |
| `docker volume ls` | List all Docker volumes. |
| `docker volume create <name>` | Create a new persistent volume. |

---

### Pro Tip: Port Mapping & Volumes
When running a container for a web app, you'll often use these flags:
- `-p 8080:80`: Maps host port 8080 to container port 80.
- `-v /host/path:/container/path`: Mounts a folder from your computer into the container.