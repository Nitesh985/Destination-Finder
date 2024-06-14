import React from 'react'

function SideBar({name,icon}) {
  return (
    <>
    <div className=' box-border  w-p rounded-md hover:bg-transparent p-3 flex hover:border border-black flex-nowrap'>
        <img className='h-8 pr-2' src={icon} alt="" />
        <h1 className='text-nowrap'>{name}</h1>
    </div>
    </>
  )
}

export default SideBar