import { axiosInstance } from "../lib/axios";

export const createTask = async (data: any) => {
    try {
        const response = await axiosInstance.post("/create", {
            title: data.title,
            description: data.description
        });
        return response.data;
    } catch (error) {
        console.log("error in create task", error);
        throw error;
    }
};

export const getTasks = async () => {
    try {
        const response = await axiosInstance.get("/get");
        return response.data;
    } catch (error) {
        console.log("error in get task", error);
        throw error;
    }
};

export const deleteTask = async (id: any) => {
    try {
        const response = await axiosInstance.delete(`/delete/${id}`);
        return response.data;
    } catch (error) {
        console.log("error in delete task", error);
        throw error;
    }
}
export const deleteAll = async () => {
    try {
        const response = await axiosInstance.delete("/delete-all");
        return response.data;
    } catch (error) {
        console.log("error in delete all task", error);
        throw error;
    }
};
export const updateTask = async (id: string, updatedTask: { title: string; description: string; isCompleted: boolean }) => {
    try {
        const response = await axiosInstance.patch(`/update/${id}`, updatedTask);  
        return response.data;
    } catch (error) {
        console.log("error in updateTask", error);
        throw error;
    }
}

export const getById = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/get/${id}`);
        return response.data;
    } catch (error:any) {
        console.log("error in getById in frontend", error);
        // Log the full error to see the response
        console.log("Error details: ", error.response ? error.response.data : error.message);
        throw error;
    }
}
