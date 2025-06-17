# QuickStudyGPT 
An intelligent study tool that transforms your notes into interactive, fill-in-the-blank quizzes using the power of the OpenAI API.

## About This Project
QuickStudyGPT is a full-stack web application designed to enhance the learning process. Users can submit their study notes, and leveraging sophisticated prompt engineering, the application communicates with the OpenAI API to generate a custom-tailored quiz. The goal is to provide an active-recall study method that is both effective and engaging.

## Key Features
  - AI-Powered Quiz Generation: Pastes or types study notes to be analyzed by the OpenAI (ChatGPT) API.
  - Customizable Quizzes: Users can specify the number of fill-in-the-blank questions they want.
  - Interactive Learning: Actively answer questions to reinforce knowledge.

## Modern Tech Stack: Built with a fast and modern Next.js and Deno.js architecture.
## Tech Stack:

### Frontend	
Next.js, React, Tailwind CSS
### Backend
Deno.js
### Database	
Google Firestore, MongoDB
### AI	
OpenAI API (GPT-4 / GPT-3.5)
### Dev-Ops / Containerization	
Docker, Docker Compose

## Local Setup & Installation
To run this project locally, you will need Git, Node.js, Deno, and Docker installed.

Clone the repository:

```
git clone https://github.com/your-username/QuickStudyGPT.git
cd QuickStudyGPT
```

Set up Environment Variables:
This project requires API keys and configuration for the backend.

Create a file named .env in the server/ directory:

```
OPENAI_API_KEY="your-openai-api-key"
REFRESH_TOKEN_SECRET="your-jwauth-refresh-secrent"
ACCESS_TOKEN_SECRET="your-jwauth-access-secret"
```

Build and Run with Docker Compose:
```
docker-compose up -d --build
```

The docker-compose.yml file will build the images for both services and run them.

Access the application:
Open your browser and navigate to http://localhost:3000
