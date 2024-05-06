import { fetchVehiclesAPI } from "@/api/fetch-vechiles";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Car } from "lucide-react";

export function TotalVehiclesActives() {
  const { status, data } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => await fetchVehiclesAPI(),
  });

  return (
    <Card>
      {status === "pending" || status === "error" ? (
        <Skeleton className="h-16 w-80 flex items-center justify-center mt-6 ml-8">
          {" "}
        </Skeleton>
      ) : (
        <>
          <CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">
              Total de veículos ativos:
            </CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1">
            <span className="text-2xl font-bold tracking-tight">
              {data.length}
            </span>
          </CardContent>
        </>
      )}
    </Card>
  );
}
