const DeleteAccountButton = ({onDelete})=> {

    return (
        <div className="delete-profile">
            <button className="delete-account" onClick={onDelete}>Delete Account</button>
        </div>
    )
}

export default DeleteAccountButton