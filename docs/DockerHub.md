# Docker Hub

## What is Docker Hub?
Docker Hub is the world's largest library and community for container images. It is a cloud-based registry service managed by Docker that allows you to link to code repositories, build your images and test them, store manually pushed images, and link to Docker Cloud so you can deploy images to your hosts.

## Key Features
* **Image Repositories:** Find, pull, and manage container images.
* **Official Images:** High-quality, Docker-verified images provided by software vendors (e.g., Node.js, Python, Nginx).
* **Automated Builds:** Automatically build container images from source code in GitHub or Bitbucket and push them to Docker Hub.
* **Webhooks:** Trigger actions after a successful push to a repository.
* **Organizations:** Manage access to image repositories across teams.

## Using Docker Hub

### 1. Pulling Images
You don't need an account to pull public images from Docker Hub.
```bash
# Pull the latest Ubuntu image
docker pull ubuntu

# Pull a specific version
docker pull node:18-alpine
```

### 2. Authenticating
To push images or pull from private repositories, you must authenticate.
```bash
docker login
```
*You will be prompted for your Docker Hub username and password/access token.*

### 3. Tagging Images
Before pushing an image to Docker Hub, you must tag it with your Docker Hub username.
```bash
# Syntax: docker tag local-image:tag username/repository:tag
docker tag my-app:v1 myusername/my-app:v1
```

### 4. Pushing Images
Once authenticated and tagged, you can push the image to your repository.
```bash
docker push myusername/my-app:v1
```

## Public vs. Private Repositories
* **Public:** Anyone can pull the image. Good for open-source projects.
* **Private:** Only authorized users can pull the image. Good for proprietary software. Docker Hub provides a limited number of free private repositories depending on your subscription tier.

## Rate Limiting
Docker Hub imposes rate limits on image pulls for anonymous and free users to ensure fair usage.
* Anonymous users: Limited by IP address (e.g., 100 pulls per 6 hours).
* Authenticated free users: Limited by account (e.g., 200 pulls per 6 hours).
* Paid subscriptions offer higher or unlimited pull limits.

## Best Practices for Docker Hub
1. **Use Access Tokens:** Use Personal Access Tokens (PAT) instead of your account password when authenticating from CI/CD pipelines or CLI.
2. **Detailed Descriptions:** Add a clear `README.md` to your repositories so others know how to use your image.
3. **Security Scanning:** Take advantage of image scanning features to detect vulnerabilities in your base images.
