// "use client";
// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogFooter,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import ClassCard from "./components/classCard";

// export default function ClassesManagement() {
//     const [open, setOpen] = useState(false);
//     const [className, setClassName] = useState("");
//     const [classes, setClasses] = useState<
//         { id: string; className: string; participants: number; code: string }[]
//     >([]);
//     const [loading, setLoading] = useState(false); // Trạng thái loading
//     const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

//     // Fetch classes từ API
//     useEffect(() => {
//         const fetchClasses = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await fetch("/api/teacherClass", {
//                     method: "GET",
//                 });
//                 if (response.ok) {
//                     const data = await response.json();
//                     setClasses(data.classes);
//                 } else {
//                     const errorData = await response.json();
//                     setError(errorData.message || "Failed to fetch classes");
//                 }
//             } catch (error) {
//                 setError("An error occurred while fetching classes");
//                 console.log(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchClasses();
//     }, []);

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         const newClass = {
//             id: Math.random().toString(36).substr(2, 5), // Generate unique ID
//             className,
//             participants: 0,
//             code: `CLASS${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
//         };
//         setClasses([...classes, newClass]);
//         setClassName("");
//         setOpen(false);
//     };

//     return (
//         <div className="flex flex-col p-[24px] w-full">
//             <div className="flex flex-col w-full gap-[20px]">
//                 <div className="flex justify-between items-center">
//                     <span className="text-3xl font-bold">Classes</span>
//                 </div>
//                 <div className="col-span-2 flex justify-end pb-4">
//                     <Button onClick={() => setOpen(true)} variant="default">
//                         Create Class
//                     </Button>

//                     <Dialog open={open} onOpenChange={setOpen}>
//                         <DialogContent className="sm:max-w-[425px]">
//                             <DialogHeader>
//                                 <DialogTitle>Create New Class</DialogTitle>
//                             </DialogHeader>
//                             <form onSubmit={handleSubmit}>
//                                 <div className="grid gap-4 py-4">
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="className">Class Name</Label>
//                                         <Input
//                                             id="className"
//                                             value={className}
//                                             onChange={(e) => setClassName(e.target.value)}
//                                             placeholder="Enter class name"
//                                         />
//                                     </div>
//                                 </div>
//                                 <DialogFooter>
//                                     <Button
//                                         type="button"
//                                         variant="outline"
//                                         onClick={() => setOpen(false)}
//                                     >
//                                         Cancel
//                                     </Button>
//                                     <Button type="submit">Create</Button>
//                                 </DialogFooter>
//                             </form>
//                         </DialogContent>
//                     </Dialog>
//                 </div>

//                 {loading ? (
//                     <div>Loading classes...</div>
//                 ) : error ? (
//                     <div className="text-red-500">{error}</div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         {classes.map((cls) => (
//                             <ClassCard
//                                 key={cls.id}
//                                 id={cls.id}
//                                 className={cls.className}
//                                 participants={cls.participants}
//                                 code={cls.code}
//                             />
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }





// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import ClassCard from "./components/classCard";

// interface ClassRoom {
//     id: string;
//     className: string;
//     code: string;
//     participants: number;
//     description?: string;
// }

// export default function ClassroomsPage() {
//     const [classes, setClasses] = useState<ClassRoom[]>([]);
//     const [open, setOpen] = useState(false);
//     const [className, setClassName] = useState('');
//     const [description, setDescription] = useState('');
//     const [isLoading, setIsLoading] = useState(true);

//     // Fetch classes
//     useEffect(() => {
//         const fetchClasses = async () => {
//             try {
//                 const response = await axios.get('/api/teacherClass');
//                 setClasses(response.data.classes);
//                 setIsLoading(false);
//             } catch (error) {
//                 console.error('Failed to fetch classes:', error);
//                 setIsLoading(false);
//             }
//         };

//         fetchClasses();
//     }, []);

//     // Handle class creation
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             // Implement your class creation logic here
//             const response = await axios.post('/api/createClass', {
//                 classroomName: className,
//                 description: description
//             });

//             // Add the new class to the list
//             setClasses([...classes, response.data.class]);

//             // Reset form and close dialog
//             setClassName('');
//             setDescription('');
//             setOpen(false);
//         } catch (error) {
//             console.error('Failed to create class:', error);
//         }
//     };

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="flex flex-col p-[24px] w-full">
//             <div className="flex flex-col w-full gap-[20px]">
//                 <div className="flex justify-between items-center">
//                     <span className="text-3xl font-bold">Classes</span>
//                 </div>

//                 <div className="col-span-2 flex justify-end pb-4">
//                     <Button onClick={() => setOpen(true)} variant="default">
//                         Create Class
//                     </Button>

//                     <Dialog open={open} onOpenChange={setOpen}>
//                         <DialogContent className="sm:max-w-[425px]">
//                             <DialogHeader>
//                                 <DialogTitle>Create New Class</DialogTitle>
//                             </DialogHeader>
//                             <form onSubmit={handleSubmit}>
//                                 <div className="grid gap-4 py-4">
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="className">Class Name</Label>
//                                         <Input
//                                             id="className"
//                                             value={className}
//                                             onChange={(e) => setClassName(e.target.value)}
//                                             placeholder="Enter class name"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="description">Description</Label>
//                                         <Input
//                                             id="description"
//                                             value={description}
//                                             onChange={(e) => setDescription(e.target.value)}
//                                             placeholder="Enter class description"
//                                         />
//                                     </div>
//                                 </div>
//                                 <DialogFooter>
//                                     <Button
//                                         type="button"
//                                         variant="outline"
//                                         onClick={() => setOpen(false)}
//                                     >
//                                         Cancel
//                                     </Button>
//                                     <Button type="submit">Create</Button>
//                                 </DialogFooter>
//                             </form>
//                         </DialogContent>
//                     </Dialog>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     {classes.map((cls) => (
//                         <ClassCard
//                             key={cls.id}
//                             id={cls.id}
//                             className={cls.className}
//                             participants={cls.participants}
//                             code={cls.code}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }






"use client";
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ClassCard from './components/classCard';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import axios from 'axios';

// Define the Classroom type
interface Classroom {
    id: string;
    classroomName: string;
    description: string;
    capacity: number;
    classroomCode: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    teacherId: string;
}

const TeacherClassPage = () => {
    const [classes, setClasses] = useState<Classroom[]>([]); // Specify the type for the state
    const [open, setOpen] = useState(false);
    const [className, setClassName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('/api/teacherClass');
                if (response.status === 200) {
                    console.log(response.data.data);
                    setClasses(response.data.data);
                } else {
                    console.error('Failed to fetch classes:', response);
                }
            } catch (error) {
                console.error('Error fetching teacher classes:', error);
            }
        };

        fetchClasses();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newClass = {
            id: Math.random().toString(36).substr(2, 5),
            classroomName: className,
            description: "",
            capacity: 0,
            classroomCode: `CLASS${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
            createdAt: "12/12/2024",
            updatedAt: "12/12/2024",
            deletedAt: null,
            teacherId: "asd",
        };
        setClasses([...classes, newClass]);
        setClassName("");
        setOpen(false);
    };

    return (
        <div className="flex flex-col p-[24px] w-full">
            <div className="flex flex-col w-full gap-[20px]">
                <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold">Classes</span>
                </div>

                <div className="col-span-2 flex justify-end pb-4">
                    <Button onClick={() => setOpen(true)} variant="default">
                        Create Class
                    </Button>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create New Class</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="className">Class Name</Label>
                                        <Input
                                            id="className"
                                            value={className}
                                            onChange={(e) => setClassName(e.target.value)}
                                            placeholder="Enter class name"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Input
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Enter class description"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit">Create</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {classes.length > 0 ? (
                        classes.map((cls) => (
                            <ClassCard
                                key={cls.id}
                                id={cls.id}
                                className={cls.classroomName}
                                participants={cls.capacity}
                                code={cls.classroomCode}
                            />
                        ))
                    ) : (
                        <p>No classes available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherClassPage;
