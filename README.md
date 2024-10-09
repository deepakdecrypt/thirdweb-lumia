Here is the updated `README.md` file:

## The Lumia Hub

The Lumia Hub is a front-end hub on the Lumia L2 platform, designed to provide users with an overview of Lumia Foundation's official offerings and serve as a gateway to various features and services within the Lumia ecosystem.

## Table of Contents

- `Installation`
- `Installation Conflict`
- `Usage`

## Installation

1. Clone the repository:
   git clone https://github.com/Blockchain-australia/Lumia-Frontend.git
    

2. Navigate to the project directory:
    cd Lumia-Frontend

3. Use Node.js version v22.1.0:
    nvm use 22.1.0

    `If version 22.1.0 is not installed, install it:`
    nvm install 22.1.

4. Install the dependencies:
    npm install

## Installation Conflict

This app uses Thirdweb for authentication, which has some dependency conflicts. To work around these conflicts, use the `--legacy-peer-deps` or `--force` flags when setting up the project or installing any new packages:

    npm i --legacy-peer-deps
    or
    npm i --force

### To Install a New Package

    npm i <package-name> --legacy-peer-deps

## Usage

1. Start the development server:
     
    npm start
    - Open [http://localhost:4002](http://localhost:4002) to view it in your browser.
    - The page will reload when you make changes.
    - You may also see any lint errors in the console.

2. Build the project for production:
     
    npm run build
    - Builds the app for production to the `build` folder.
    - It correctly bundles React in production mode and optimizes the build for the best performance.
    - The build is minified and the filenames include the hashes.

3. Run tests:
     
    npm run test
    - Launches the test runner in the interactive watch mode.

Ensure you have a `.env` file with the following variables:

    VITE_THIRD_WEB_CLIENT_ID
    GENERATE_SOURCEMAP
    VITE_GENERATE_SOURCEMAP
    VITE_PRIVATE_KEY
    VITE_NEWS_API_BASE_URL
    VITE_NEWS_API_AUTH_KEY

This setup should help you manage the dependencies and conflicts while using Thirdweb for authentication.