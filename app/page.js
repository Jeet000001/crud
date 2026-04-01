import CreateTask from '@/components/CreateTask'
import ShowTask from '@/components/ShowTask'
import { dbConnect } from '@/lib/dbConnect'
import React from 'react'

const page = async() => {
  await dbConnect()
  return (
    <div>
      <CreateTask />
      <ShowTask />

    </div>
  )
}

export default page