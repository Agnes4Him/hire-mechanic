import { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"

const ConfirmPassword = () => {

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [resetPasswordError, setResetPasswordError] = useState("")
    const [resetPasswordSuccess, setResetPasswordSuccess] = useState("")

    const email = useParams()
    const navigate = useNavigate()

    const handleResetPassword = (e) => {
        e.preventDefault()
        if (newPassword.trim().length === 0) {
            setResetPasswordError("Enter in a new password")
        }else if (confirmPassword.trim().length === 0) {
            setResetPasswordError("Please confirm your password")
        }else if (newPassword !== confirmPassword) {
            setResetPasswordError("Your passwords do not match")
        }else {
            fetch("/api/users/reset/" + email, {
                method:'PUT',
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({newPassword:newPassword})
            })
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                if (result.message === "internal_error") {
                    setResetPasswordError("Unable to reset password, try again later")
                }else {
                    setResetPasswordError("")
                    setResetPasswordSuccess("Password reset was successful")
                    setTimeout(() => {
                        navigate('/signup')
                    }, 1000)
                }
            })
        }
    }

    return (
        <div className="confirm-password">
            {!resetPasswordSuccess && resetPasswordError && <p className="reset-error">{resetPasswordError}</p>}
            {!resetPasswordError && resetPasswordSuccess && <p className="reset-success">{resetPasswordSuccess}</p>}
            <form onSubmit={handleResetPassword}>
                <label>Enter New Password:</label>
                <br></br>
                <input
                type="password"
                placeholder="Password"
                value={newPassword}
                onChange={(e) => {setNewPassword(e.target.value)}}
                />
                <br></br>
                <label>Confirm Password:</label>
                <br></br>
                <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {setConfirmPassword(e.target.value)}}
                />
                <br></br>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default ConfirmPassword