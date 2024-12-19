import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SessionCardProps {
  id: string;
  topic: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  description: string;
  status: string;
}

export default function SessionCard({
  topic,
  description,
  status,
}: SessionCardProps) {
  <Card>
    <CardHeader>
      <CardTitle>
        <div className="flex">
          <p>{topic}</p>
          <Badge>{status}</Badge>
        </div>
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent></CardContent>
  </Card>;
}
