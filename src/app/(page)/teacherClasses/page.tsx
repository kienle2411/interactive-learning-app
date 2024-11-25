//// Importing necessary components from shadcn/ui
// "use client";

// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import {
//     Card,
//     CardHeader,
//     CardTitle,
//     CardContent,
// } from '@/components/ui/card';
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogFooter,
// } from "@/components/ui/dialog";
// import { Copy } from 'lucide-react';
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";


// export default function ClassesManagement() {

//     const [open, setOpen] = useState(false);
//     const [className, setClassName] = useState('');

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         // Xử lý logic tạo lớp học ở đây
//         console.log('Creating class:', className);
//         setClassName('');
//         setOpen(false);
//     };

//     return (
//         <div className="flex flex-col p-[24px] w-full">
//             <div className="flex flex-col w-full gap-[20px]">
//                 <div className="flex justify-between items-center">
//                     <span className="text-3xl font-bold">Classes</span>
//                 </div>
//                 <div className="col-span-2 flex justify-end pb-4">
//                     <Button
//                         onClick={() => setOpen(true)}
//                         variant="default">Create Class</Button>

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
//                                     <Button type="button" variant="outline" onClick={() => setOpen(false)}>
//                                         Cancel
//                                     </Button>
//                                     <Button type="submit">Create</Button>
//                                 </DialogFooter>
//                             </form>
//                         </DialogContent>
//                     </Dialog>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <Card className='flex flex-row grid-cols-1 md:grid-cols-2 gap-1 shadow-md hover:shadow-lg transition-shadow'>
//                         <CardHeader>
//                             <img className="cursor-pointer" src='/elearning_pic.jpg' height={60} width={60}></img>
//                         </CardHeader>
//                         <CardContent className="card-content pt-2 pb-2 pl-4">
//                             <h3 className='text-xl font-bold'>{"Classses"}</h3>
//                             <p>Participants: {30}</p>
//                             <p>Code: {"UIT125"}<button className="ml-2"><Copy size={16} /></button></p>
//                         </CardContent>
//                     </Card>

//                 </div>

//             </div>
//         </div >
//     );
// }
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ClassCard from "./components/classCard";

export default function ClassesManagement() {
    const [open, setOpen] = useState(false);
    const [className, setClassName] = useState("");
    const [classes, setClasses] = useState<
        { id: string; className: string; participants: number; code: string }[]
    >([
        {
            id: "1",
            className: "Math Class",
            participants: 30,
            code: "MATH101",
        },
        {
            id: "2",
            className: "English Class",
            participants: 45,
            code: "ENG1234",
        },
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newClass = {
            id: Math.random().toString(36).substr(2, 5), // Generate unique ID
            className,
            participants: 0,
            code: `CLASS${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
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
                    {classes.map((cls) => (
                        <ClassCard
                            key={cls.id}
                            id={cls.id}
                            className={cls.className}
                            participants={cls.participants}
                            code={cls.code}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
