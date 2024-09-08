
interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <div className="border-b border-slate-200 pb-4 p-4">
        <div className="flex">
            <div className="flex">
            <Avatar authorName={authorName} />  
            </div>
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col"> {authorName} </div>
            <div className="flex justify-center flex-col pl-2"> <Circle /> </div>
            <div className="font-thin pl-2 text-slate-500 text-sm flex justify-center flex-col"> {publishedDate} </div>
        </div>
        <div className="text-xl font-semibold pt-2">
            {title}
        </div>
        <div className="font-thin text-md">
            {content.slice(0, 100) + "..."}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4"> 
            {`${Math.ceil(content.length / 100 )} minute(s) read`}
        </div>
    </div>
}

function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}


export function Avatar({ authorName, size = "small" }: { authorName: string, size?: "small" | "big" }){
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600  ${size === 'small' ? "h-6 w-6" : "h-10 w-10"} `}>
        <span className={` text-gray-600 dark:text-gray-300 ${size === 'small' ? "text-xs"  : "text-lg"}` }>{authorName[0]}</span>
    </div> 
}