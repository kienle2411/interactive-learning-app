"use client";
import { useGetSessionClassrooms } from "@/hooks/useSessions";
import { useParams, usePathname } from "next/navigation";
import SessionCard from "../../components/sessionCard";
import SessionCardMedium from "@/components/ui/session-card";

export default function SessionTab() {
  const { id } = useParams();
  const classroomId = Array.isArray(id) ? id[0] : id;
  const { data: sessions } = useGetSessionClassrooms(classroomId || "");
  console.log(sessions);
  return (
    <div className="w-full">
      {Array.isArray(sessions?.data?.data) ? (
        sessions.data.data.map((session) => (
          <SessionCardMedium session={session} />
        ))
      ) : (
        <div>No sessions available</div>
      )}
    </div>
  );
}
