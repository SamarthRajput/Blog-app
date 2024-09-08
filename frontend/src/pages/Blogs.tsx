import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"

export const Blogs = () => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="max-w-xl">
                <BlogCard
                    authorName={"Harkirat Singh"}
                    title={"How an Ugly Single-Page Wesite Make $5,000 a Month with Affiliate Marketing "} 
                    content={"How an Ugly Single-Page Wesite Make $5,000 a Month with Affiliate MarketingHow an Ugly Single-Page Wesite Make $5,000 a Month with Affiliate Marketing"}
                    publishedDate={"2nd Feb 2024"}
                    />
            </div>
        </div> 
    </div>
} 