// "use client";
// import React from "react";
// import FullWidthBarChart from "../../components/barChart";

// export default function Dashboard() {
//     const chartData = [
//         { student: "chrome", score: 300 },
//         { student: "safari", score: 250 },
//         { student: "firefox", score: 200 },
//         { student: "edge", score: 150 },
//         { student: "other", score: 100 },
//         { student: "firefox", score: 200 },
//         { student: "edge", score: 150 },
//         { student: "other", score: 100 },
//         { student: "firefox", score: 300 },
//         { student: "edge", score: 150 },
//         { student: "other", score: 100 },
//     ];

//     return (
//         <div className="flex flex-col w-full items-center align-middle h-full" style={{ padding: "20px" }}>
//             <h2 className="mt-4 font-bold text-lg">Student's Scores Overview</h2>

//             <FullWidthBarChart data={chartData} />
//         </div>
//     );
// }


"use client";

import React from "react";
import FullWidthBarChart from "../../components/barChart";

export default function Dashboard() {
    const chartData = [
        { student: "joey", score: 300 },
        { student: "aaron", score: 250 },
        { student: "mathew", score: 200 },
        { student: "john", score: 150 },
        { student: "james", score: 100 },
        { student: "scott", score: 200 },
        { student: "anderson", score: 150 },
        { student: "michael", score: 100 },
        { student: "furina", score: 300 },
        { student: "fiona", score: 150 },
        { student: "jack", score: 100 },
    ];

    return (
        <div className="flex flex-col w-full items-center align-middle h-full" style={{ padding: "20px" }}>
            <h2 className="mt-4 font-bold text-lg">Students' Scores Overview</h2>
            <FullWidthBarChart data={chartData} />
        </div>
    );
}