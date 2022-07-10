import React, { createContext, useState, useEffect } from "react";
import uuid from "uuid/dist/v4";

export const TaskListContext = createContext();

const TaskListContextProvider = (props) => {
  const initialState = JSON.parse(localStorage.getItem("tasks")) || [];

  const [tasks, setTasks] = useState(initialState);

  useEffect(() => {
    
///todo hide api key 
    const url = "https://devza.com/tests/tasks/list";

        const fetchData = async () => {
            try {
                const response = await fetch(url,{
                    method:"GET",
                    headers:{'AuthToken':'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a'}
                });
                const json = await response.json();
                setTasks(json.tasks)
                
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
  
}, [tasks]);

  const [editItem, setEditItem] = useState(null);

  const addTask = (title) => {
    setTasks([...tasks, { title, id: uuid() }]);
  };

  const removeTask = (id) => {
    const deleteData = async () => {
        try {
          const url = "https://devza.com/tests/tasks/delete";
          
          var formdata = new FormData();
          formdata.append("taskid",id);
///todo hide api key
          const response = await fetch(url, {
            method: "POST",
            headers: { AuthToken: "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a" },
            body: formdata,
          });


        } catch (error) {
          console.log("error", error);
        }
    }
    deleteData();
    //setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearList = () => {
    setTasks([]);
  };

  const findItem = (id) => {
    const item = tasks.find((task) => task.id === id);
    setEditItem(item);
  };

  const editTask = (title, id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { title, id } : task
    );

    setTasks(newTasks);
    setEditItem(null);
  };

  return (
    <TaskListContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        clearList,
        findItem,
        editTask,
        editItem,
      }}
    >
      {props.children}
    </TaskListContext.Provider>
  );
};

export default TaskListContextProvider;
