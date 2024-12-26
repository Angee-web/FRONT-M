import React from 'react'
import ShoppingHeader from './Header'



const ShoppingLayout = ({children}) => {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        {/* common header */}
        <ShoppingHeader/>
      
        <div className='flex flex-col w-full '></div>
        <main className="flex flex-col flex-1  p-4">{children}</main>
    </div>
  )
}

export default ShoppingLayout