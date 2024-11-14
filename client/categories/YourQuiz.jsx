
import { useState } from "react";

const YourQuiz = (props) => {
    const [data, setData] = useState(props.data);
    const [solution, setSolution] = useState(Array(props.data.length).fill(''));
    const [result, setResult] = useState(null);

    const handleOptionChange = (e, qIndex) => {
        const { value } = e.target;
        const updatedSolution = solution.map((sol, i) => (
            i === qIndex ? value : sol
        ));
        setSolution(updatedSolution);
    };

    const handleSubmit = () => {
        let count = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].answer === solution[i]) {
                count++;
            }
        }
        setResult(count);
    };

    return (
        <>
            {props.category}
            {result !== null && <h1>Your total point is: {result}/{data.length}</h1>}
            {data.map((item, i) => (
                <div key={i}>
                    <h1>{item.question}</h1>
                    <ul style={{ listStyle: 'none' }}>
                        {item.options.map((option, oIndex) => (
                            <li key={oIndex}>
                                <input
                                    type="radio"
                                    id={`q${i}o${oIndex}`}
                                    name={`question${i}`}
                                    value={option}
                                    onChange={(e) => handleOptionChange(e, i)}
                                />
                                <label htmlFor={`q${i}o${oIndex}`}>{option}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <button type='submit' onClick={handleSubmit}>SUBMIT</button>
        </>
    );
};

export default YourQuiz;
