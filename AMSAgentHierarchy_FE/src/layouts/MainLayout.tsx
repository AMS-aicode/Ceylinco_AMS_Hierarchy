import React from "react";

interface Props {
    children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">

            <div className="max-w-7xl mx-auto p-4">

                <div className="text-center mb-3">

                    <h1 className="text-5xl font-bold text-white">

                        AMS Agent Hierarchy

                    </h1>
                    {/* 
                    <p className="text-blue-100 mt-4 text-lg">
                        Hierarchy Dashboard{" "}
                        <span className="text-red-500">(Search on your own risk)</span>
                    </p> */}

                </div>

                {children}

            </div>

        </div>
    );
};

export default MainLayout;