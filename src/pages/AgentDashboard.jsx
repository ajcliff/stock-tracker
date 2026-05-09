import { Link } from "react-router-dom";

export default function AgentDashboard() {
  return (
    <div>
      <h1>Agent Dashboard</h1>

      <ul>
        <li>
          <Link to="/agent/allocations">Allocations</Link>
        </li>

        <li>
          <Link to="/agent/returns">Returns</Link>
        </li>

        <li>
          <Link to="/agent/payments">Payments</Link>
        </li>

        <li>
          <Link to="/agent/debt">Debt</Link>
        </li>
      </ul>
    </div>
  );
}