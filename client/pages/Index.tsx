import FootballScene from "@/components/three/FootballScene";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-[radial-gradient(70%_50%_at_80%_10%,rgba(30,240,122,0.18),transparent_55%),radial-gradient(50%_40%_at_10%_85%,rgba(0,140,80,0.25),transparent_60%)]">
      {/* Hero */}
      <section className="container max-w-6xl mx-auto pt-10 md:pt-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold ring-1 ring-primary/20">Live football • 3D experience</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Live Football. In 3D.
            </h1>
            <p className="text-lg text-muted-foreground max-w-prose">
              Follow matches in real time with a stadium-grade 3D experience. Stunning visuals, instant scores, and a modern football hub.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/matches">
                <Button size="lg" className="px-6">View Matches</Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline" className="px-6 border-white/20">Explore Features</Button>
              </a>
            </div>
          </div>
          <div className="">
            <FootballScene />
          </div>
        </div>
      </section>

      {/* Featured matches */}
      <section id="features" className="container max-w-6xl mx-auto py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Featured Matches</h2>
        <p className="text-muted-foreground mt-2">Hand-picked clashes you can’t miss.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[{h:"Lions FC", a:"City United", k:"A"}, {h:"Rovers", a:"Northern Stars", k:"B"}, {h:"Coastal FC", a:"Highland", k:"C"}].map(m => (
            <Card key={m.k} className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-xl flex items-center justify-between">
                  <span>{m.h}</span>
                  <span className="text-primary">vs</span>
                  <span>{m.a}</span>
                </CardTitle>
                <CardDescription>Today • 19:30 • Arena Verde</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="text-sm px-2 py-1 rounded bg-primary/10 text-primary">Live soon</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
