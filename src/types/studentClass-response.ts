export interface AddStudentByEmail {
    email: string;
}

export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface Student {
    student: {
        user: User;
    };
    groups: string;
    totalScore: string;
}

export interface StudentForDisplay {
    id: string;
    name: string;
    group: string;
    score: string;
}


