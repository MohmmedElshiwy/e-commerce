import Payment from '@/components/payment/Payment'
import React from 'react'

export default function Page({ params }: { params: { id: string } }) {
  const { id } =  params;
  console.log(id);

  return (
    <>
      <Payment cartId={id} />
    </>
  )
}
