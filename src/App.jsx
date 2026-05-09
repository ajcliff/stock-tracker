import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import { loginUser } from "./auth";

import StockPlanningTable from "./components/StockPlanningTable";
import AllocationForm from "./components/AllocationForm";

import AgentReturns from "./pages/agent/AgentReturns";
import AgentDashboard from "./pages/AgentDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import StockPlanningPage from "./pages/StockPlanningPage";
import DailyOperationsPage from "./pages/DailyOperationsPage";
import MonthlySummaryPage from "./pages/MonthlySummaryPage";
import TransactionLogsPage from "./pages/TransactionLogsPage";

/* ---------------- LOGIN ---------------- */
function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    const user = loginUser(username, password);

    if (!user) {
      alert("Invalid login");
      return;
    }

    if (user.role === "owner") {
      navigate("/owner");
    } else {
      navigate("/agent");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>

      <input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}



/* ---------------- ROUTES ---------------- */
function AppWrapper() {
  return (
<Routes>
  <Route path="/" element={<Login />} />

  <Route
    path="/owner"
    element={<OwnerDashboard />}
  />

  <Route
    path="/agent"
    element={<AgentDashboard />}
  />

  <Route
    path="/daily-operations"
    element={<DailyOperationsPage />}
  />

  <Route
    path="/stock-planning"
    element={<StockPlanningPage />}
  />

  <Route
    path="/transaction-logs"
    element={<TransactionLogsPage />}
  />

  <Route
    path="/monthly-summary"
    element={<MonthlySummaryPage />}
  />
</Routes>

    
  );

  
}


/* ---------------- APP ROOT ---------------- */
export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}