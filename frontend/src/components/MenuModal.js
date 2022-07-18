import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiCancel } from "react-icons/gi";

const MenuModal = ({deleteMenuModal}) => {

    const [token, setToken] = useState(localStorage.getItem('mytoken'))
    const [mechtoken, setMechToken] = useState(localStorage.getItem('mechtoken')) 

    const id = localStorage.getItem('userid')

    const navigate = useNavigate()

    const handleLogout = () => {
        setToken(localStorage.removeItem('mytoken'))
        if (mechtoken) {
            setMechToken(localStorage.removeItem('mechtoken'))
            localStorage.removeItem('userid')
            localStorage.removeItem('initials')
        }
        setTimeout(() => {
            navigate('/')
        }, 1000)
    }

    return (
        <div className="menumodal-container">
            <div className="cancel-icon"><GiCancel onClick={deleteMenuModal}/></div>
            <div className="menu-modal">
            <ul>
                <Link to="/" style={{textDecoration:'none'}}><li>Home</li></Link>
                <Link to="/join" style={{textDecoration:'none'}}><li>Join</li></Link>
                <Link to="/hire" style={{textDecoration:'none'}}><li>Hire</li></Link>
                {!token && <Link to="/signup" style={{textDecoration:'none'}}><li>Signup/Login</li></Link>}
                {token && <li><button onClick = {handleLogout} className="mobile-logout">Logout</button></li>}
                {token && mechtoken && <Link to={`/dashboard/${id}`} style={{textDecoration:'none'}}><li>Dashboard</li></Link>}
            </ul>
        </div>
        </div>
    )
}

export default MenuModal