import { Helmet } from "react-helmet-async";
import { TotalDriversAmount } from "./total-drivers-amount";
import { TotalTicketsAmount } from "./total-tickets-amount";
import { TotalSpentAmount } from "./total-spent-amount";
import { RevenueChart } from "./revenue-chart";
import { CategoryByTickets } from "./category-tickets";
import { TotalVehiclesActives } from "./total-vehicles-active";

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <TotalDriversAmount />
          <TotalTicketsAmount />
          <TotalSpentAmount />
          <TotalVehiclesActives />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <CategoryByTickets />
        </div>
      </div>
    </>
  );
}
