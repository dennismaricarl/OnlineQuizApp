import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex items-center justify-center space-x-8">
            <h1 className="text-6xl text-black">
                Welcome to the <span className="text-[#FFDC2E]">Online Quiz!</span>
            </h1>

            <div className="flex flex-col space-y-6">
                <button
                    className="text-4xl px-4 py-3 text-white rounded-md bg-[#0A6847] hover:bg-[#d6cf4f]"
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
    );
};

export default HomePage;
