import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex justify-center flex-col cursor-pointer"> 
            Medium
        </Link>
        <div>
            <Avatar size={"big"} authorName="Harkirat" />
        </div>
    </div>
}