import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";



const Login = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false)

    const { register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const [show, setShow] = useState(false)
    const formData = watch()

    const formSubmit = (data) => {
        console.log(data)
        setShow(true);

    }

    const pass = () => {
        setShowPassword(!showPassword)
    }

    return (
        <form onSubmit={handleSubmit(formSubmit)}>
        <div className="flex flex-col items-center pt-20 h-screen">
            <div className="border-4 border-[#185519] rounded-3xl p-20 w-1/2">
                <div className="items-left">
                    <h2 className="text-5xl pb-10">Log In</h2>

                    <fieldset className="border p-1 rounded-md border-black bg-white mb-10">
                        <legend className="text-xl">Email*</legend>
                        <input className="w-96 h-12 pl-5 focus:outline-none" type="email"
                            {...register("firstName", {required: true})}
                            placeholder="First Name" />
                    </fieldset>

                    <fieldset className="border p-1 rounded-md border-black bg-white mb-5 relative">
                        <legend className="text-xl">Password*</legend>

                        <input
                            className="w-60 h-12 pl-5 focus:outline-none"
                            type={showPassword ? "text" : "password"}
                        />

                        {/* top-1/2 => the element's top is positioned at the halfway point of the container -in this case <input/>.
                transform -translate-y-1/2 => shifts the element upwards by 50% of its own height, 
            making its center align with the center of the container. 
                tranform allows for various transformations (translate, rotate, scale, etc)
            */}

                        {showPassword ? (
                            <FaRegEye
                                onClick={pass}
                                className="size-5 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            />
                        ) : (
                            <FaRegEyeSlash
                                onClick={pass}
                                className="size-5 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            />
                        )}

                    </fieldset>

                    <h1 className="pt-10 text-xl">New to Online Quiz? <button className="bg-yellow-300 hover:bg-[#65c565] rounded-lg px-8" onClick={() => navigate('/signUp')}>CREATE AN ACCOUNT</button></h1>

                    <button className="p-4 text-white text-xl rounded-md bg-[#0A6847] hover:bg-[#d6cf4f] mt-10">
                        Continue
                    </button>
                </div>
            </div>
        </div>
        </form>
    )
}

export default Login
