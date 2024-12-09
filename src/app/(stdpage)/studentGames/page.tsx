"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";

export default function Page() {
  const [codeData, setCodeData] = useState("");
  return (
    <div
      className="w-full flex flex-col items-center justify-center overflow-x-hidden overflow-y-hidden"
      style={{ height: "calc(100vh - 10rem)" }}
    >
      <div className="w-full flex flex-col items-center justify-center gap-4 overflow-x-hidden overflow-y-hidden">
        <span className="text-lg">Enter the Game Code to join</span>
        <Input
          className="w-80"
          placeholder="Enter Game Code"
          value={codeData}
          onChange={(e) => setCodeData(e.target.value)}
        />
        <Button
          className="font-semibold text-base"
          style={{ backgroundColor: "#5048E5", color: "white" }}
        >
          Enter
        </Button>
        <span>
          Or{" "}
          <Link href={""} className="text-green-600 underline">
            Scan QR Code
          </Link>
        </span>
      </div>
    </div>
  );
}
