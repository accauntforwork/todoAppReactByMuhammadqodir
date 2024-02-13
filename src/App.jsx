import React, { useState, useEffect } from "react";

function App() {
  const initialData = [
    { category: "Groceries", content: ["Purchase Milk & Corn Flakes"] },
    { category: "College", content: ["Complete Assignments"] },
    { category: "Payments", content: ["Pay mortgage"] },
  ];

  const [tasks, setTasks] = useState(initialData);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() === "") {
      return;
    }

    const newTaskObj = {
      content: newTask,
      category: currentCategory === "All" ? "Uncategorized" : currentCategory,
    };

    setTasks((prevTasks) => [...prevTasks, newTaskObj]);
    setNewTask("");
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleMarkAsDone = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
  };

  return (
    <div className="h-full flex items-center justify-center text-2xl text-[#525252]">
      <div className="box bg-[#EA5959] px-32 py-28">
        <div className="rounded-lg flex bg-white">
          <ul id="catigories" className="flex gap-2 flex-col mt-40 px-12 mb-96">
            {["All", "Groceries", "College", "Payments"].map((category) => (
              <li
                key={category}
                className={`cursor-pointer ${
                  currentCategory === category ? "text-[#EA5959]" : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </li>
            ))}
          </ul>
          <div className="border-l-2 p-8">
            <div className="relative ">
              <h1 className="text-3xl font-bold mt-2 mb-6 text-black">
                {currentCategory} Tasks
              </h1>
              <input
                className="w-[678px] placeholder-slate-400 bg-slate-200 px-4 py-2 text-xl rounded-lg"
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder={`Add a new task inside '${currentCategory}' category`}
              />
              <button
                className="flex items-start pt-1 w-16 justify-center h-[44px] absolute bg-[#EA5959] right-0 bottom-0 rounded-lg"
                onClick={handleAddTask}
              >
                +
              </button>
            </div>
            <ul id="tasks" className="mt-8 flex flex-col gap-3">
              {tasks
                .filter((task) =>
                  currentCategory === "All"
                    ? true
                    : task.category === currentCategory
                )
                .map((task, index) => (
                  <li
                    key={index}
                    className={`flex justify-between ${
                      task.done ? "line-through" : ""
                    }`}
                  >
                    <div className="flex gap-4 items-center">
                      <span>
                        <svg
                          className="w-[28px] cursor-pointer"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="rgba(234,113,46,1)"
                          onClick={() => handleMarkAsDone(index)}
                        >
                          <path d="M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM5 5V19H19V5H5Z"></path>
                        </svg>
                      </span>
                      <span>{task.content}</span>
                      <span className="px-8 py-1 rounded-lg text-xl text-white bg-[#EA5959]">
                        {task.category}
                      </span>
                    </div>
                    <svg
                      className="w-[28px] cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="rgba(234,113,46,1)"
                      onClick={() => handleDeleteTask(index)}
                    >
                      <path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9ZM9 12V18H11V12H9ZM13 12V18H15V12H13Z"></path>
                    </svg>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
