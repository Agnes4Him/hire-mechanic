const DeleteModal = ({onCancel, onConfirm}) => {

    return (
        <div className="modal">
            <p>Are you sure you want to delete account?</p>
            <div className="cancel-confirm">
                <button className="cancel-delete" onClick={onCancel}>Cancel</button>
                <button className="confirm-delete" onClick={onConfirm}>Confirm</button>
            </div>
        </div>
    )
}

export default DeleteModal