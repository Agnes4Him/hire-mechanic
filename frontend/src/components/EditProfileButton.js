const EditProfileButton = ({onEdit})=> {

    return (
        <div className="edit-profile">
            <button className="change-available" onClick={onEdit}>Edit</button>
        </div>
    )
}

export default EditProfileButton