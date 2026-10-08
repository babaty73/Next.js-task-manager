"use client"
import React, { use } from "react";

function Tasks(){
    const [tasks, setTasks] = React.useState([]);
    const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    async function getTasks() {
        try {
            const response = await fetch(`${API}/api/tasks`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get("title");
        fetch(`${API}/api/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                getTasks(); // Refresh the task list after adding a new task
            })
            .catch((error) => {
                console.error("Error adding task:", error);
            });
    }

    React.useEffect(() => {
        getTasks();
    }, []);

    return (
        <>
        <div className="text-2xl font-bold"> Tasks </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
            <input className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="title" placeholder="Task title" />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Add Task</button>
        </form>
        <div>
            {tasks.map((task) => (
                <div key={task.id} className="border border-gray-300 rounded py-2 px-4">
                    <h3 className="text-lg font-bold">{task.title}</h3>
                </div>
            ))}
        </div>
        </>
    )

}
export default Tasks