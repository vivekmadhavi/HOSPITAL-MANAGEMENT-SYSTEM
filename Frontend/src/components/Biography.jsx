import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className='banner'>
        <img src={imageUrl} alt="about Img" />
      </div>
      <div className='banner'>
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>
          Loriece of0 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, 
        </p>
        <p>Lorem ipsum dolor adipiscing elit</p>
        <p>labore et dolore magna aliqua. </p>
        <p>non proident, sunt in culpa q</p>
        <p>lorem3</p>
      </div>
    </div>
  )
}

export default Biography
