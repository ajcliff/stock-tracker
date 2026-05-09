import { Link } from "react-router-dom";

export default function OwnerNav() {
  return (
    <div style={{ marginBottom: 20 }}>
      <Link to="/owner">Dashboard</Link>
      {" | "}

      <Link to="/owner/stock-planning">
        Stock Needed
      </Link>
      {" | "}

      <Link to="/owner/daily-operations">
        Daily Operations
      </Link>
      {" | "}

      <Link to="/owner/monthly-summary">
        Monthly Summary
      </Link>
{" | "}
<Link to="/owner/logs">
  Transaction Logs
</Link>
      <hr />
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
