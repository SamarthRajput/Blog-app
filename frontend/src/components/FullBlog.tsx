import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
             
        <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12">
            <div className="col-span-8">
                <div className="text-5xl font-extrabold">
                    {blog.title}
                </div>
                <div className="text-slate-500 pt-4">
                    Posted on 2nd Feb 2024
                </div>
                <div className="pt-4 ">
                    {blog.content}
                </div>
            </div>
            <div className="col-span-4">
                <div className="pb-2 text-slate-600 text-lg">
                    Author 
                </div>
                <div className="flex">
                    <div className="pr-4 flex justify-center flex-col">
                        <Avatar size="big" authorName={blog.author.name}/>
                    </div>
                    <div>
                        <div className="font-bold pt-2 text-xl">
                            {blog.author.name || "Anonymous"}
                        </div> 
                        <div className="pt-2 text-slate-500">
                            Random catch phrase about the authors ability to grab the user's attention
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        </div>

    </div>
}