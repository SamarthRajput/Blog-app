import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@samarth_24/medium-common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();


// SignUp Route
userRouter.post('/signup', async (c) => {

    // we have to specify the types of our environment variable, ki bhai this environment variable of mine there is DATABASE_URL environment variable which is a string 
    const prisma = new PrismaClient({
      // the way you get an environment variable inside hono is that you get it in this c variable 
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    // to get body in hono, we have await it bcz if we are converting data to json we have to await it, this returns a promise
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
      c.status(403);
      return c.json({
        message: "Inputs are incorrect"
      })
    }
    // putting the logic inside a try catch is enough to catch the case where we know a duplicate email comes in
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name
        }
      })
    
      // sign() argument1 -> the object that i am signing, usually the only thing that we need to sign the jwt with is this id over here and argument2 a secret to sign it with
      // 
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ 
        message: "Signedup successfully",
        jwt: token
      });
      // i got back the user object from here bcz i need access to the id 
    }
    catch(e){
      console.log(e);
      c.status(411);
      return c.text("Invalid!");
    }
  
});
  
  
  // SignIn route
userRouter.post('/signin', async (c) => {
  
    // we again initialize prisma
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success){
      c.status(403);
      return c.json({
        message: "Inputs are incorrect"
      })
    }
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
          password: body.password
        }
      })
  
      if(!user){
        c.status(403)  //403 is the common status code for unauthorized, basically this is the status code that usually returns when you send the credentials 
        return c.json({
          error: "User Doesnot exists/ Incorrect credentials"
        })
      } 
  
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({
        message: "signed In successfully",
        token: jwt
      });
    }
    catch(e){
      console.log(e);
      c.status(403);
      return c.text("Invalid!");
    }
});