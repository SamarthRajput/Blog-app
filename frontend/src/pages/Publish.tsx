import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    return <div>
        <Appbar />
        <div className="flex justify-center pt-8">
            <div className="max-w-screen-lg w-full">
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Title" 
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />
                <TextEditor onChange={ (e)=> {
                    setContent(e.target.value)
                }}/>
                <button 
                onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title,
                        content
                    }, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    });
                    navigate(`/blog/${response.data.id}`)
                }}
                type="submit" 
                className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                Publish post
            </button>
            </div>
        </div>
    </div>
}

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }){
    return <div>
       <div className="w-full mb-4 mt-4">
            <div className="flex items-center justify-between border rounded-lg">
            <div className=" bg-white w-full">
                <textarea id="editor" rows={8} className="block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2 focus:outline-none" placeholder="Write an article..." required 
                    onChange={onChange}
                />
            </div>
            </div>
       </div>
    </div>
    
}