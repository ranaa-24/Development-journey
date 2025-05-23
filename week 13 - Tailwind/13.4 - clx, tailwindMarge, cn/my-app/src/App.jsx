import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Button from './components/Button'
function App() {

  console.log(clsx(['bg-red-400', false, 'p-4']));
  

  return (
    <>
      <div className={twMerge(clsx({ 'bg-red-400': true, 'bg-blue-400': false }))}>HII MOM</div>
      <Button className="bg-rose-200 rounded-2xl" varient="success"/>
    </>
  )
}

export default App