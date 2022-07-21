import { useState } from "react"

const ResetEmail = () => {

    const [confirmEmail, setConfirmEmail] = useState("")
    const [confirmEmailError, setConfirmEmailError] = useState("")
    const [confirmEmailSuccess, setConfirmEmailSuccess] = useState("")

    const handleConfirmEmail = (e) => {
        e.preventDefault()
        if (confirmEmail.trim().length === 0) {
            setConfirmEmailError("Enter your email address")
        }else {
            fetch("/api/users/confirmemail", {
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({confirmEmail:confirmEmail})
            })
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                if (result.message === "no_user") {
                    setConfirmEmailError("That user does not exist")
                }else if (result.message === "internal_error") {
                    setConfirmEmailError("Oops! Something went wrong. Try again.")
                }else {
                    setConfirmEmailError("")
                    setConfirmEmailSuccess("Check your email for a link to reset password")
                }
            })
        }
    }

    return (
        <div className="reset-email">
            {!confirmEmailSuccess && confirmEmailError && <p className="email-error">{confirmEmailError}</p>}
            {!confirmEmailError && confirmEmailSuccess && <p className="email-success">{confirmEmailSuccess}</p>}
            <form onSubmit={handleConfirmEmail}>
                <input 
                placeholder="Enter Your Email Address e.g abc@example.com"
                type="email"
                value={confirmEmail}
                onChange={(e) => {setConfirmEmail(e.target.value)}}
                />
                <br></br>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default ResetEmail