# sessions-service
## ***tl;dr, backend for a retro type tool thing, agile stuff.***

###### The idea with this tool is there **will be no** way of identifying a user, at least that's how it should be. A retro tool should allow complete anonymity for the user in order to allow them to really go through a retro peace and honesty. That's the freaking point after all. 

###### .. With that said, there _will_ be ways to somewhat identify a user's system. This is purely for admininistration type shit, ban users, time someone out, prevent abuse, the works.

###### Alongside that, i'm playing with the idea of a quick and dirty account creation thing, wherein: user wants, account? just add a password. i don't really care if they verify their emails, tf do i need those for?? it's a tool, like a screwdriver or a paint brush, not a library card.


The **Sessions Service** is a standalone backend microservice responsible for managing retrospective session data.  
it's part of the larger **Retro** tool and is designed to run independently or within a multi-service setup.

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
│ ├─ env.ts
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

Create a `.env` file in the project root:
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
