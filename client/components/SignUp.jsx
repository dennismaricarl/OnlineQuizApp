import { useForm } from "react-hook-form";
import { useState } from "react";

const SignUp = () => {


    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    });

    const [show, setShow] = useState(false)

    const formSubmit = async (data) => {
        try{
            await fetch("http://localhost:8080/api/signUp", {
                method:'POST',
                headers:{                           //additional metadata to send with your request. 
                    'Content-Type': 'application/json'   //content-type tells the server what type of data is being sent in the body of the request! We arere specifying the data is in JSON format.
                },                                         //Without this header, the server might not know how to interpret the request body, leading to errors in processing.
                body: JSON.stringify(data) //converts data object to JSON string!! 
            })
            
        }catch(e){
            console.error("Error registering")
        }
        console.log(data)
        setShow(true);

    }

    return (
        <form onSubmit={handleSubmit(formSubmit)}>
            <div className="flex flex-col items-center pt-20 h-screen">
                <div className="border-4 border-[#185519] rounded-3xl p-20 w-1/2">
                    <div className="items-left">
                        <h2 className="text-5xl pb-10">Sign Up</h2>


                        <>
                            <fieldset className="border p-1 rounded-md border-black bg-white mb-10">
                                <legend className="text-xl">First Name</legend>
                                <input className="w-96 h-12 pl-5 focus:outline-none" type="text"
                                    {...register("firstName", { required: true })}
                                />

                                {errors.firstName && <p className="text-red-700 font-semibold">First Name is required</p>}
                            </fieldset>

                            <fieldset className="border p-1 rounded-md border-black bg-white mb-10">
                                <legend className="text-xl">Last Name</legend>
                                <input className="w-96 h-12 pl-5 focus:outline-none" type="text"
                                    {...register("lastName", { required: true })}
                                />

                                {errors.lastName && <p className="text-red-700 font-semibold">Last Name is required</p>}
                            </fieldset>

                            <fieldset className="border p-1 rounded-md border-black bg-white mb-10">
                                <legend className="text-xl">Email</legend>
                                <input className="w-96 h-12 pl-5 focus:outline-none" type="text"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <p className="text-red-700 font-semibold">Valid email is required</p>}
                            </fieldset>
                            <fieldset className="border p-1 rounded-md border-black bg-white mb-10">
                                <legend className="text-xl">Password</legend>
                                <input className="w-96 h-12 pl-5 focus:outline-none" type="text"
                                    {...register("password", { required: true, minLength: 5 })}
                                />

                                {errors.password && <p className="text-red-700 font-semibold">Password is required. Must be atleast 5 characters.</p>}
                            </fieldset>

                        </>

                        <button className="p-4 text-white text-xl rounded-md bg-[#0A6847] hover:bg-[#d6cf4f] mt-10">
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </form>


    )
}

export default SignUp;