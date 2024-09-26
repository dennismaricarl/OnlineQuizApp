// import { useState } from "react";



// const YourQuiz = (props) => {
//    const [data, setData] = useState(props.data)
//     const solution = []
//     let [result, setResult] = useState(null)


//     const handleSubmit = () => {

//         let count = 0
//         for (let i = 0; i < data.length; i++) {
//           if (data[i].answer === solution[i]) {
//             count++
    
//           }
//         }
//         setResult(count)
    
//       }


//     // console.log(props.data)
//     // console.log(props.category)


//     return(
//         <>
//         {props.category}

//         {/* <h1>{data[0].question}</h1>
//         <h1>{data[0].option1}</h1>
//         <h1>{data[0].option2}</h1> */}

//         {result && <h1>Your total point is: {result}/10</h1>}
//        {data && data.map((htmlQues, i) => (
//          <div>
//           <h1>{htmlQues.question}</h1>
     
 
//            <ul style={{ listStyle: 'none' }}>
 
//              <li>
//                <input
//                  onChange={(e) => solution[i] = e.target.value}
//                  type="radio"
//                  id="htmlQues1"
//                  name={`htmlQues${i}`}
//                  value='A' />
//                <label>{htmlQues.A}</label>
//              </li>
 
//              <li>
//                <input
//                  onChange={(e) => solution[i] = e.target.value}
//                  type="radio"
//                  id="htmlQues2"
//                  name={`htmlQues${i}`}
//                  value='B' />
//                <label>{htmlQues.B}</label>
//              </li>
 
//              <li>
//                <input
//                  onChange={(e) => solution[i] = e.target.value}
//                  type="radio"
//                  id="htmlQues3"
//                  name={`htmlQues${i}`}
//                  value='C' />
//                <label>{htmlQues.C}</label>
 
//              </li>
 
//              <li>
//                <input
//                  onChange={(e) => solution[i] = e.target.value}
//                  type="radio"
//                  id="htmlQues4"
//                  name={`htmlQues${i}`}
//                  value='D' />
//                <label>{htmlQues.options[3]}</label>
//              </li>
//            </ul>
 
//          </div>
//        ))}
//        <button type='submit' onClick={handleSubmit}>SUBMIT</button>
//      </>
//    )
 
//  }

// export default YourQuiz;

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
