import { SessionData } from "@/types/sessions";
import { Card, CardContent, CardTitle } from "./card";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";

interface ISessionCard {
  session: SessionData;
}

export default function SessionCardMedium({ session }: ISessionCard) {
  const router = useRouter();
  return (
    <Card className="w-full p-5">
      <CardTitle>
        <div>{session.topic}</div>
      </CardTitle>
      <CardContent>
        <div>{session.description}</div>
        <Play
          onClick={() => router.push(`classSessions/${session.id}/play`)}
          color="green"
          size={28}
          fill="green"
        />
      </CardContent>
    </Card>
  );
}
