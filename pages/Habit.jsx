import { useState } from 'react';

export default function Habit() {
  const [habits, setHabits] = useState(["Read", "Exercise"]);
  const [tracked, setTracked] = useState({});
  const [newHabit, setNewHabit] = useState("");
  const [weekStart, setWeekStart] = useState(getCurrentMonday());
  const [weekHistory, setWeekHistory] = useState([]);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  function getCurrentMonday() {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    return monday.toISOString().split("T")[0];
  }

  const toggleDay = (habit, day) => {
    setTracked(prev => ({
      ...prev,
      [habit]: {
        ...prev[habit],
        [day]: !prev[habit]?.[day]
      }
    }));
  };

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, newHabit.trim()]);
      setNewHabit("");
    }
  };

  const calculateStreak = (habit) => {
    return days.reduce((count, day) => tracked[habit]?.[day] ? count + 1 : count, 0);
  };

  const startNewWeek = () => {
    const snapshot = { weekStart, habits: tracked };
    setWeekHistory([...weekHistory, snapshot]);
    setTracked({});
    setWeekStart(getCurrentMonday());
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-extrabold text-indigo-700 mb-6">📈 Habit Tracker</h2>

      <div className="flex gap-4 mb-6">
        <input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Add a new habit..."
          className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={addHabit}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Add Habit
        </button>
      </div>

      <div className="mb-4 text-sm text-gray-600">
        Current Week Starting: <span className="font-semibold text-indigo-500">{weekStart}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border text-center rounded-lg overflow-hidden mb-4">
          <thead className="bg-indigo-100 text-indigo-800 font-semibold">
            <tr>
              <th className="px-4 py-2 border">Habit</th>
              {days.map((day) => (
                <th key={day} className="px-4 py-2 border">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit} className="border-t">
                <td className="px-4 py-2 font-semibold text-left text-gray-700">
                  {habit} <span className="text-sm text-gray-500">({calculateStreak(habit)}🔥)</span>
                </td>
                {days.map((day) => (
                  <td key={day} className="px-4 py-2 border">
                    <input
                      type="checkbox"
                      checked={tracked[habit]?.[day] || false}
                      onChange={() => toggleDay(habit, day)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={startNewWeek}
        className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      >
        Save & Start New Week
      </button>

      <h3 className="mt-10 text-2xl font-bold text-gray-700">📜 Past Weeks</h3>
      <ul className="mt-4 space-y-3">
        {weekHistory.map((week, i) => (
          <li key={i} className="border p-4 rounded-lg bg-gray-50 shadow-sm">
            <p className="font-semibold mb-2">Week Starting: {week.weekStart}</p>
            {Object.keys(week.habits).map((habit) => (
              <div key={habit}>
                <p className="text-sm text-indigo-600">
                  {habit} → {days.filter((day) => week.habits[habit][day]).join(", ") || "No entries"}
                </p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}