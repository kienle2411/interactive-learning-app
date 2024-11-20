import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function SignUpPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-md">
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
                        <h1 className="text-2xl font-bold text-green-600">SIGN UP</h1>
                    </div>

                    <form>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-600">
                                    Email
                                </Label>
                                <Input id="email" type="email" placeholder="Enter your email" className="w-full" />
                            </div>
                            <div>
                                <Label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-600">
                                    Password
                                </Label>
                                <Input id="password" type="password" placeholder="Enter your password" className="w-full" />
                            </div>
                            <div>
                                <Label htmlFor="confirm-password" className="mb-1 block text-sm font-medium text-gray-600">
                                    Confirm Password
                                </Label>
                                <Input id="confirm-password" type="password" placeholder="Confirm your password" className="w-full" />
                            </div>
                            <div>
                                <Label htmlFor="role" className="mb-1 block text-sm font-medium text-gray-600">
                                    Role
                                </Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="student">Student</SelectItem>
                                        <SelectItem value="teacher">Teacher</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-6 bg-green-600 text-white hover:bg-green-700">
                            Sign Up
                        </Button>
                    </form>
                    <p className="mt-4 text-sm text-center text-gray-600">
                        Already have an account? <a href="/login" className="text-green-600 font-semibold hover:underline">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
