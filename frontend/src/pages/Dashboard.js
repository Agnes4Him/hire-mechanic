import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar";
import DashboardHeading from "../components/DashboardHeading";
import MechProfile from "../components/MechProfile";
import Footer from "../components/Footer";

const Dashboard = () => {

    const [mechData, setMechData] = useState({})
    const [mechEmail, setMechEmail] = useState('')
    const [coords, setCoords] = useState([])

    const {id} = useParams()

    useEffect(() => {
        fetch("/api/mechanic/" + id)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.message === "internal_error") {
                console.log("Error occured. Try again")
            }else {
                console.log(data)
                setMechData(data.result)
                setMechEmail(data.user)
                setCoords(data.result.geometry.coordinates)
                //const fname = (data.result.firstname).split('')
                //const finit = fname[0]
                //const lname = (data.result.lastname).split('')
                //const linit = lname[0]
                //const initials = finit + linit
                //localStorage.setItem('initials', initials)

            }
        })
        .catch((err) => {
            console.log(err)
        })
    }, [id])

    return (
        <div className="mech-dashboard">
            <Navbar />
            <DashboardHeading name={mechData.firstname} />
            <MechProfile mechData={mechData} mechEmail={mechEmail} coords={coords} />
            <Footer />
        </div>
    )
}

export default Dashboard