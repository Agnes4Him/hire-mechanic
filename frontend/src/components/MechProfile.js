import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import EditProfileButton from "./EditProfileButton"
import DeleteAccountButton from "./DeleteAccountButton"
import DeleteModal from "./DeleteModal"

const MechProfile = ({mechData, mechEmail, coords}) => {

    const [editError, setEditError] = useState('')
    const [editSuccess, setEditSuccess] = useState('')
    const [showModal, setShowModal] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    
    const handleEdit = ()=> {
        fetch("/api/mechanic/" + id, {
            method:'PUT',
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({available:mechData.available})
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.message === "internal_error") {
                setEditError("An error occured. Try again")
            }else {
                setEditSuccess("Update was successful")
                mechData.available = data.result.available
                setTimeout(() => {
                    setEditSuccess('')                    
                }, 2000);
            }
        })      
    }

    const handleDelete = () => {
        setShowModal(true)
    } 

    const handleCancel = () => {
        setShowModal(false)
    }

    const handleConfirm = () => {
        fetch("/api/mechanic/" + id, {
            method:"DELETE",
            headers:{
                "Content-type":"application/json"
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            if (result.message === "internal_error") {
                setShowModal(false)
                setEditError("An error occured. Try again later")
            }else {
                setShowModal(false)
                setEditSuccess("Account successfully deleted")
                localStorage.removeItem('initials')
                //localStorage.removeItem('mytoken')
                localStorage.removeItem('mechtoken')
                localStorage.removeItem('userid')
                setTimeout(() => {
                    navigate('/')
                }, 1500)
            }
        })
    }

    return (
        <div className="mech-profile">           
            <table>
               <tbody>
                <tr>
                    <td>First Name</td>
                    <td>{mechData.firstname}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Last Name</td>
                    <td>{mechData.lastname}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{mechEmail}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Longitude</td>
                    <td>{coords[0]}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Latitude</td>
                    <td>{coords[1]}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Available</td>
                    {mechData && <td>{String(mechData.available)}</td>}
                    <td><EditProfileButton onEdit={handleEdit} /></td>
                </tr>
              </tbody>
            </table>
            <DeleteAccountButton onDelete={handleDelete} />
            {editError && <div className="edit-error">{editError}</div>}
            {editSuccess && <div className="edit-success">{editSuccess}</div>}
            {showModal && <DeleteModal onCancel={handleCancel} onConfirm={handleConfirm} />}
        </div>
    )
}

export default MechProfile