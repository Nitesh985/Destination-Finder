import React from 'react'
import Modal from './Modal'
import Login from './Login';


function Header() {
  const [open, setOpen] = React.useState(false);
 
    const handleClose = () => {
        setOpen(false);
    };
 
    const handleOpen = () => {
        setOpen(true);
    };
  return (
    <div className='flex justify-between'>
      <div className='flex'>
      <h1 className=" Finder font-semibold text-xl font-serif pl-5 pr-3 py-8 select-none">Xplore</h1>
      <div className=' py-9'>
      <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="explore"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"></path></svg>
      </div>
      </div>
      <div className='m-5 w-12 mr-10'>
      <svg className='cursor-pointer' onClick={handleOpen}  viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>user-profile-circle-solid</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2Zm0,8a8,8,0,1,1-8,8A8,8,0,0,1,24,10Zm0,32a18.2,18.2,0,0,1-12.2-4.8A26.4,26.4,0,0,1,24,34a26.4,26.4,0,0,1,12.2,3.2A18.2,18.2,0,0,1,24,42Z"></path> </g> </g> </g></svg>  
      </div>
      <Modal isOpen={open} onClose={handleClose}>
                <>
                    <Login/>
                </>
            </Modal>
      

    </div>
  )
}

export default Header