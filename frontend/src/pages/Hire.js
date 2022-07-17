import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";
import Footer from "../components/Footer";
import { useState } from 'react';
import MechanicsList from '../components/MechanicsList'

const Hire = () => {
    
    const [mechanics, setMechanics] = useState(null)
    const [lng, setLng] = useState(0)
    const [lat, setLat] = useState(0)
    const [hireError, setHireError] = useState('')
    const [isHireError, setIsHireError] = useState(true)

    const handleHire = (e) => {
        e.preventDefault()
        //Validate form
        if (!localStorage.getItem('mytoken')) {
            setIsHireError(true)
            setHireError("Please login")
        }else if (!lng) {
            setIsHireError(true)
            setHireError("Longitude is required")
        }else if (!lat) {
            setIsHireError(true)
            setHireError("Latitude is required")
        }else {
            fetch('/api/mechanic?lng='+lng+'&lat='+lat, {
                method:"GET",
                headers:{"x-access-token":localStorage.getItem('mytoken')}
            }) 
            .then((data) => {
                return data.json()
            })
            .then((result) => {
                console.log(result)
                if (result.message === "no_token") {
                    setIsHireError(true)
                    setHireError("Please Login")
                }else if (result.message === "no_mechanic") {
                    setIsHireError(true)
                    setHireError("There are no mechanics within your location")
                }else if (result.message === "internal_error") {
                    setIsHireError(true)
                    setHireError("An error occured. Try again later")
                }else {
                    setIsHireError(false)
                    setMechanics(result.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
        
    }

    return (
        <div className="hire-section">
            <Navbar />
            <MobileNavbar />
                <div className="hire-container">
                    <h2>Hire A Mechanic In Your Area!</h2>
                    <div className="hire-form">
                       <form onSubmit = {handleHire}>
                         <label>Enter your latitude</label>
                         <input
                         type="number"
                         step="0.01"
                         placeholder="99.11"
                         value={lng}
                         onChange={(e) => setLng(e.target.value)}
                         />
                         <label>Enter your longitude</label>
                         <input
                         type="number"
                         step="0.01"
                         placeholder="-12.34"
                         value={lat}
                         onChange={(e) => setLat(e.target.value)}
                         />
                         <button>Find Mechanic</button>
                       </form>
                </div>
                {isHireError && hireError && <div className="hireErrorMessage">{hireError}</div>}
                <div className="search-results">
                    {!isHireError && mechanics && <MechanicsList mechanics = {mechanics} />}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Hire;