"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@/hooks/useAuth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error] = useState<string | null>(null);
  const { mutate: signIn } = useSignIn(router);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signIn({ username, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col overflow-hidden md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-md">
        {/* Image Section */}

        <div className="hidden md:block md:w-1/2 bg-green-600">
          <img
            src="/elearning_pic.jpg"
            alt="Sign Up Illustration"
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-2xl font-bold text-green-600">LOG IN</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="username"
                  className="mb-1 block text-sm font-medium text-gray-600"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  className="w-full"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
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
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
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
            Don't have an account?{" "}
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
