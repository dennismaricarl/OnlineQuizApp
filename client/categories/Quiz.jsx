import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Quiz = () => {

  const [ques, setQues] = useState([])
  let [result, setResult] = useState(null)

  const { category: category } = useParams();
  const solution = []


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/${category}`);
        const data = await response.json();
        console.log("fetched data:", data);
        setQues(data[0].questions);
      } catch (e) {
        console.error("Error fetching quiz data:", e.message);
      }
    };

    fetchData();
  }, [category]);




  const handleSubmit = () => {

    let count = 0
    for (let i = 0; i < ques.length; i++) {
      if (ques[i].answer === solution[i]) {
        count++

      }
    }
    setResult(count)

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }



  return (
    <div className="flex flex-col items-center justify-center">

      {result && <h1 className="text-5xl mt-10">Your score is: {result}/10</h1>}

      {ques && ques.map((ques, i) => (
        <div className="rounded-md bg-[#F5F7F8] hover:bg-yellow-100 border-2 border-[#185519] py-6 px-10 w-1/2 h-80 m-10">
          <div className="text-3xl pb-10"> {ques.question}</div>
          <ul className="space-y-4" style={{ listStyle: 'none' }}>

            <li className="space-x-3">
              <input
                onChange={(e) => solution[i] = e.target.value}
                type="radio"
                id="question1"
                name={`ques${i}`}
                value='A' />
              <label className="text-xl">{ques.options.A}</label>
            </li>

            <li className="space-x-2">
              <input
                onChange={(e) => solution[i] = e.target.value}
                type="radio"
                id="question2"
                name={`ques${i}`}
                value='B' />
              <label className="text-xl">{ques.options.B}</label>
            </li>

            <li className="space-x-2">
              <input
                onChange={(e) => solution[i] = e.target.value}
                type="radio"
                id="question3"
                name={`ques${i}`}
                value='C' />
              <label className="text-xl" >{ques.options.C}</label>

            </li>

            <li className="space-x-2">
              <input
                onChange={(e) => solution[i] = e.target.value}
                type="radio"
                id="question4"
                name={`ques${i}`}
                value='D' />
              <label className="text-xl" >{ques.options.D}</label>
            </li>

          </ul>

        </div>

      ))}

      <button className= "py-6 px-10 m-10 mb-20 rounded-md text-white text-4xl bg-[#185519] hover:bg-[#d6cf4f]" type='submit' onClick={handleSubmit}>SUBMIT</button>

    </div>
  )

}


export default Quiz;