# Use the Alpine version of the Node.js image
FROM node:24-alpine

# Set the working directory
WORKDIR /app/frontend/

# First copy package.json and package-lock.json
COPY app/package*.json .

# Install dependencies
RUN npm install

# Copy all source code to the working directory
COPY app .

# Build the application only if ENV=production
ARG ENV=development
ENV ENV=${ENV}

RUN if [ "$ENV" = "production" ]; then npm run build; fi

# Next.js listens on port 3000 by default
EXPOSE 3000

# CMD dynamique selon l'environnement
CMD if [ "$ENV" = "production" ]; then npm run start; else npm run dev; fi
