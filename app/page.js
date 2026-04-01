import Task from '@/components/Task'
import { dbConnect } from '@/lib/dbConnect'
import React from 'react'

const page = async() => {
  await dbConnect()
  return (
    <div>
      <Task />
    </div>
  )
}

export default page