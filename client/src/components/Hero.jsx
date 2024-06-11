import React from 'react'
import Input from './Input'

function Hero({id, name, price}) {
  return (
    <div className='flex justify-between' >
        <div>{id}</div>
        <div>{name}</div>
        <div>{price}</div>
        <br />
    </div>
  )
}

export default Hero