import React from "react";

export default function Spinner() {
    return (
        <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
            <span className="ml-4 text-blue-500 font-semibold">Loading...</span>
        </div>
    );
}