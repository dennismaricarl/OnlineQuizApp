import {Routes, Route} from 'react-router-dom';
import TakeAQuiz from './components/TakeAQuiz';
import HomePage from './components/HomePage';
import MakeAQuiz from './components/MakeAQuiz';
import Quiz from './categories/Quiz';
import YourQuiz from './categories/YourQuiz';
import Header from './components/Header';
import Login from './components/LogIn';
import SignUp from './components/SignUp';



const App = () => {

    return (
      <div className='h-screen'>
        <Header/>
        <Routes>
        <Route path='/' element= {<HomePage/>}></Route>
        <Route path='/takeAquiz' element={<TakeAQuiz/>}></Route>
        <Route path='/makeAquiz' element={<MakeAQuiz/>}></Route>
        <Route path='/yourQuiz' element={<YourQuiz/>}></Route> 
        <Route path='/quiz/:category' element={<Quiz/>}></Route> 
        <Route path='/logIn' element={<Login/>}></Route> 
        <Route path='/signUp' element={<SignUp/>}></Route> 
    
        </Routes>
        
      </div>
    );
  }

  
  export default App;