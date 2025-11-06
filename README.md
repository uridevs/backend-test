# Product Orchestration API (backendDevTest)

This is a REST API built with **Node.js, Express, and TypeScript** as part of the `dalogax/backendDevTest` exercise.

The purpose of this application is to act as an **orchestration layer**. It consumes two endpoints from a mock service to create a single, unified endpoint that returns a list of similar products.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **HTTP Client:** Axios
- **Resiliency:** `axios-retry` (for request retries) and `Promise.allSettled` (for parallel orchestration).

## Prerequisites

- Node.js (v18 or higher)
- NPM
- Docker & Docker Compose (to run the mock service environment)

## Environment Setup

This project is designed to work in conjunction with the `backendDevTest` repository, which provides the required mock services.

1.  **Clone Repositories:**
    Ensure you have both repositories cloned into the same root folder:

    ```bash
    # Clone this API
    git clone [https://github.com/miuser/backend-test.git](https://github.com/miuser/backend-test.git) backend-test

    # Clone the mock service environment
    git clone [https://github.com/dalogax/backendDevTest.git](https://github.com/dalogax/backendDevTest.git)
    ```

    _(Your folder structure should look like `.../Projects/backend-test` and `.../Projects/backendDevTest`)_

2.  **Install `backend-test` Dependencies:**
    Navigate into this project's directory and install dependencies.

    ```bash
    cd backend-test
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root of the `backend-test` directory. You can copy the provided example file.
    ```bash
    cp .env.example .env
    ```
    _(No modifications are needed, as it defaults to the mock service URL `http://localhost:3001`)_

## Running the Application (Development)

You will need **two separate terminals** running simultaneously.

1.  **Terminal 1: Start the Mock Service**
    Navigate to the `backendDevTest` repository and start the simulated service:

    ```bash
    cd ../backendDevTest
    docker-compose up -d simulado
    ```

    _(Verify it's running at `http://localhost:3001`)_

2.  **Terminal 2: Start the API (`backend-test`)**
    Navigate back to the `backend-test` directory and start the development server:
    ```bash
    cd ../backend-test
    npm run dev
    ```
    _(The server will run on `http://localhost:5000`)_

## Main Endpoint

The API exposes a single primary endpoint:

- **Method:** `GET`
- **Route:** `/product/:productId/similar`
- **Example:**
  ```
  http://localhost:5000/product/1/similar
  ```
- **Success Response (200 OK):**
  ```json
  [
    { "id": "2", "name": "...", "price": ..., "availability": ... },
    { "id": "3", "name": "...", "price": ..., "availability": ... }
  ]
  ```
- **Error Response (404 Not Found):**
  ```json
  {
    "status": "error",
    "message": "Product principal with ID 999 no encontrado en el mock"
  }
  ```

## Running the Performance Test (k6)

The `backendDevTest` repository includes a `k6` performance test script.

1.  **Start the Full Test Environment:**
    (In the `backendDevTest` directory)

    ```bash
    docker-compose up -d simulado influxdb grafana
    ```

2.  **Run the Test:**
    (Ensure `backend-test` is running on `localhost:5000` in your other terminal).

    ```bash
    docker-compose run --rm k6 run scripts/test.js
    ```

3.  **View the Dashboard:**
    You can view the live test results in Grafana:
    `http://localhost:3000/d/Le2Ku9NMk/k6-performance-test`
