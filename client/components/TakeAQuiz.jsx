import { useNavigate } from "react-router-dom";

const TakeAQuiz = () => {
    const navigate = useNavigate();

    const categories = ["HTML", "CSS", "JavaScript", "AdvancedJS", "WomenInCS", "Git"];

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-6xl decoration-8 pt-20">CATEGORIES</h1>
            <div className="grid grid-rows-3 grid-flow-col gap-y-10 gap-x-20 mt-20">
                {categories.map((category) => (
                    <button 
                        key={category} 
                        className="text-4xl text-white text-center rounded-md bg-[#185519] hover:bg-[#d6cf4f] w-80 py-5"
                        onClick={() => navigate(`/quiz/${category}`)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TakeAQuiz;
