import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'

const Navbar = () => {

    const [token, setToken] = useState(localStorage.getItem('mytoken'))
    const [mechtoken, setMechToken] = useState(localStorage.getItem('mechtoken')) 

    const navigate = useNavigate()

    //Check for tokens expirations 

    useEffect(() => {

        if (token && !mechtoken) {
            fetch("/api/mechanic/checkmytoken", {
                method:"POST",
                headers:{"Content-type":"application/json", "x-access-token":token}, //add mytoken to headers object
            })
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                if (result.message === "token_expired") {
                    setToken(localStorage.removeItem('mytoken'))
                    localStorage.removeItem('userid')
                    localStorage.removeItem('initials')
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }else if (token && mechtoken) {
            fetch("/api/mechanic/checkmechtoken", {
                method:"POST",
                headers:{"Content-type":"application/json", "x-access-token":token}, //add mytoken to headers object
                body:JSON.stringify({mechtoken})
            })
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                if (result.message === "token_expired") {
                    setToken(localStorage.removeItem('mytoken'))
                    setMechToken(localStorage.removeItem('mytoken'))
                    localStorage.removeItem('userid')
                    localStorage.removeItem('initials')
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }, [token, mechtoken])

    const id = localStorage.getItem('userid')

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
        <div className="nav-container">
            <nav className="nav-components">
                <Link to="/" style={{textDecoration:'none'}}><h2>Mecha<span className="star">Star</span></h2></Link>
                <ul>
                   <Link to="/join" style={{textDecoration:'none'}}><li>Join</li></Link>
                   <Link to="/hire" style={{textDecoration:'none'}}><li>Hire</li></Link>
                   {!token && <Link to="/signup" style={{textDecoration:'none'}}><li>Signup/Login</li></Link>}
                   {token && <li><button onClick = {handleLogout} className="logout-button">Logout</button></li>}
                   {token && mechtoken && <Link to={`/dashboard/${id}`} style={{textDecoration:'none'}}><li className='dashboard'>{localStorage.getItem('initials')}</li></Link>}
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;