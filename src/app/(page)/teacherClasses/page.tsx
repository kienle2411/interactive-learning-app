// "use client";

// import React, { useState } from "react";
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
//     >([
//         {
//             id: "1",
//             className: "Math Class",
//             participants: 30,
//             code: "MATH101",
//         },
//         {
//             id: "2",
//             className: "English Class",
//             participants: 45,
//             code: "ENG1234",
//         },
//     ]);

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







// "use client";

// import React from "react";
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
// import { useTeacherClasses } from "@/hooks/useTeacherClasses";

// const ClassesManagement: React.FC = () => {
//     const [open, setOpen] = React.useState(false);
//     const [className, setClassName] = React.useState("");
//     const [classDescription, setClassDescription] = React.useState("");

//     // Sử dụng hook để lấy danh sách lớp học
//     const { classes, loading, error } = useTeacherClasses();

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         // Tạo lớp mới
//         const newClass = {
//             id: Math.random().toString(36).substr(2, 5),
//             className,
//             participants: 0,
//             code: `CLASS${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
//         };
//         //Log out data, need more action
//         console.log(newClass);
//         setClassName("");
//         setOpen(false);
//     };

//     if (loading) {
//         return <div>Loading...</div>; // Hiển thị trạng thái đang tải
//     }

//     if (error) {
//         return <div>Error: {error}</div>; // Hiển thị thông báo lỗi
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
//                                             required
//                                             value={className}
//                                             onChange={(e) => setClassName(e.target.value)}
//                                             placeholder="Enter class name"
//                                         />
//                                     </div>

//                                     <div className="grid gap-2">
//                                         <Label htmlFor="description">Class Description</Label>
//                                         <Input
//                                             id="description"
//                                             value={classDescription}
//                                             onChange={(e) => setClassDescription(e.target.value)}
//                                             placeholder="Enter class description (Optional)"
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
//                     {classes.length > 0 ? (
//                         classes.map((cls) => (
//                             <ClassCard
//                                 key={cls.id}
//                                 id={cls.id}
//                                 className={cls.classroomName}
//                                 description={cls.description}
//                                 participants={cls.capacity} // Bạn có thể thay bằng số lượng học viên thực tế
//                                 code={cls.classroomCode}
//                             />
//                         ))
//                     ) : (
//                         <div>No classes available</div> // Thông báo khi không có lớp học
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ClassesManagement;






"use client";

import React from "react";
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
import { useTeacherClasses } from "@/hooks/useTeacherClasses";
import { createClass } from "@/api/endpoints/teacherClasses";  // Import API tạo lớp học

const ClassesManagement: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [className, setClassName] = React.useState("");
    const [classDescription, setClassDescription] = React.useState("");

    const { classes, loading, error, refetchClasses } = useTeacherClasses();  // Đảm bảo có hàm refetch


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Tạo lớp học mới
        const newClass = {
            classroomName: className,
            description: classDescription,
            capacity: 50,
            classroomCode: `CLS${Math.random().toString(36).substr(2, 7).toUpperCase()}`,
        };

        try {
            await createClass(newClass);  // Gọi API tạo lớp học mới
            refetchClasses();  // Cập nhật danh sách lớp học sau khi tạo
            setClassName("");
            setClassDescription("");
            setOpen(false);
        } catch (error) {
            console.error("Error creating class:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                                            required
                                            value={className}
                                            onChange={(e) => setClassName(e.target.value)}
                                            placeholder="Enter class name"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Class Description</Label>
                                        <Input
                                            id="description"
                                            value={classDescription}
                                            onChange={(e) => setClassDescription(e.target.value)}
                                            placeholder="Enter class description (Optional)"
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
                                description={cls.description}
                                participants={cls.capacity}  // Replace with actual participants count
                                code={cls.classroomCode}
                            />
                        ))
                    ) : (
                        <div>No classes available</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClassesManagement;
