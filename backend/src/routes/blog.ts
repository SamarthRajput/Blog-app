import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@samarth_24/medium-common";
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        /**/
        userId: any
    }
}>();

// middleware as the blog routers are need to be authenticated 
// anytime a request comes anywhere on the blogrouters, we are going to do a bunch of authenication checks 
// anytime a request going to /api/v1/blog/... before it reaches that specific route.
blogRouter.use('/*', async (c, next) => {
    // we need to get the header 
    // verify the header 
    // if the header is correct, we can proceed
    // if not, we return the user a 403 status code 

    // the middleware will extract the authorId and pass it down to the route handler 
  
    // first exract the header, now here what matters is the format of the header are you expecting the user to give you something like this Bearer token or we expecting the user to give us just the token
    // usually we have seen, this before as well ki the way we expect the user to give us a token in the authorization header is Bearer token
    // Bearer token = ["Bearer", "token"];
    // we are adding a default string here, ki bhai if header is undefined and pls default to empty string, that way the type of authHeader becomes string and type error in our application goes away
    try {
        const authHeader = c.req.header("authorization") || "";
        // we verify the authHeader bcz we need to verify the actual  
        const token = authHeader.split(" ")[1];
        const user = await verify(token, c.env.JWT_SECRET);
    
        // if user does exists, which means we got back the jwt
        // we can set on the context
        // but if user doesnot exists, we simply return the request right there bcz we know that user is not authenticated and hence should not be able to access any of these routes 
        // we need to explicitly define our extra keys that we are adding to the context by adding a section variables on the top, we need to tell the typescript compiler that userId is a string/any
        if(user){
            c.set("userId", user.id)
            await next();
        } 
        else {
            c.status(403)
            return c.json({
                message: "You are not logged in"
            })
        }
    }
    catch(e){
        c.status(403)
            return c.json({
                message: "You are not logged in"
            })
    }
});

// blog endpoint to create a blog
blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success){
        c.status(403);
        return c.json({
            message: "Inputs are incorrect"
        })
    }
    const authorId = c.get("userId");
    // what will the authorId be, where can extract this authorId, this extraction will happen in the middleware,
    // the middleware is the place where you take the token from the user and actually extract the authorId from it and pass it from the middleware tool to the actual route handler
    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            published: body.published,
            authorId: authorId 
        }
    })
    return c.json({
        id: post.id
    })
});
    
// blog endpoint to update a blog, it needs to update the title and the content of the post 
// the put request only allows the user to change the title and content of the post
blogRouter.put('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success){
        c.status(403);
        return c.json({
            message: "Inputs are incorrect"
        })
    }

    const post = await prisma.post.update({
        where: {
            id: body.id
        }, 
        data: {
            title: body.title,
            content: body.content
        }
    });
    
    return c.json({
        id: post.id
    })
});

// this route will give us all the blogs currently that exists for the landing page
// we should add pagination to this endpoint which means, we shouldn't return all the blogs we should return first 10 blogs to the user and the user can ask for more as they scroll down to the window 
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
     
    const posts = await prisma.post.findMany();
    return c.json({
        posts
    });
});
  
// blog endpoint to get a specific blog, get a particular blog with its id route
blogRouter.get('/:id', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const id = c.req.param('id');
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id
            }
        })

        return c.json({
            post
        });
    }
    catch(e){
        c.status(411)
        c.json({
            message: "Error while fetching blog post"
        })
    }
});

  