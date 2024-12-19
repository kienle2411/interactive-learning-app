"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import {
  useDeleteSession,
  useGetSessionDetails,
  useUpdateSession,
} from "@/hooks/useSessions";
import { UpdateSessionBody } from "@/types/sessions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format, startOfDay } from "date-fns";
import { DateTimePicker24hForm } from "@/components/ui/date-time-picker";
import ThreeDotsWave from "@/components/ui/three-dot-wave";
import { useRouter } from "next/navigation";

interface ISettingTabProps {
  id: string;
}

const formSchema = z.object({
  topic: z.string(),
  description: z.string(),
  sessionDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export default function SettingsTab({ id }: ISettingTabProps) {
  const router = useRouter();
  const { mutate: updateSession } = useUpdateSession(id);
  const { mutate: deleteSession } = useDeleteSession(id, router);
  const { data: sessionData, isLoading, isError } = useGetSessionDetails(id);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: sessionData?.data
      ? {
          topic: sessionData.data.topic,
          description: sessionData.data.description,
          sessionDate: sessionData.data.sessionDate,
          startTime: sessionData.data.startTime,
          endTime: sessionData.data.endTime,
        }
      : {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedSession: Partial<UpdateSessionBody> = {};
    if (sessionData?.data?.topic !== values.topic) {
      updatedSession.topic = values.topic;
    }
    if (sessionData?.data?.description !== values.description) {
      updatedSession.description = values.description;
    }
    if (sessionData?.data?.sessionDate !== values.sessionDate) {
      updatedSession.sessionDate = values.sessionDate;
    }
    if (sessionData?.data?.startTime !== values.startTime) {
      updatedSession.startTime = values.startTime;
    }
    if (sessionData?.data?.endTime !== values.endTime) {
      updatedSession.endTime = values.endTime;
    }
    updateSession(updatedSession);
  }

  function handleDelete() {
    deleteSession();
  }

  if (!sessionData) {
    return <div>Test</div>;
  }

  if (sessionData?.data?.deletedAt !== null) {
    router.back();
  }

  if (isLoading) {
    return <ThreeDotsWave />;
  }

  if (isError) {
    return <div>Loi</div>;
  }

  return (
    <div className="px-[20px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                  <Input
                    id="topic"
                    type="text"
                    placeholder="Enter session's topic"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                  <Input
                    id="description"
                    type="text"
                    placeholder="Enter session's description"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sessionDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Session Date</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger>
                      {format(field.value || new Date(), "PPP")}
                    </SelectTrigger>
                    <SelectContent>
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={(date) => {
                          field.onChange(date);
                          form.setValue(
                            "sessionDate",
                            startOfDay(date || "").toISOString()
                          );
                        }}
                      />
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <DateTimePicker24hForm
                    value={new Date(field.value)}
                    onChange={(date: Date) => {
                      form.setValue("startTime", date.toISOString());
                      console.log(form.getValues("startTime"));
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <DateTimePicker24hForm
                    value={new Date(field.value)}
                    onChange={(date: Date) =>
                      form.setValue("endTime", date.toISOString())
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <Button type="submit">Update</Button>
        </form>
      </Form>
      <div className="pt-10">
        <h2 className="font-bold text-lg">Delete Class</h2>
        <p className="pt-2 pb-2">Permanently delete this Class</p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-[#DC2828]">Delete Class</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
