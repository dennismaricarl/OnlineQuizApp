import { useState } from "react";
import YourQuiz from "../categories/YourQuiz";

const MakeAQuiz = () => {
    const [category, setCategory] = useState("");
    const [data, setData] = useState(Array(3).fill({ question: "", options: ["", "", "", ""], answer: "" }));
    const [error, setError] = useState('');
    const [response, setResponse] = useState(false);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedData = data.map((item, i) => (
            i === index ? { ...item, [name]: value } : item
        ));
        setData(updatedData);
    };

    const handleOptionChange = (e, qIndex, oIndex) => {
        const { value } = e.target;
        const updatedData = data.map((item, i) => {
            if (i === qIndex) {
                const updatedOptions = item.options.map((option, j) => (
                    j === oIndex ? value : option
                ));
                return { ...item, options: updatedOptions };
            }
            return item;
        });
        setData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let makePost = true;

        data.forEach((item) => {
            if (
                item.question === "" ||
                item.options.some(option => option === "") ||
                item.answer === ""
            ) {
                makePost = false;
                setError("Must enter value for all fields.");
            }
        });

        if (makePost) {
            try {
                const response = await fetch('http://localhost:8080/api/makeAquiz', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ category, data })
                });
                if (response.ok) {
                    setResponse(true);
                } else {
                    setError("Failed to submit the quiz.");
                }
            } catch (error) {
                console.log(error);
                setError("An error occurred while submitting the quiz.");
            }
        }
    };

    return (
        <>
            {response ? <YourQuiz data={data} category={category} /> : (
                <div>
                    <h1>FORM HERE!</h1>
                    <form>
                        {error && <h1 style={{ color: "red" }}>{error}</h1>}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <select
                                style={{ width: '30%' }}
                                placeholder="Category"
                                value={category}
                                name="category"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option value="HTML">HTML</option>
                                <option value="CSS">CSS</option>
                                <option value="JavaScript">JavaScript</option>
                                <option value="AdvancedJS">Advanced JS</option>
                                <option value="WomenInCS">Women in CS</option>
                                <option value="Random">Random</option>
                            </select>

                            {data.map((item, index) => (
                                <div key={index}>
                                    <input
                                        placeholder="Question"
                                        type="text"
                                        value={item.question}
                                        name="question"
                                        onChange={(e) => handleChange(e, index)}
                                    /><br />
                                    {item.options.map((option, oIndex) => (
                                        <>
                                        <input
                                            key={oIndex}
                                            placeholder={`Option ${oIndex + 1}`}
                                            type="text"
                                            value={option}
                                            name={`option${oIndex}`}
                                            onChange={(e) => handleOptionChange(e, index, oIndex)}
                                        /> <br />
                                        </>
                                    ))}
                                    <input
                                        className="input"
                                        placeholder="Answer"
                                        type="text"
                                        value={item.answer}
                                        name="answer"
                                        onChange={(e) => handleChange(e, index)}
                                    /><br />
                                </div>
                            ))}
                            <button style={{ width: '20%', height: '40px' }} onClick={handleSubmit}>SUBMIT</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default MakeAQuiz;
