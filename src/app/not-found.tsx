import Image from 'next/image'
import React from 'react'
import error from "../../public/images/error.svg"

export default function notFound() {
  return (
    <div className='min-h-screen flex items-center'>
        <Image src={error} alt='error' className='m-auto'/>
    </div>
  )
}
