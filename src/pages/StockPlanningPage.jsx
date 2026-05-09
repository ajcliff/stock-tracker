import StockPlanningTable from "../components/StockPlanningTable";
import AppFooter from "../components/AppFooter";

export default function StockPlanningPage() {
return (
<div
  style={{
    padding: 15,
    paddingBottom: 100
  }}
>
     

      <h1>Stock Needed Tomorrow</h1>

      <StockPlanningTable />
      <AppFooter />
    </div>
  );
}
