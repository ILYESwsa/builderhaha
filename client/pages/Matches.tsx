import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const sample = [
  {
    id: 1,
    home: "Lions FC",
    away: "City United",
    time: "Today, 19:30",
    venue: "Arena Verde",
  },
  {
    id: 2,
    home: "Rovers",
    away: "Northern Stars",
    time: "Tomorrow, 18:00",
    venue: "Stadium North",
  },
  {
    id: 3,
    home: "Coastal FC",
    away: "Highland",
    time: "Sat, 16:45",
    venue: "Coastal Dome",
  },
];

export default function Matches() {
  return (
    <div className="container max-w-6xl mx-auto py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        Matches
      </h1>
      <p className="text-muted-foreground mt-2">
        Upcoming fixtures and live scores.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {sample.map((m) => (
          <Card key={m.id} className="bg-white/5 border-white/10 glow-surface">
            <CardHeader>
              <CardTitle className="text-xl flex items-center justify-between">
                <span>{m.home}</span>
                <span className="text-primary">vs</span>
                <span>{m.away}</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {m.time} • {m.venue}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Odds</span>
                <div className="flex gap-2">
                  <span className="px-2 py-1 rounded bg-primary/10 text-primary">
                    Home 1.8
                  </span>
                  <span className="px-2 py-1 rounded bg-primary/10 text-primary">
                    Draw 3.2
                  </span>
                  <span className="px-2 py-1 rounded bg-primary/10 text-primary">
                    Away 2.4
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
