# sessions-service
***tl;dr, backend for a retro type tool thing, agile stuff.***

The **Sessions Service** is a standalone backend microservice responsible for managing retrospective session data.  
It is part of the larger **Retro** tool and is designed to run independently or within a multi-service setup.

Built with **Node.js + TypeScript + magic sauce**, it follows best practices for portability, containerization, and future Kubernetes deployment.

---

## Features

- Create and list retrospective sessions  
- MongoDB-powered persistence via Mongoose  
- Structured JSON logs (Kibana/Grafana friendly)  
- Clear modular setup:
  - `controllers/`
  - `services/`
  - `models/`
  - `config/`
- Environment-driven configuration  
- Extensible microservice template for future Retro services


---

## Project Structure
```
sessions-service/
├─ src/
│ ├─ config/
│ │ ├─ env.ts
│ │ └─ mongo.ts
│ │ └─ etc...
│ ├─ controllers/
│ │ └─ sessionController.ts
│ │ └─ etc...
│ ├─ models/
│ │ └─ Session.ts
│ │ └─ etc...
│ ├─ services/
│ │ └─ sessionService.ts
│ ├─ etc...
│ ├─ logger.ts
│ └─ index.ts
├─ package.json
├─ tsconfig.json
├─ .env (ignored)
├─ README.md
└─ even more etc... you just can't see it ):<
```

---

## Setup

### 1. Install dependencies

```bash
npm install
```
### 2. Configure environment variables

Create a .env file in the project root:
```
PORT=4001
MONGO_URL=mongodb://localhost:27017/retro_sessions
NODE_ENV=development
LOG_LEVEL=debug
```

### 3. Start the service in development mode
`npm run dev`

Service will start on:

`http://localhost:4001`

## API Endpoints
#### GET /health

###### Basic health check.

Example Response:
```JSON
{
  "status": "ok",
  "service": "sessions-service",
  "env": "development"
}
```

#### GET /sessions

##### Returns all sessions.

Example Response:
```JSON
[
  {
    "_id": "65492d...",
    "name": "Sprint 42 Retro",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

#### POST /sessions

##### Creates a new session.

Request Body:
```JSON
{
  "name": "Sprint 1 Retro"
}

```

Success Response:
```JSON
{
  "_id": "6549...",
  "name": "Sprint 1 Retro",
  "createdAt": "...",
  "updatedAt": "..."
}
```
## Database

The service connects to MongoDB using Mongoose (or TypeORM, depending on who you argue with).

Run MongoDB using Docker:
```bash
docker run -d --name local-mongo -p 27017:27017 mongo:7
```
###### (if not installed, it'll auto install the mongo pack for docker) or install MongoDB natively on your system, idk you do you lmao

### Scripts
##### Script	Description
`npm run dev`	Start development mode (nodemon + ts-node)
`npm run build`	Compile TypeScript into dist/
`npm start`	Start the compiled JavaScript application

#### Future Enhancements

- Unit tests (Jest + Supertest)

- Dockerfile for container builds

- Jenkins CI/CD pipeline (i still need to work on grasping this better)

- Kubernetes manifests (Deployment, Service, Ingress)

- A whole lot more microservices (boards-service, etc.)
