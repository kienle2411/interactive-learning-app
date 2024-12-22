"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import StudentClassCard from "./components/stdClassCard";

export default function ClassesManagement() {
  const [classCode, setClassCode] = useState("");
  const [classes] = useState<
    { id: string; className: string; description: string }[]
  >([
    {
      id: "1",
      className: "Math Class",
      description: "30",
    },
    {
      id: "2",
      className: "English Class",
      description: "30",
    },

    {
      id: "3",
      className: "Math Class",
      description: "30",
    },
    {
      id: "4",
      className: "English Class",
      description: "30",
    },
    {
      id: "5",
      className: "Math Class",
      description: "30",
    },
    {
      id: "6",
      className: "English Class",
      description: "30",
    },
  ]);

  return (
    <div className="flex flex-col p-[24px] w-full">
      <div className="flex flex-col w-full gap-[20px]">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">Classes</span>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Join class</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Join a class</DialogTitle>
                <DialogDescription>
                  Enter your Class Code to join{" "}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Class Code
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    value={classCode}
                    onChange={(e) => setClassCode(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Enter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-4">
          {classes.map((cls) => (
            <StudentClassCard
              key={cls.id}
              id={cls.id}
              className={cls.className}
              description={cls.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
