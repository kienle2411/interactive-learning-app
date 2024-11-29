"use client";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React, { FormEvent } from 'react'

export default function Page() {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    const handleReset = () => {
        // Handle form reset logic here
    };

    return (
        <Card className="w-full max-w-md mx-auto p-6 border-none shadow-none pt-10">
            <CardContent>
                <div className="flex items-center space-x-4 mb-8">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src="" />
                        <AvatarFallback>TB</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold">TeacherB</div>
                        <div className="text-sm text-gray-500">teachera@edu.com</div>
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
                        />
                    </div>


                    <div className="space-y-2">
                        <label htmlFor="password" className="block font-medium mb-1 text-gray-600">
                            Password:
                        </label>
                        <Input
                            id="password"
                            type="password"
                            placeholder='Enter your Password'
                        />
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
