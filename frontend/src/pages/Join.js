import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import Footer from "../components/Footer";

const Join = () => {

    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [longitude, setLongitude] = useState(0)
    const [latitude, setLatitude] = useState(0)
    const [available, setAvailable] = useState(false)
    const [joinError, setJoinError] = useState('')
    const [joinSuccess, setJoinSuccess] = useState('')
    const [isJoinError, setIsJoinError] = useState(true)
    
    const navigate = useNavigate()

    const handleJoin = (e) => {
        e.preventDefault()
        //Validate input fields
        if (!localStorage.getItem('mytoken')) {
            setJoinError("Please login")
            setIsJoinError(true)
        }else if (firstname.trim().length === 0) {
            setJoinError("First Name is required")
            setIsJoinError(true)
        }else if (lastname.trim().length === 0) {
            setJoinError("Last Name is require")
            setIsJoinError(true)
        }else if (!longitude) {
            setJoinError("Longitude is require")
            setIsJoinError(true)
        }else if (!latitude) {
            setJoinError("Latitude is require")
            setIsJoinError(true)
        }else {
            const join = { firstname, lastname, longitude, latitude, available }

            fetch("/api/mechanic", {
                method:"POST",
                headers:{"Content-type":"application/json", "x-access-token":localStorage.getItem('mytoken')}, //add token to headers object
                body:JSON.stringify(join)
            })
            .then((outcome)=> {
                return outcome.json()
            })
            .then((result) => {
                console.log(result)
                if (result.message === "no_token") {
                    setJoinError("Please login")
                    setIsJoinError(true)
                }else if (result.message === "mech_exist") {
                    setJoinError("Sorry, you are already in the team")
                    setIsJoinError(true)
                }else if (result.message === "internal_error") {
                    setJoinError("An error occured. Try again later")
                    setIsJoinError(true)
                }else {
                    localStorage.setItem("mechtoken", result.mechtoken)
                    localStorage.setItem("userid", result.userid)
                    const fname = firstname.split('')
                    const finit = fname[0]
                    const lname = lastname.split('')
                    const linit = lname[0]
                    const initials = finit + linit
                    localStorage.setItem('initials', initials)
                    setJoinSuccess("You have successfully joined the team!")
                    setIsJoinError(false)
                    setTimeout(() => {
                        navigate(`/dashboard/${localStorage.getItem('userid')}`)
                    }, 1500)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
        
    }

    return (
        <div className="join-section">
            <Navbar />
            <MobileNavbar />
            <div className="form-container">
                <div className="join-text">
                    <p>Join Our Team!</p>
                </div>
                <div className="join-form">
                    <form onSubmit={handleJoin}>
                        <label>First Name:</label>
                        <input 
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label>Last Name:</label>
                        <input
                        type="text"
                        value={lastname}
                        onChange={(e)=> setLastName(e.target.value)}
                        />
                        <label>Longitude:</label>
                        <input 
                        type="number"
                        step="0.01"
                        placeholder="-35.78"
                        value={longitude}
                        onChange={(e)=> setLongitude(e.target.value)}
                        />
                        <label>Latitude:</label>
                        <input 
                        type="number"
                        step="0.01"
                        placeholder="61.02"
                        value={latitude}
                        onChange={(e)=> setLatitude(e.target.value)}
                        />
                        <label>Available:</label>
                        <select
                        value={available}
                        onChange={(e)=> setAvailable(e.target.value)}>
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </select>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
            {isJoinError && joinError && <div className="error-message">{joinError}</div>}
            {!isJoinError && joinSuccess && <div className="success-message">{joinSuccess}</div>}
            <Footer />
        </div>
    )
}

export default Join;