import { Link } from "react-router-dom";

export default function OwnerDashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Owner Dashboard</h1>

      <ul>
        <li>
          <Link to="/owner/stock-planning">
            Stock Needed Tomorrow
          </Link>
        </li>

        <li>
          <Link to="/owner/daily-operations">
            Daily Operations
          </Link>
        </li>

        <li>
          <Link to="/owner/monthly-summary">
            Monthly Summary
          </Link>
        </li>
      </ul>
      <div
  style={{
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    padding: 15,
    background: "white",
    borderTop: "1px solid #ddd"
  }}
>
  <button>Daily Ops</button>
  <button>Stock Plan</button>
  <button>Logs</button>
  <button>Monthly</button>
</div>
    </div>
  );
}
