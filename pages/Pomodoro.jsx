import { useState, useEffect } from 'react';

export default function Timer() {
  const MODES = { Focus: 1500, Break: 300, LongBreak: 900 };

  const [seconds, setSeconds] = useState(MODES.Focus);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("Focus");

  const [sessionHistory, setSessionHistory] = useState([]);
  const [streak, setStreak] = useState(0);
  const [lastResetDate, setLastResetDate] = useState(new Date().toDateString());

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(sec => sec > 0 ? sec - 1 : 0);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (seconds === 0 && isActive) {
      setIsActive(false);
      const now = new Date();
      const today = now.toDateString();

      if (today !== lastResetDate) {
        setStreak(1);
        setLastResetDate(today);
      } else {
        setStreak(prev => prev + 1);
      }

      setSessionHistory(prev => [
        ...prev,
        { time: now.toLocaleTimeString(), mode }
      ]);
    }
  }, [seconds]);

  const formatTime = () => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setSeconds(MODES[newMode]);
    setIsActive(false);
  };

  return (
    <div className="text-center mt-10 max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-4xl font-extrabold text-indigo-700 mb-4">⏳ Pomodoro Timer</h2>
      <p className="text-sm text-gray-500 mb-2">Current Mode: <span className="font-semibold text-indigo-600">{mode}</span></p>
      <div className="text-5xl mb-6 font-mono tracking-widest text-gray-900">{formatTime()}</div>

      <div className="flex justify-center gap-3 mb-6">
        {Object.keys(MODES).map(m => (
          <button key={m} onClick={() => switchMode(m)} className={`px-4 py-2 rounded-lg font-semibold ${mode === m ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>{m}</button>
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button onClick={() => setIsActive(true)} className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">Start</button>
        <button onClick={() => setIsActive(false)} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">Pause</button>
      </div>

      <div className="text-left mt-8">
        <h3 className="text-lg font-semibold text-gray-700">🔥 Today's Streak: {streak} session{streak !== 1 ? "s" : ""}</h3>

        <h3 className="mt-4 text-lg font-semibold text-gray-700">🕒 Session History:</h3>
        <ul className="mt-2 space-y-1 text-sm text-gray-600 max-h-40 overflow-y-auto">
          {sessionHistory.length === 0 && <li>No sessions logged yet.</li>}
          {sessionHistory.map((session, i) => (
            <li key={i}>✅ {session.mode} at {session.time}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}