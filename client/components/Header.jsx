import logo from "../images/logo.jpg"
import { useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate()

    return (
        <div className="w-full bg-[#FFDC2E] flex justify-between h-28 px-36">

            <img
                className="hover:scale-90 cursor-pointer"
                onClick={() => navigate('/')} 
                src={logo}
                alt="Website Logo"
            />
            <h1
                className="text-2xl font-semibold font-mono pt-10 hover:scale-110 cursor-pointer"
                onClick={() => navigate('/login')}>
                Log In
            </h1>

        </div>
    )
}

export default Header;