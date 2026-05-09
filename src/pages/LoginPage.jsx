import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h1>Stock Tracker Login</h1>

      <button onClick={() => navigate("/owner")}>
        Owner
      </button>

      <button onClick={() => navigate("/agent")}>
        Agent
      </button>
    </div>
  );
}