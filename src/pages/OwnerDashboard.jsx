import { Link } from "react-router-dom";
import AppFooter from "../components/AppFooter";
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
<AppFooter />
    </div>
  );
}
