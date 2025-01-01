"use client";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useGetProfile, useUpdateProfile } from '@/hooks/useUsers';
import React, { useState } from 'react'
import ThreeDotsWave from "@/components/ui/three-dot-wave";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

export default function Page() {

    const { data: userInfo, isLoading: userIsLoading, isError: userIsError } = useGetProfile();
    const { mutate: updateProfile } = useUpdateProfile();

    const [formData, setFormData] = useState({
        firstName: userInfo?.data?.firstName || "",
        lastName: userInfo?.data?.lastName || "",
        phone: userInfo?.data?.phone || "",
        gender: userInfo?.data?.gender || "",
    });

    if (userIsLoading) {
        return <ThreeDotsWave />;
    }
    if (userIsError) {
        return <div>Error Loading User Information</div>;
    }

    if (!userInfo?.data) {
        return <div>No User Information found</div>;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateProfile(formData, {
            onSuccess: () => {
                console.log('Profile updated successfully');
                toast({
                    title: "Success",
                    description: "Profile updated successfully",
                    variant: 'success',
                });
            },
            onError: () => {
                console.log('Error updating profile');
                toast({
                    title: "Error",
                    description: "Error updating profile",
                    variant: 'destructive',
                });
            }
        });
    };

    const handleReset = () => {
        setFormData({
            firstName: userInfo?.data?.firstName || "",
            lastName: userInfo?.data?.lastName || "",
            phone: userInfo?.data?.phone || "",
            gender: userInfo?.data?.gender || "",
        });
    };

    return (
        <Card className="w-full max-w-md mx-auto p-6 border-none shadow-none pt-10">
            <CardContent>
                <div className="flex items-center space-x-4 mb-8">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src="" />
                        <AvatarFallback>{userInfo.data.username}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold">{userInfo.data.username}</div>
                        <div className="text-sm text-gray-500">{userInfo.data.email}</div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="firstName" className="block font-medium mb-1 text-gray-600">
                            First Name:
                        </label>
                        <Input
                            id="firstName"
                            type="text"
                            placeholder='Enter your First Name'
                            defaultValue={formData.firstName}
                            onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="lastName" className="block font-medium mb-1 text-gray-600">
                            Last Name:
                        </label>
                        <Input
                            id="lastName"
                            type="text"
                            placeholder='Enter your Last Name'
                            defaultValue={formData.lastName}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="phoneNumber" className="block font-medium mb-1 text-gray-600">
                            Phone Number:
                        </label>
                        <Input
                            id="phoneNumber"
                            type="text"
                            placeholder='Enter your Phone Number'
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, phone: e.target.value }))
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="phoneNumber" className="block font-medium mb-1 text-gray-600">
                            Gender:
                        </label>

                        <Select
                            value={formData.gender}
                            onValueChange={(value) =>
                                setFormData((prev) => ({ ...prev, gender: value }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue>
                                    {formData.gender
                                        ? formData.gender.charAt(0).toUpperCase() +
                                        formData.gender.slice(1).toLowerCase()
                                        : "Select gender"}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex space-x-4 pt-4">
                        <Button type="submit" variant="default">
                            Save
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
