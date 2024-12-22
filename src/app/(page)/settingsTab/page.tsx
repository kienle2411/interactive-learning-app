"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetProfile, useUpdateProfile } from "@/hooks/useUsers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format, startOfDay } from "date-fns";
import ThreeDotsWave from "@/components/ui/three-dot-wave";
import { ProfileUpdateBody } from "@/types/user-response";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  gender: z.string(),
  school: z.string(),
  profileDescription: z.string(),
});

export default function ProfileForm() {
  const [profile, setProfile] = useState<ProfileUpdateBody>();
  const { data: userProfile, isLoading, isError, error } = useGetProfile();
  const { mutate: updateProfile } = useUpdateProfile();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: userProfile?.data
      ? {
        firstName: userProfile.data.firstName,
        lastName: userProfile.data.lastName,
        dateOfBirth: userProfile.data.dateOfBirth,
        gender: userProfile.data.gender,
        school: userProfile.data.school,
        profileDescription: userProfile.data.profileDescription || "",
      }
      : {},
  });

  useEffect(() => {
    if (userProfile?.data) {
      setProfile({
        firstName: userProfile.data.firstName,
        lastName: userProfile.data.lastName,
        dateOfBirth: userProfile.data.dateOfBirth,
        email: userProfile.data.email,
        phone: userProfile.data.phone,
        gender: userProfile.data.gender,
        school: userProfile.data.school,
        profileDescription: userProfile.data.profileDescription || "",
      });

      form.setValue("firstName", userProfile.data.firstName);
      form.setValue("lastName", userProfile.data.lastName);
      form.setValue("school", userProfile.data.school);
      form.setValue(
        "profileDescription",
        userProfile.data.profileDescription || ""
      );
      form.setValue("gender", userProfile.data.gender);
      form.setValue("dateOfBirth", userProfile.data.dateOfBirth);
    }
  }, [userProfile]);

  if (isLoading) {
    return <ThreeDotsWave />;
  }
  if (isError || !userProfile || userProfile.status === "error") {
    if (error instanceof AxiosError) {
      return (
        <div>
          {error.response?.data.statusCode +
            ": " +
            error.response?.data.message}
        </div>
      );
    }
    return (
      <div>Error: {error?.message || "Failed to fetch user's profile"}</div>
    );
  }
  function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedProfile: Partial<ProfileUpdateBody> = {};
    if (!profile) return;
    Object.keys(values).forEach((key) => {
      if (
        values[key as keyof typeof values] !==
        profile[key as keyof typeof userProfile]
      ) {
        if (
          values[key as keyof typeof values] === "male" ||
          values[key as keyof typeof values] === "female"
        ) {
          updatedProfile[key as keyof typeof updatedProfile] =
            values[key as keyof typeof values].toUpperCase();
        } else {
          updatedProfile[key as keyof typeof updatedProfile] =
            values[key as keyof typeof values];
        }
      }
    });
    updateProfile(updatedProfile);
  }

  const handleReset = () => { };

  const handleSelectChange = (value: string) => {
    form.setValue("gender", value);
    console.log(form.getValues("gender"));
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 border-none shadow-none pt-10">
      <CardContent>
        <div className="flex items-center space-x-4 mb-8">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={userProfile.data?.profilePicture?.url}
              alt="avatar"
            />
            <AvatarFallback>{userProfile.data?.firstName}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">
              {userProfile.data?.firstName + " " + userProfile.data?.lastName}
            </div>
            <div className="text-sm text-gray-500">
              {userProfile.data?.email}
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Enter your First Name"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      id="lastname"
                      value={field.value}
                      type="text"
                      placeholder="Enter your Last Name"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
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
            ></FormField>

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select onValueChange={handleSelectChange}>
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
            ></FormField>

            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School</FormLabel>
                  <FormControl>
                    <Input
                      id="school"
                      type="text"
                      placeholder="Enter your School"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="profileDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Description</FormLabel>
                  <FormControl>
                    <Input
                      id="profiledescription"
                      type="text"
                      placeholder="Enter your Bio"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>

            <div className="flex space-x-4 pt-4">
              <Button type="submit" variant="default">
                Save
              </Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
