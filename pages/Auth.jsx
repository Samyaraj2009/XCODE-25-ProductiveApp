import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.email || !form.password || (!isLogin && !form.username)) {
      alert("Please fill in all fields.");
      return;
    }

    
    localStorage.setItem("user", JSON.stringify(form));
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white max-w-md mx-auto shadow-lg rounded-lg mt-12">
      <h2 className="text-3xl font-bold mb-4 text-indigo-700">{isLogin ? "Login" : "Register"}</h2>

      {!isLogin && (
        <input
          className="mb-4 px-4 py-2 w-full border rounded"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
      )}
      <input
        className="mb-4 px-4 py-2 w-full border rounded"
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        className="mb-4 px-4 py-2 w-full border rounded"
        name="password"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />

      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      >
        {isLogin ? "Login" : "Register"}
      </button>

      <p className="mt-4 text-sm text-gray-500">
        {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-indigo-600 underline font-medium"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
}