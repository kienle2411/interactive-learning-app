// "use client";

// import React from "react";
// import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, Tooltip } from "recharts";

// //Interface
// interface FullWidthBarChartProps {
//     data: { student: string; score: number; }[];
// }

// export default function FullWidthBarChart({ data }: FullWidthBarChartProps) {
//     return (
//         <div className="w-full overflow-x-auto mt-12 flex flex-col align-middle items-center">
//             <BarChart
//                 data={data}
//                 width={800}
//                 height={400}
//                 barSize={40}
//             >
//                 <CartesianGrid vertical={false} />
//                 <XAxis
//                     dataKey="student"
//                     tickLine={false}
//                     tickMargin={12}
//                     axisLine={false}
//                     fontSize={14}
//                     tickFormatter={(value) => value.toUpperCase()} // Ví dụ: Định dạng lại tên trình duyệt
//                 />
//                 <Tooltip
//                     contentStyle={{
//                         backgroundColor: "#fff",
//                         border: "1px solid #ddd",
//                         borderRadius: "4px",
//                     }}
//                     cursor={false}
//                 />
//                 <Bar
//                     dataKey="score"
//                     strokeWidth={2}
//                     radius={8}
//                     fill="var(--primary-color)"
//                     activeIndex={2}
//                     activeBar={({ ...props }) => (
//                         <Rectangle
//                             {...props}
//                             fillOpacity={0.8}
//                             stroke={props.payload.fill}
//                             strokeDasharray={4}
//                             strokeDashoffset={4}
//                         />
//                     )}
//                 />
//             </BarChart>
//         </div>
//     );
// }



"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, Tooltip, ResponsiveContainer } from "recharts";

// Interface
interface FullWidthBarChartProps {
    data: { student: string; score: number; }[];
}

const FullWidthBarChart: React.FC<FullWidthBarChartProps> = ({ data }) => {
    return (
        <div className="w-full overflow-x-auto mt-12 flex flex-col align-middle items-center">
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={data}
                    barSize={40}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="student"
                        tickLine={false}
                        tickMargin={12}
                        axisLine={false}
                        fontSize={14}
                        tickFormatter={(value) => value.toUpperCase()}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                        }}
                        cursor={false}
                    />
                    <Bar
                        dataKey="score"
                        strokeWidth={2}
                        radius={8}
                        fill="var(--primary-color)"
                        activeIndex={2}
                        activeBar={({ ...props }) => (
                            <Rectangle
                                {...props}
                                fillOpacity={0.8}
                                stroke={props.payload.fill}
                                strokeDasharray={4}
                                strokeDashoffset={4}
                            />
                        )}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default FullWidthBarChart;