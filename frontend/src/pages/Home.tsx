import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";


import { HomeIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createTask, getTasks, deleteAll, deleteTask } from '../Store/Tasks';
interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}



const Home = () => {

    // States for title, description, and the form (tasks list)
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [form, setForm] = useState<Task[]>([]);
    const [latestTask, setLatestTask] = useState<Task | null>(null);
    const [finish, setFinish] = useState(false);


    // Handle adding new tasks
    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            const tasks = response.task || [];
            setForm(tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [])



    useEffect(() => {
        const addTaskAndFetch = async () => {
            if (latestTask) {
                try {
                    await createTask(latestTask);
                    fetchTasks();
                } catch (error) {
                    console.error("Error creating or fetching tasks:", error);
                }
            }
        };

        addTaskAndFetch();
    }, [latestTask]);

    useEffect(() => {
        console.log("Updated form state:", form);
    }, [form]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title.trim() === "" || description.trim() === "") {
            alert("Both title and description are required!");
            return;
        }
        const _id = "";
        const newTask = { _id, title, description, completed: false, createdAt: new Date(), updatedAt: new Date() };

        setLatestTask(newTask); // Update the latest task
        setTitle("");
        setDescription("");
    };




    const handleDelete = async (index: number, id: string) => {
        await deleteTask(id);
        await getTasks();
        const updatedForm = form.filter((_, i) => i !== index);
        setForm(updatedForm);
    };

    const toggleComplete = async (index: number, id: string) => {
        setFinish(true)
        const updatedForm = form.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setForm(updatedForm);
    };


    return (
        <div className="w-screen h-screen ">
            {/* Header Section */}
            <div className="h-20 w-screen px-5">
                <div className="h-full w-full bg-gray-500/60 rounded-md flex items-center justify-between px-4">
                    <h1 className="text-2xl md:text-4xl text-white text-left font-semibold">TODO</h1>
                    <Link to={"/"}>
                        <HomeIcon className="size-7 text-white hover:text-white/50 cursor-pointer" />
                    </Link>
                </div>
            </div>

            {/* Scrollable Area */}
            <ScrollArea className="h-[calc(100vh-80px)] p-10 w-screen">
                {/* Task Input Form */}
                <form className="flex flex-col gap-3 mb-6" onSubmit={handleSubmit}>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        onChange={(e) => setTitle(e.target.value)}
                        id="title"
                        value={title}
                        type="text"
                        placeholder="Add a task title"
                    />
                    <Label htmlFor="description">Description</Label>
                    <Input
                        onChange={(e) => setDescription(e.target.value)}
                        id="description"
                        value={description}
                        type="text"
                        placeholder="Add a task description"
                    />
                    <div className="flex justify-center gap-5">
                        <Button type="submit" className="w-20">Add Task</Button>
                        <Button onClick={async () => {
                            await deleteAll();
                            fetchTasks();
                        }}
                            type="button" className="w-30 bg-red-600 hover:bg-red-400 text-white">Delete All Task</Button>
                    </div>
                </form>


                {/* Task List */}
                <div className="mt-4">
                    {form.length > 0 ? (
                        <ul className="list-none space-y-4">
                            {form.map((task, index) => (
                                <div key={task._id} className="w-full flex items-start gap-4 border-2 border-gray-200/40 rounded-md p-2">

                                    <div className="w-[85%] flex flex-col gap-2 ">
                                        <h2 className="font-bold text-lg">

                                            {task.completed ? <s>Title: {task.title}</s> : `Title: ${task.title}`}
                                        </h2>

                                        <p className="text-white">
                                            {task.completed ? <s>Description: {task.description}</s> : `Description: ${task.description}`}
                                        </p>
                                        <div className="flex flex-col gap-1 mt-1">
                                            <p className="text-[12px] text-gray-500/80 font-semibold"> createdAt : {(task.createdAt).toString().split("T")[0]}</p>
                                            <p className="text-[12px] text-gray-500/80 font-semibold">{finish && `finishAt :${(task.createdAt).toString().split("T")[0]}`} </p>
                                        </div>
                                    </div>
                                    <div className="w-[20%] h-20  flex flex-col justify-between  ">
                                        <div className="flex w-full h-5  justify-start">
                                            <p className="font-semibold pt-2 pl-3"> Complete</p>
                                            <Input className="w-[50%]"
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={() => toggleComplete(index, task._id)}
                                            />
                                        </div>
                                        <div className="w-full h-5 flex justify-around">
                                           <Link to={`/edit/${task._id}`}>
                                           <Button
                                                className="w-16 bg-yellow-500 text-white font-medium hover:bg-yellow-600"
                                                
                                            >
                                                Edit
                                            </Button></Link>
                                            <Button
                                                className="w-16 bg-red-500 text-white font-medium hover:bg-red-600"
                                                onClick={() => handleDelete(index, task._id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No tasks added yet. Start by adding one above!</p>
                    )}
                </div>

            </ScrollArea>
        </div>
    );
};

export default Home;