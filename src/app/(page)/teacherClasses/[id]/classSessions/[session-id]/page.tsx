"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InformationTab, QuestionsTab, SettingsTab } from "./components";
import { usePathname } from "next/navigation";

export default function SessionPage() {
  const pathName = usePathname();
  const sessionId = pathName.split("/").pop();
  return (
    <div className="w-full">
      <Tabs defaultValue="information" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="information">Information</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="information">
          {sessionId && <InformationTab id={sessionId} />}
        </TabsContent>
        <TabsContent value="questions">
          {sessionId && <QuestionsTab id={sessionId} />}
        </TabsContent>
        <TabsContent value="settings">
          {sessionId && <SettingsTab id={sessionId} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}
