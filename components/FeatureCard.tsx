import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient = "from-primary/20 to-accent/20",
}: FeatureCardProps) {
  return (
    <Card className="glass border-primary/30 hover:border-primary/50 transition-spring hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 group premium-card">
      <CardHeader className="pb-4">
        <div className={`relative w-16 h-16 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-spring shadow-lg`}>
          <Icon className="h-8 w-8 text-primary" />
          <div className="absolute inset-0 bg-primary/10 blur-xl rounded-2xl group-hover:bg-primary/20 transition-smooth" />
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
