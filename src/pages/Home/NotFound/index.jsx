import React from 'react'

import Banana from '../../../assets/images/banana.png'

function index() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
     <img width={80} src={Banana} className='mb-5'/>
    <p className='text-lg font-medium'>This product not found</p>
  </div>
  )
}

export default index
