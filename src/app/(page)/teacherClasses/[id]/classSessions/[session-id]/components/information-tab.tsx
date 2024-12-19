import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ThreeDotsWave from "@/components/ui/three-dot-wave";
import { useGetSessionDetails } from "@/hooks/useSessions";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface InformationTabProps {
  id: string;
}

export default function InformationTab({ id }: InformationTabProps) {
  const router = useRouter();
  const { data: sessionData, isLoading } = useGetSessionDetails(id);
  if (isLoading) {
    return <ThreeDotsWave />;
  }
  if (!sessionData) {
    return <div>Test</div>;
  }
  if (sessionData?.data?.deletedAt) {
    router.back();
  }
  return (
    <Card>
      <CardHeader>
        <div className="text-lg font-bold">Information</div>
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-row space-x-5">
          <div className="w-1/3 space-y-2">
            <div className="flex justify-between">
              <div className="font-semibold">Topic</div>
              <div>{sessionData?.data?.topic}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-semibold">Description</div>
              <div>{sessionData?.data?.description}</div>
            </div>
          </div>
          <div className="w-1/3 space-y-2">
            <div className="flex justify-between">
              <div className="font-semibold">Status</div>
              <Badge>{sessionData?.data?.status}</Badge>
            </div>
            <div className="flex justify-between">
              <div className="font-semibold">Last Updated</div>
              <div>
                {format(sessionData?.data?.updatedAt || "", "dd/MM/yyyy HH:mm")}
              </div>
            </div>
          </div>
          <div className="w-1/3 space-y-2">
            <div className="flex justify-between">
              <div className="font-semibold">Start Time</div>
              <div>{format(sessionData?.data?.startTime || "", "HH:mm")}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-semibold">End Time</div>
              <div>{format(sessionData?.data?.endTime || "", "HH:mm")}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
