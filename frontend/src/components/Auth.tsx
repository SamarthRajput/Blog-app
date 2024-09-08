import { SignupInput } from "@samarth_24/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";

export const Auth = ({type}: {type: "signup" | "signin"}) => {

    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        username: "",
        password: "",
        name: ""
    });

    // sendRequest which needs to, based on the type it needs to send the postInputs 
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === 'signup' ? "signup" : "signin"}`, postInputs);
            console.log(response.data);
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        }
        catch(e) {
            // alert the user that the request failed 
            alert("Error while signin up");
        }

    }

    return <div className=" h-screen flex justify-center flex-col">
        <div className="flex justify-center ">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold " >
                        Create an account 
                    </div> 
                    <div className="text-slate-500">
                        {type === "signup" ? "Already have an account?": "Don't have an account "}
                        <Link to={type === 'signup' ? "/signin": "/signup"} className="pl-2 underline">
                            {type === 'signin' ? 'Sign up' : 'Sign in'}
                        </Link>
                    </div>
                </div>
                <div className="pt-8">
                    {type === 'signup' ? <LabelledInput label="Name" placeholder="Enter your name" onChange={(e) => {
                        // here PostInputs has my name, username and password, ...c basically means give me all the existing keys from here and then override the name 
                        // it lets us override the name and lets you retain the existing username and password 
                        setPostInputs(c => ({
                            ...c,
                            name: e.target.value
                        }))
                    }}></LabelledInput> : null}
                    <LabelledInput label="Email" placeholder="Enter your email" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            username: e.target.value
                        }))
                    }}></LabelledInput>
                    {/* this type={"password"} field insure that you see stars in the password field, well if we set the type as password then we probably want to have stars in there */}
                    <LabelledInput label="Password" type={"password"} placeholder="Enter your password" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            password: e.target.value
                        }))
                    }}></LabelledInput>
                    <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        {type === "signup" ? "Sign up" : "Sign in"}
                    </button>
                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}
function LabelledInput({label, placeholder, onChange, type}: LabelledInputType){
    return  <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}