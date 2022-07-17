import { Link } from 'react-router-dom';
const ResetPassword = () => {
    return (
        <Link to="/resetemail" className="reset-password" style={{textDecoration:'none'}}>Reset password</Link>
    )
}

export default ResetPassword