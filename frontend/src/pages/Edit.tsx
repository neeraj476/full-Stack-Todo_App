import { useParams, useNavigate } from "react-router-dom";
import { updateTask, getById } from "@/Store/Tasks";
import { useEffect, useState } from "react";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    const fetchTask = async (id: string) => {
      try {
        const data = await getById(id);
        const oldTask = data.task;
        
        if (oldTask) {
          setTitle(oldTask.title);
          setDescription(oldTask.description);
          setTask(oldTask);
        }
      } catch (error) {
        console.error("Error in fetching task:", error);
      }
    };

    if (id) {
      fetchTask(id);
    }
  }, [id]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task) {
      try {
        const updatedTask = { title, description, isCompleted: false }; // Updated fields only
        await updateTask(task._id, updatedTask);
        console.log("Task updated:", updatedTask);
        navigate("/"); // Navigate back to the home page after updating
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      {task ? (
        <form onSubmit={handleUpdate} className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-center mb-6 text-white">Edit Task</h2>
  
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-medium mb-2 text-white">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              required
            />
          </div>
  
          <div className="mb-6">
            <label htmlFor="description" className="block text-lg font-medium mb-2 text-white">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              required
            />
          </div>
  
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Task
          </button>
        </form>
      ) : (
        <p className="text-center text-lg text-white">Loading task...</p>
      )}
    </div>
  );
};

export default Edit;
