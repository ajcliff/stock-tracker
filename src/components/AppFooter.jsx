import { useNavigate } from "react-router-dom";

export default function AppFooter() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        padding: 10,
        background: "white",
        borderTop: "1px solid #ddd",
        zIndex: 1000
      }}
    >
      <button onClick={() => navigate("/daily-operations")}>
        Daily operations
      </button>

      <button onClick={() => navigate("/stock-planning")}>
        Stock Planner
      </button>

      <button onClick={() => navigate("/transaction-logs")}>
         Transaction Logs
      </button>

      <button onClick={() => navigate("/monthly-summary")}>
        Monthly Summary
      </button>
    </div>
  );
}
