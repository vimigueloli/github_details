import React from 'react'
import Image from 'Next/image'
import logo from '../../public/logo.png'

export default function Header() {
  return (
    <div className='w-screen h-12 line-center bg-rose-300 fixed z-50'>
      <Image src={logo} width={75} height={30} />
    </div>
  )
}