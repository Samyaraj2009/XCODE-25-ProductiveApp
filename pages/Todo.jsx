import { useState, useEffect } from 'react';

export default function Todo() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <div className="text-center mt-20 text-lg text-gray-600">🔒 Please log in to view your tasks.</div>;

  const [tasks, setTasks] = useState(() => {
    const all = JSON.parse(localStorage.getItem("taskMap")) || {};
    return all[user.email] || [];
  });

  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const updateTasks = (newTasks) => {
    const all = JSON.parse(localStorage.getItem("taskMap")) || {};
    all[user.email] = newTasks;
    localStorage.setItem("taskMap", JSON.stringify(all));
    setTasks(newTasks);
  };

  const addTask = () => {
    if (input.trim()) {
      const newTasks = [...tasks, {
        title: input,
        description,
        done: false,
        priority,
        dueDate
      }];
      updateTasks(newTasks);
      setInput(""); setDescription(""); setPriority("Medium"); setDueDate("");
    }
  };

  const toggleTask = (i) => {
    const updated = [...tasks];
    updated[i].done = !updated[i].done;
    updateTasks(updated);
  };

  const deleteTask = (i) => {
    const filtered = tasks.filter((_, idx) => idx !== i);
    updateTasks(filtered);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-extrabold mb-6 text-indigo-700">📝 To-Do List</h2>
      <p className="mb-2 text-sm text-gray-500">Welcome, <strong>{user.username}</strong>!</p>

      <div className="grid gap-4 mb-6 sm:grid-cols-2">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Task title..." className="border px-4 py-3 rounded-lg" />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description..." className="border px-4 py-3 rounded-lg" />
        <select value={priority} onChange={e => setPriority(e.target.value)} className="border px-4 py-3 rounded-lg">
          <option>High</option><option>Medium</option><option>Low</option>
        </select>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="border px-4 py-3 rounded-lg" />
        <button onClick={addTask} className="bg-indigo-600 text-white col-span-2 px-6 py-3 rounded-lg hover:bg-indigo-700">Add Task</button>
      </div>

      <div className="grid gap-6">
        {tasks.map((task, i) => (
          <div key={i} className={`p-5 rounded-lg shadow-md border-l-8 ${
            task.priority === "High" ? "border-red-500" :
            task.priority === "Medium" ? "border-yellow-500" :
            "border-green-500"
          } bg-gray-50`}>
            <div className="flex justify-between items-start">
              <div onClick={() => toggleTask(i)} className="cursor-pointer">
                <h3 className={`text-xl font-bold ${task.done ? "line-through text-green-600" : "text-gray-800"}`}>{task.title}</h3>
                {task.description && <p className="text-gray-600 mt-1">{task.description}</p>}
                <p className="text-sm mt-2 text-gray-500">Priority: {task.priority} | Due: {task.dueDate}</p>
              </div>
              <button onClick={() => deleteTask(i)} className="text-red-500 text-xl ml-4 hover:text-red-700">✖</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}