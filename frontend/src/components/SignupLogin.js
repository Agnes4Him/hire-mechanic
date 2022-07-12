const SignupLogin = (props) => {
    return (
            <span>Already {props.signed}?<button className="modify-signup" onClick = {props.onModify}>{props.signupLogin}</button></span>
    )
}

export default SignupLogin