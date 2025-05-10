import React, { useState } from "react";

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            const task = { text: newTask, completed: false };
            setTasks(t => [...t, task]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            const temp = updatedTasks[index];
            updatedTasks[index] = updatedTasks[index - 1];
            updatedTasks[index - 1] = temp;
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            const temp = updatedTasks[index];
            updatedTasks[index] = updatedTasks[index + 1];
            updatedTasks[index + 1] = temp;
            setTasks(updatedTasks);
        }
    }

    function toggleComplete(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    }

    const activeTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    return (
        <div className="todoList">
            <h1>Taskify</h1>
            <div>
                <input
                    type="text"
                    placeholder="Add a task"
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="btnAdd" onClick={addTask}>
                    +
                </button>
            </div>
            <ol>
                {activeTasks.map((task, index) => {
                    const actualIndex = tasks.findIndex(t => t === task);
                    return (
                        <li key={actualIndex}>
                            <input
                                type="checkbox"
                                checked={false}
                                onChange={() => toggleComplete(actualIndex)}
                            />
                            <span className="text">{task.text}</span>
                            <button className="btnDelete" onClick={() => deleteTask(actualIndex)}>×</button>
                            <button className="btnMove" onClick={() => moveTaskUp(actualIndex)}>˄</button>
                            <button className="btnMove" onClick={() => moveTaskDown(actualIndex)}>˅</button>
                        </li>
                    );
                })}
            </ol>
            <ol>
                {completedTasks.map((task, index) => {
                    const actualIndex = tasks.findIndex(t => t === task);
                    return (
                        <li key={actualIndex}>
                            <input
                                type="checkbox"
                                checked={true}
                                onChange={() => toggleComplete(actualIndex)}
                            />
                            <span className="text finishedTask">{task.text}</span>
                            <button className="btnDelete" onClick={() => deleteTask(actualIndex)}>×</button>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}

export default TodoList;
