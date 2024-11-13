import { Link } from "react-router-dom"
import frontImage from "../images/frontpage.webp"

export const FrontPage = () => {
    return <div className="">
        <Header />
        <Body />
        <Footer />
    </div>
}

function Header(){
    return <div className="flex justify-between border-b border-black px-10 py-4">
        <div className="font-bold text-3xl ml-40 mt-2">
            Blog App
        </div>
        <div className="mt-2 mr-8">
            <button className="text-md mr-5 text-slate-800 text-center">Our story</button>
            <button className="text-md mr-5 text-slate-800 text-center">Membership</button>
            <button className="text-md mr-5 text-slate-800 text-center">Write</button>
            <Link to={'/signin'}>
                <button className="text-md mr-5 text-slate-800 text-center">Sign in</button>
            </Link>
            <Link to={'/signup'}>
                <button className="text-sm rounded-full bg-black text-white font-medium px-5 py-2 text-center me-2 mb-2">Get started </button>
            </Link>
        </div>
    </div>
}

function Body() {
    return <div className="border-b border-black pb-8">
    <div className="flex justify-between ">
        <div className="flex flex-col justify-center">
            <div className="ml-40 text-center">
                <div className="text-9xl text-left">
                    Human
                </div>
                <div className="text-8xl mt-2">
                    stories & ideas
                </div>
                <div className="text-2xl mt-8">
                    A place to read, write, and deepen your understanding
                </div>
                <Link to={'/signup'}>
                    <div className="rounded-full bg-black text-white py-2 me-2 mb-2 cursor-pointer mt-10 max-w-40">
                        Start reading
                        </div>
                </Link>
            </div>
        </div>
        <div className="max-w-md mt-28 mb-12">
            <img src={frontImage} alt=""/>
        </div>
    </div>
    </div> 
}

function Footer() {
    return <div className="mt-5 text-center flex justify-center">
        <div className="text-sm mr-5 text-slate-800 text-center cursor-pointer">Help</div>
        <div className="text-sm mr-5 text-slate-800 text-center cursor-pointer">Status</div>
        <div className="text-sm mr-5 text-slate-800 text-center cursor-pointer">About</div>
        <div className="text-sm mr-5 text-slate-800 text-center cursor-pointer">Careers</div>
        <div className="text-sm mr-5 text-slate-800 text-center cursor-pointer">Press</div>
        <div className="text-sm mr-5 text-slate-800 text-center cursor-pointer">Blog</div>
        <div className="text-sm mr-5 text-slate-800 text-center cursor-pointer">Privacy</div>
        <div className="text-sm mr-5 text-slate-800 text-center cursor-pointer">Terms</div>
        <div className="text-sm mr-5 text-slate-800 text-center cursor-pointer">Text to speech</div>
        <div className="text-sm mr-5 text-slate-800 text-center cursor-pointer">Teams</div>
    </div>
}   