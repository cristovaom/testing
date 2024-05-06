import { fetchDriversAPI } from "@/api/fetch-drivers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { PersonStanding } from "lucide-react";

export function TotalDriversAmount() {
  const { status, data } = useQuery({
    queryKey: ["drivers-number"],
    queryFn: async () => await fetchDriversAPI(),
  });

  return (
    <Card>
      <CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
        {status === "pending" || status === "error" ? (
          <div>
            <Skeleton className="h-16 w-80 flex items-center justify-center">
              {" "}
            </Skeleton>
          </div>
        ) : (
          <>
            <CardTitle className="text-base font-semibold">
              Motoristas
            </CardTitle>
            <PersonStanding className="h-4 w-4 text-muted-foreground" />
          </>
        )}
      </CardHeader>

      <CardContent className="space-y-1">
        {status === "success" && <p className="text-bold">{data.length}</p>}
      </CardContent>
    </Card>
  );
}
