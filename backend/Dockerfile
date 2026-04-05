# Use the official Node 18 Image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Compile TypeScript to JavaScript
RUN npx tsc

# Expose the application port
EXPOSE 3000

# Start the compiled Node application
CMD ["node", "dist/index.js"]
