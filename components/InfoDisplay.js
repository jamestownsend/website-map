import React from 'react'
import PropTypes from 'prop-types'

function InfoDisplay(props) {

  const data = props.venueInfo
  return (
    <div className="details-modal" tabIndex="0">
      <button
        onClick={props.closeModal}
        onKeyPress={props.closeModal}
        className="close-modal"
        aria-label="Close details window">X</button>
      <h2 className="info-title"><span aria-labelledby="place-title"></span>{data.title}</h2>
      <h3 className="info-cat"><span className="info-cat"  aria-labelledby="place-category">Category</span>:<span className="info-cat"id="place-category">{!data.category ? 'N/A' : data.category}</span></h3>
      <ul>
        <li className="data"><span className="data" aria-labelledby="place-address">Address</span>:<span className="data" id="place-address">{!data.address ? 'N/A' : data.address}</span></li>
        <li className = "Disclaimer"> All data sourced from FourSquare API </li>
      </ul>
      <br/>
    </div>
  )
}

InfoDisplay.propTypes = {
  venueInfo: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default InfoDisplay
