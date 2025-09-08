"use client"
import React from 'react'
import x from "../../public/images/error.svg"
import Image from 'next/image'


export default function ErrorPage() {
  return (
    <div>

        <Image src={x} alt='error' className='m-auto'/>
    </div>
  )
}
