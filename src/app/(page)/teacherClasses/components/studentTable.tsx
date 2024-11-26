import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

interface Student {
    name: string;
    group: number;
    score: number;
}

interface StudentTableProps {
    students: Student[];
}

const StudentTable: React.FC<StudentTableProps> = ({ students }) => {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleEdit = (student: Student) => {
        setSelectedStudent(student);
        setIsEditDialogOpen(true);
    };

    const handleDelete = (student: Student) => {
        setSelectedStudent(student);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmEdit = () => {
        // Implement edit logic here
        setIsEditDialogOpen(false);
    };

    const handleConfirmDelete = () => {
        // Implement delete logic here
        setIsDeleteDialogOpen(false);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Class Participants</CardTitle>
                <Button variant="default" onClick={() => console.log('Add new student')}>
                    Add new Student
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Group</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.group}</TableCell>
                                <TableCell>{student.score}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="p-0">
                                                <MoreHorizontal />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleEdit(student)}>
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDelete(student)}>
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>

            {/* Edit Dialog */}
            <AlertDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <AlertDialogTrigger>
                    <div />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogTitle>Edit Student</AlertDialogTitle>
                    <AlertDialogDescription>
                        Update the details for {selectedStudent?.name}
                    </AlertDialogDescription>
                    {/* Add your edit form here */}
                    <AlertDialogAction onClick={handleConfirmEdit}>Save</AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogContent>
            </AlertDialog>

            {/* Delete Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogTrigger>
                    <div />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogTitle>Delete Student</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete {selectedStudent?.name}?
                    </AlertDialogDescription>
                    <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    );
};

export default StudentTable;