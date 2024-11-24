// Importing necessary components from shadcn/ui
"use client";

import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/components/ui/card';
import { Copy } from 'lucide-react';


export default function ContactrepManagement() {
    return (
        <div className="flex flex-col p-[24px] w-full">
            <div className="flex flex-col w-full gap-[20px]">
                <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold">Classes</span>
                </div>
                <div className="col-span-2 flex justify-end pb-4">
                    <Button variant="default">Create Class</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className='flex flex-row grid-cols-1 md:grid-cols-2 gap-1'>
                        <CardHeader>
                            <img className="cursor-pointer" src='/elearning_pic.jpg' height={60} width={60}></img>
                        </CardHeader>
                        <CardContent className="card-content pt-2 pb-2 pl-4">
                            <h3 className='text-xl font-bold'>Classses</h3>
                            <p>Participants: 30</p>
                            <p>Code: UIT125 <button className="ml-2"><Copy size={16} /></button></p>
                        </CardContent>
                    </Card>

                    <Card className='flex flex-row grid-cols-1 md:grid-cols-2 gap-1'>
                        <CardHeader>
                            <img className="cursor-pointer" src='/elearning_pic.jpg' height={60} width={60}></img>
                        </CardHeader>
                        <CardContent className="card-content pt-2 pb-2 pl-4">
                            <h3 className='text-xl font-bold'>Classses</h3>
                            <p>Participants: 30</p>
                            <p>Code: UIT125 <button className="ml-2"><Copy size={16} /></button></p>
                        </CardContent>
                    </Card>

                    <Card className='flex flex-row grid-cols-1 md:grid-cols-2 gap-1'>
                        <CardHeader>
                            <img className="cursor-pointer" src='/elearning_pic.jpg' height={60} width={60}></img>
                        </CardHeader>
                        <CardContent className="card-content pt-2 pb-2 pl-4">
                            <h3 className='text-xl font-bold'>Classses</h3>
                            <p>Participants: 30</p>
                            <p>Code: UIT125 <button className="ml-2"><Copy size={16} /></button></p>
                        </CardContent>
                    </Card>

                    <Card className='flex flex-row grid-cols-1 md:grid-cols-2 gap-1'>
                        <CardHeader>
                            <img className="cursor-pointer" src='/elearning_pic.jpg' height={60} width={60}></img>
                        </CardHeader>
                        <CardContent className="card-content pt-2 pb-2 pl-4">
                            <h3 className='text-xl font-bold'>Classses</h3>
                            <p>Participants: 30</p>
                            <p>Code: UIT125 <button className="ml-2"><Copy size={16} /></button></p>
                        </CardContent>
                    </Card>

                </div>

            </div>
        </div >
    );
}

