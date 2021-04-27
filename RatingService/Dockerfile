# Include node:12 environment
FROM node:12

# Makes a directory
RUN mkdir /app

# Moves to the directory [like 'cd' command]
WORKDIR /app

# Copy the package.json and package-lock.json files at host to /app of container 
COPY package*.json ./

# Installs all requirements included in package.json file
RUN npm i 

# Copy the current directory at host to /app of container 
COPY . .

# Expose or make visible this port outside of container
# EXPOSE 5001

# Run project
CMD [ "npm", "start" ]