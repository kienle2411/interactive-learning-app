"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { format, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useSignUp } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { SignUpBody } from "@/types/auth";

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters",
  }),
  password: z.string(),
  confirmPassword: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  email: z.string(),
  phone: z.string(),
  gender: z.string(),
  roleId: z.string(),
});

export default function SignUpPage() {
  const router = useRouter();
  const { mutate: signUp } = useSignUp(router);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      roleId: "",
    },
  });
  function clicktest() {
    console.log("test");
    console.log(form.formState.errors);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("test 1234");
    console.log("gender: ", values.gender);
    console.log("role: ", values.roleId);
    const signUpBody: Partial<SignUpBody> = {
      username: values.username,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
      email: values.email,
      phone: values.phone,
      gender: values.gender.toUpperCase(),
      roleId: values.roleId.toLowerCase(),
    };
    signUp(signUpBody);
  }

  const handleSelectGenderChange = (value: string) => {
    form.setValue("gender", value);
  };

  const handleSelectRoleChange = (value: string) => {
    form.setValue("roleId", value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-md">
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1 block text-sm font-medium text-gray-600">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Username"
                        type="text"
                        value={field.value}
                        className="w-full"
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1 block text-sm font-medium text-gray-600">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Email"
                        type="email"
                        value={field.value}
                        className="w-full"
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex space-x-[5px] w-full">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-1 block text-sm font-medium text-gray-600">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your First Name"
                            type="text"
                            value={field.value}
                            className="w-full"
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-1 block text-sm font-medium text-gray-600">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your Last Name"
                            type="text"
                            value={field.value}
                            className="w-full"
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex space-x-[5px] w-full">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-1 block text-sm font-medium text-gray-600">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your Password"
                            type="password"
                            value={field.value}
                            className="w-full"
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-1 block text-sm font-medium text-gray-600">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your Confirm Password"
                            type="password"
                            value={field.value}
                            className="w-full"
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex space-x-[5px] w-full">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-1 block text-sm font-medium text-gray-600">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your Phone Number"
                            type="text"
                            value={field.value}
                            className="w-full"
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-1 block text-sm font-medium text-gray-600">
                          Date of Birth
                        </FormLabel>
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
                                    "dateOfBirth",
                                    startOfDay(date || "").toISOString()
                                  );
                                }}
                              />
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex space-x-[5px] w-full">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-1 block text-sm font-medium text-gray-600">
                          Gender
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={handleSelectGenderChange}>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  field.value
                                    ? field.value.charAt(0).toUpperCase() +
                                      field.value.slice(1).toLowerCase()
                                    : "Select gender"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="roleId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-1 block text-sm font-medium text-gray-600">
                          Role
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={handleSelectRoleChange}>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  field.value
                                    ? field.value.charAt(0).toUpperCase() +
                                      field.value.slice(1).toLowerCase()
                                    : "Select Role"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="teacher">Teacher</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                onClick={clicktest}
                type="submit"
                className="w-full mt-6 bg-green-600 text-white hover:bg-green-700"
              >
                Sign Up
              </Button>
            </form>
          </Form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
