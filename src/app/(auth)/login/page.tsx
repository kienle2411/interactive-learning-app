"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //do something here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col overflow-hidden md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-md">
        {/* Phần hình ảnh */}
        <div className="hidden md:block md:w-1/2 bg-green-600">
          <img
            src="/elearning_pic.jpg"
            alt="Sign Up Illustration"
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>
        {/* Phần form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-2xl font-bold text-green-600">LOG IN</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-600"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-gray-600"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full mt-6 bg-green-600 text-white hover:bg-green-700"
            >
              Log In
            </Button>
            <div className="text-center mt-4">
              <a href="#" className="text-green-600 text-sm hover:underline">
                Forgot password?
              </a>
            </div>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-green-600 font-semibold hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
