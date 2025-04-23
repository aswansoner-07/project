import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8001/forgot-password", { email });
    setMessage(res.data.message); // token will be shown in dev/test mode
  };

  return (
    <div className="max-w-md min-h-screen mx-auto mt-10 p-4  rounded">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded">Send Reset Link</button>
        <button
         onClick={() => navigate("/reset-password")}
         className="w-full bg-red-500 text-white p-2 rounded">Reset Password</button>
        {message && <p className="text-green-600">{message}</p>}
      </form>
    </div>
  );
}
