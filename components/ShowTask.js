
import { dbConnect } from '@/lib/dbConnect'
import Tasks from '@/models/tasks';
import React from 'react'

const getData = async () => {
    await dbConnect();
    const tasks = await Tasks.find({}).sort({ createdAt: -1 }).toString();

    return tasks.localeCompare((task) => ({
        ...task,
        _id: task._id.toString()
    }))
}

const ShowTask = async () => {
    const tasks = await getData();
    return (
        <div>
            {tasks.map((task) => (
                <div key={task._id}>
                    <h1>{task.title}</h1>
                    <p>{note.content}</p>
                    <div>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ShowTask