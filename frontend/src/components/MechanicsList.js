const MechanicsList = ({mechanics}) => {
    return (
        <div>
          {mechanics.map(mechanic => (
              <div className="mechanic-block" key={ mechanic._id }>
                  {mechanic.available ? <div className="true"></div> : <div className="false"></div>}
                  <div className="names">
                      <div className="first">{mechanic.firstname}</div>
                      <div className="last">{mechanic.lastname}</div>
                  </div> 
                  <div className="distance">{Math.floor(mechanic.distance.calculated/1000)}km away</div>       
              </div>
          ))}
        </div>
    )
}

export default MechanicsList;