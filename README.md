## Medium App

Created a Medium Clone App.  

It has the following features:-
- User can signup and signin in the application.
- User can post a blog.
- User can see all the blogs after user sign up.
- User can read a certain blog after clicking on it.

**Tech Stack used** :
- React for Frontend
- Cloudflare workers for Backend
- Typescript as the language
- Tailwind CSS for Frontend Styling 
- JWT for Authentication
- Postgres for Database
- Prisma as the ORM, with connection pooling
- Zod for input validation, type inference for the frontend types

**Starting the Project Locally**
1. Replace the prisma accelerate url in the wrangler.toml file and the original database url in the .env file with your own prisma accelerate url and database url respectively.
2. Starting the Backend Locally, Go to the backend folder 
	` cd backend`
3. Run the command, to install the node_modules and the required libraries
	`npm install`
4. Now run the command to start the backend 
	`npm run dev`
5. Starting the Frontend Locally, Go to the frontend folder 	
	`cd frontend`
6. Run the command, to install the node_modules and the required libraries
   `npm install`
7. Now run the command to start the frontend
    `npm run dev`