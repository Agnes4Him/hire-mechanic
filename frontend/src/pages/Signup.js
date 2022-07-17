import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SignupLogin from "../components/SignupLogin";
import ResetPassword from '../components/ResetPassword';

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signupLogin, setSignupLogin] = useState('Login')
    const [signed, setSigned] = useState('signed up')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [isError, setIsError] = useState(true)

    const handleModify = () => {
        if (signupLogin === 'Login') {
            setSignupLogin('Signup')
            setSigned('logged in')
        }else {
            setSignupLogin('Login')
            setSigned('signed up')
        }
    }

    const navigate = useNavigate()

    const handleSignupLogin = (e) => {
        e.preventDefault()
        const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

        if (email.trim().length === 0 && password.trim().length === 0) {
            setErrorMessage('Email and Password are required')
            setIsError(true)
        }else if (password.trim().length === 0) {
            setErrorMessage('Password is required')
            setIsError(true)
        }else if (email.trim().length === 0) {
            setErrorMessage('Email is required')
            setIsError(true)
        }else if (!filter.test(email)) {
            setErrorMessage('Email is not valid')
            setIsError(true)
        }else {
            if (signupLogin === 'Login') {
                const user = { email, password }
                fetch("/api/users/signup", {
                    method:"POST",
                    headers:{"Content-type":"application/json"},
                    body:JSON.stringify(user)
                })
                .then((response)=> {
                    console.log(response)
                    return response.json()
                })
                .then((data) => {
                console.log(data)
                if (data.message === "fields_required") {
                    setErrorMessage('All fields are required')
                    setIsError(true)
                }else if (data.message === "email_taken") {
                    setErrorMessage('That email has been taken')
                    setIsError(true)
                }else if (data.message === "internal_error") {
                    setErrorMessage('An error occured. Please try again later')
                    setIsError(true)
                }else {
                    localStorage.setItem('mytoken', data.message)
                    setSuccessMessage('Signup successful')
                    setIsError(false)
                    setTimeout(() => {
                        navigate('/')
                    }, 1500)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        
        
            }else {
        // Login user here
        const user = { email, password }
        fetch("/api/users/login", {
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(user)
        })
        .then((response)=> {
            //*** Check for error messages from the backend and display
            return response.json()
        })
        .then((data) => {
            console.log(data)
            if (data.message === "fields_required") {
                setErrorMessage('All fields are required')
                setIsError(true)
            }else if (data.message === "no_user") {
                setErrorMessage('That email does not exist')
                setIsError(true)
            }else if (data.message === "password_incorrect") {
                setErrorMessage('Password is incorrect')
                setIsError(true)
            }else if (data.message === "internal_error") {
                setErrorMessage('An error occured. Please try again later')
                setIsError(true)
            }else if (data.message === "just_user") {
                localStorage.setItem('mytoken', data.token)
                setSuccessMessage('Login successful')
                setIsError(false)
                setTimeout(() => {
                    navigate('/')
                }, 1500)
            }else if (data.message === "mech_found") {
                localStorage.setItem('mytoken', data.token)
                localStorage.setItem('mechtoken', data.mechtoken)
                localStorage.setItem('userid', data.userid)
                const fname = (data.mech.firstname).split('')
                const finit = fname[0]
                const lname = (data.mech.lastname).split('')
                const linit = lname[0]
                const initials = finit + linit
                localStorage.setItem('initials', initials)
                setSuccessMessage('Login successful')
                setIsError(false)
                setTimeout(() => {
                    navigate('/')
                }, 1500)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    }
    }

    return (
        <div className="signup-section">
            <Navbar />
            {isError && errorMessage && <div className="error-message">{errorMessage}</div>}
            {!isError && successMessage && <div className="success-message">{successMessage}</div>}
            <div className="signup-container">
            <form className="signup" onSubmit = {handleSignupLogin}>
                <label>Enter your email address</label>
                <input
                type="text"
                placeholder="abc@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <label>Enter password</label>
                <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button className="submit-signup">Submit</button>
            </form>
            <div className="login-option">
                <SignupLogin onModify = {handleModify} signupLogin = {signupLogin} signed = {signed} />
                <ResetPassword />
            </div>
            </div>
            <Footer />
        </div>
    )
}

export default Signup