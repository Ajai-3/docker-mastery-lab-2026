# Dockerfile

A Dockerfile is a simple text file that contains step-by-step instructions for Docker to build an image.

Think of it like a recipe.

Just like a cooking recipe tells:
- what ingredients to use
- what steps to follow

a Dockerfile tells Docker:
- which operating system or environment to use
- which dependencies to install
- where to copy the application code
- how to run the application

---

# Why do we need a Dockerfile?

Without a Dockerfile, you would need to manually:
- install dependencies
- configure environments
- copy files
- start applications

every single time.

A Dockerfile automates all these steps.

So instead of manually setting up the app again and again, Docker can automatically create the same environment anywhere.

---

# Simple Flow

```text
Dockerfile → Docker Image → Docker Container
```

### Explanation

```text
Dockerfile = Instructions
Image = Packaged application
Container = Running application
```

---

# Example Dockerfile

```dockerfile
# Use Node.js as base image
FROM node:18

# Create app folder inside container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Start the application
CMD ["npm", "start"]
```

---

# Beginner Explanation of Each Line

## FROM

```dockerfile
FROM node:18
```

This tells Docker:
> "Start with an image that already has Node.js installed."

Instead of installing Node.js manually, Docker downloads a ready-made Node.js image.

---

## WORKDIR

```dockerfile
WORKDIR /app
```

Creates a working folder inside the container.

Now Docker will perform all next operations inside `/app`.

---

## COPY

```dockerfile
COPY package*.json ./
```

Copies files from your computer into the container.

Here it copies:
- `package.json`
- `package-lock.json`

---

## RUN

```dockerfile
RUN npm install
```

Runs commands while building the image.

This installs all Node.js dependencies.

---

## COPY . .

```dockerfile
COPY . .
```

Copies the entire project into the container.

---

## CMD

```dockerfile
CMD ["npm", "start"]
```

Defines the command to run when the container starts.

Here it starts the Node.js app.

---

# Real World Understanding

Imagine you built a website.

Normally another person would need to:
- install Node.js
- install dependencies
- configure everything manually

But with Dockerfile:

```text
Docker reads instructions
        ↓
Builds image automatically
        ↓
Runs app anywhere the same way
```

---

# Important Note

A Dockerfile does NOT run applications directly.

It only contains instructions to create an image.

```text
Dockerfile → builds Image
Image → creates Container
Container → runs application
```