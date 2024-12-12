// "use client";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";


// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     //do something here

//     try {
//       const response = await axios.post("/api/auth/signin", { email, password });

//       if (response.data.status === "success") {
//         const { accessToken, refreshToken } = response.data.data;

//         // Lưu token vào localStorage
//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("refreshToken", refreshToken);

//         // Điều hướng tới trang chính
//         router.push("/dashboard");
//       } else {
//         alert("Login failed!");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Invalid credentials or server error.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="flex flex-col overflow-hidden md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-md">
//         {/* Phần hình ảnh */}
//         <div className="hidden md:block md:w-1/2 bg-green-600">
//           <img
//             src="/elearning_pic.jpg"
//             alt="Sign Up Illustration"
//             className="object-cover w-full h-full rounded-l-lg"
//           />
//         </div>
//         {/* Phần form */}
//         <div className="w-full md:w-1/2 p-8">
//           <div className="flex items-center justify-center mb-6">
//             <h1 className="text-2xl font-bold text-green-600">LOG IN</h1>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="space-y-4">
//               <div>
//                 <Label
//                   htmlFor="email"
//                   className="mb-1 block text-sm font-medium text-gray-600"
//                 >
//                   Email
//                 </Label>
//                 <Input
//                   id="email"
//                   // type="email"
//                   placeholder="Enter your email"
//                   className="w-full"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <Label
//                   htmlFor="password"
//                   className="mb-1 block text-sm font-medium text-gray-600"
//                 >
//                   Password
//                 </Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="Enter your password"
//                   className="w-full"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//             </div>
//             <Button
//               type="submit"
//               className="w-full mt-6 bg-green-600 text-white hover:bg-green-700"
//             >
//               Log In
//             </Button>
//             <div className="text-center mt-4">
//               <a href="#" className="text-green-600 text-sm hover:underline">
//                 Forgot password?
//               </a>
//             </div>
//           </form>
//           <p className="mt-4 text-sm text-center text-gray-600">
//             Don’t have an account?{" "}
//             <a
//               href="/signup"
//               className="text-green-600 font-semibold hover:underline"
//             >
//               Sign Up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    // Basic client-side validation
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    try {
      const response = await axios.post("https://learn.kienle2411.id.vn/api/auth/signin", {
        username,
        password
      }, {
        withCredentials: true // Sending cookie if neededs
      });

      if (response.data.status === "success") {
        const { accessToken, refreshToken } = response.data.data;

        //save tokens to cookies
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Redirect to dashboard
        router.push("/teacherClasses");

      } else {
        setError(response.data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid credentials or server error.");
    }

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
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
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