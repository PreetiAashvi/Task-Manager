import React, { useContext, useState, useEffect } from "react";
import { TaskListContext } from "../context/TaskListContext";

const TaskForm = () => {
  const { addTask, clearList, editItem, editTask } = useContext(
    TaskListContext
  );

  const [message, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editItem) {
      const addData = async () => {
        try {
          const url = "https://devza.com/tests/tasks/create";

          var formdata = new FormData();
          formdata.append("message", message);
///todo hide api key
          const response = await fetch(url, {
            method: "POST",
            headers: { AuthToken: "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a" },
            body: formdata,
          });


        } catch (error) {
          console.log("error", error);
        }
      };
      addData();

      setTitle("");
    } else {
        const editData = async () => {
            try {
              const url = "https://devza.com/tests/tasks/update";
              
              var formdata = new FormData();
              formdata.append("message", message);
              formdata.append("taskid",editItem.id);
 ///todo hide api key   
              const response = await fetch(url, {
                method: "POST",
                headers: { AuthToken: "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a" },
                body: formdata,
              });
    
                console.log(response)
            } catch (error) {
              console.log("error", error);
            }
        }
        editData();
        
      editTask(message, editItem.id);
    }
  };

  useEffect(() => {
    if (editItem) {
        
      setTitle(editItem.message);
    } else {
      setTitle("");
    }
  }, [editItem]);

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        onChange={handleChange}
        value={message}
        type="text"
        className="task-input"
        placeholder="Add Task..."
        required
      />
      <div className="buttons">
        <button type="submit" className="btn add-task-btn clear-btn">
          {editItem ? "Edit Task" : "Add Task"}
        </button>
        {/* <button onClick={clearList} className="btn clear-btn">
          Clear
        </button> */}
      </div>
    </form>
  );
};

export default TaskForm;
