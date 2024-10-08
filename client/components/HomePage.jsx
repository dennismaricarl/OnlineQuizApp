import { useNavigate, useParams } from "react-router-dom";


const HomePage = () => {
    const navigate = useNavigate();

    const { firstName: firstName } = useParams()
    console.log(firstName)

    return (
        <>
            <div className="text-left text-5xl pl-12 pt-14">
                {firstName && <h1>Hello, {firstName}!</h1>}</div>


            <div className="mt-48 flex flex-col items-center justify-center space-x-8 space-y-20">

                <h1 className="text-6xl text-black">
                    Welcome to the <span className="text-[#FFDC2E]">Online Quiz!</span>
                </h1>


                <div className="flex flex-col space-y-6 items-center">
                    <button
                        className="text-4xl px-4 py-3 text-white rounded-md bg-[#0A6847] hover:bg-[#afad77]"
                        onClick={() => navigate('/takeAquiz')}
                    >
                        Take a Quiz
                    </button>
                    <button
                        className="text-4xl px-4 py-3 text-white rounded-md bg-[#0A6847] hover:bg-[#d6cf4f]"
                        onClick={() => navigate('/makeAquiz')}
                    >
                        Make A Quiz
                    </button>
                </div>


            </div>
        </>
    );
};

export default HomePage;
