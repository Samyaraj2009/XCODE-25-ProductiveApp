import { useState, useEffect } from 'react';

export default function Settings() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) setTheme(storedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";
  }, [theme]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Settings</h2>
      <div className="flex items-center gap-4">
        <span>Theme:</span>
        <select className="border px-2 py-1 rounded" value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <p className="mt-4 text-sm text-gray-500">Your theme preference is stored locally for now.</p>
    </div>
  );
}
