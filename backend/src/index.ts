import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';

// whenever we are initializing hono, we tell it these are my bindings, these are the environment variables that are present 
// we have to pass in generics to make typescript happy, specifically we in this case we had to pass in this Bindings which represents what c.env will contain  
// whatever environment variables you introduce put them in a Bindings section here so that typescript knows this actually exists 
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

// any request that comes to any where doesnt matter we use the cors middleware, which means our backend can talk to the frontend 
app.use('/*', cors());

// any request that is coming to /api/v1/user/.. which now reach to userRouter
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

// every route might be independently deployed, its not neccessary that all the routes are deployed all together, so we should never even hope to have any access to any data in the global context
// all the environment variables, any other access to any other data that you might want you will get it in this c (context) variable,you will not get it outside
// thats why we need to initailise prisma again and again bcz we dont have access to environment variables outside  

export default app
