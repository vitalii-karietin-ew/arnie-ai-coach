# ARNIE-AI-COACH

A NextJS-based AI fitness coaching application.

## Demo

https://github.com/user-attachments/assets/3770eeda-3d7c-469b-b024-a6f663069e67

## Preview

https://arnie-ai-coach.vercel.app/

## Features

- AI-powered chat assistant with motivational responses
- User authentication (sign-in and sign-up functionality)
- Profile management
- OpenAI integration for intelligent responses
- Xata cloud service integration

## Tech Stack

### Frontend & Backend
- **NextJS:** Utilized for both the frontend and backend, providing a unified development framework that supports server-side rendering and static site generation.

### Authentication
- **Clerk:** - Implemented using Clerk.com service to provide secure and seamless user authentication with custom routes for sign-in and sign-up, ensuring user data protection and easy access management.

### Database
- **Postgres:** Reliable relational database for storing user data.
- **Xata cloud service (Prisma ORM):** Xata provides a cloud-based database service integrated with Prisma ORM for easy data handling and migrations.

### AI Integration
- **OpenAI API:** Integrates with OpenAI to provide intelligent and responsive AI-powered coaching.

### Styling
- **Tailwind CSS:** Utility-first CSS framework to create modern, responsive designs quickly.


## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env` (see Environment Variables section)
4. Configure [Xata database connection with Prisma ORM](https://xata.io/docs/integrations/prisma)
5. Run the development server: `npm run dev`

## Environment Variables

Create a `.env` file in the root directory and add the following variables:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY>
CLERK_SECRET_KEY=<CLERK_SECRET_KEY>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=<NEXT_PUBLIC_CLERK_SIGN_IN_URL>
NEXT_PUBLIC_CLERK_SIGN_UP_URL=<NEXT_PUBLIC_CLERK_SIGN_UP_URL>
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=<NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL>
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=<NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL>
OPENAI_API_KEY=<OPENAI_API_KEY>
DATABASE_URL=<DATABASE_URL>
APP_SECRET_KEY=<APP_SECRET_KEY>
NEXT_PUBLIC_BASE_URL=<NEXT_PUBLIC_BASE_URL>
```

## Deployment

The app is deployed on Vercel. Automatic deployments are triggered on pushes to the main branch.
