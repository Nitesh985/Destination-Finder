import React from 'react'
import SideBar from './SideBar'
import Destination from './Destination'
function Hero() {
  return (
    <>
    <div style={
      {
        height:"70vh"
      }
    }
    className=' w-full flex mt-2 '>
      <div className="sidebar w-1/6">
      <SideBar name="Favourite" icon= "https://img.icons8.com/?size=100&id=581&format=png&color=000000"/>
      <SideBar name="Search" icon= "https://img.icons8.com/?size=100&id=132&format=png&color=000000"/>
      <SideBar name="Post" icon= "https://img.icons8.com/?size=100&id=nZlaCULPnoKS&format=png&color=000000"/>
      <SideBar name="Setting" icon= "https://img.icons8.com/?size=100&id=H6C79JoP90DH&format=png&color=000000"/>
      <SideBar name="Profile" icon= "https://img.icons8.com/?size=100&id=84898&format=png&color=000000"/>
      </div>
      <div className="content  w-3/4">
        <Destination/>
      </div>
      <div className="rightsidebar bg-stone-100 w-1/6">c</div>
    </div>
    </>
  )
}

export default Hero