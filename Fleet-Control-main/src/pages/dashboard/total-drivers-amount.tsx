import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonStanding } from "lucide-react";

export function TotalDriversAmount() {
  return (
    <Card>
      <CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Motoristas</CardTitle>
        <PersonStanding className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">6</span>
      </CardContent>
    </Card>
  );
}
