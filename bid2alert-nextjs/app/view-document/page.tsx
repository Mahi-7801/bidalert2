"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ViewDocumentContent() {
    const searchParams = useSearchParams();
    const file = searchParams.get("file");

    if (!file) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <p className="text-gray-500 font-bold">No file selected</p>
            </div>
        );
    }

    // Determine if it's a local file or external URL
    // The user's example assumes local files in /uploads/
    // But we might want to support full URLs if needed later.
    // For now, adhering strictly to user request: src={`/uploads/${file}`}

    // However, for better robustness, if 'file' is a full URL, we might want to handle it.
    // But the user strictly said: src={`/uploads/${file}`}

    return (
        <div className="w-full h-screen bg-gray-100 flex flex-col">
            <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm z-10">
                <h1 className="font-bold text-gray-800 truncate max-w-xl">{file}</h1>
                <a
                    href={`/uploads/${file}`}
                    download
                    className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
                >
                    Download Original
                </a>
            </div>
            <iframe
                src={`/uploads/${file}`}
                className="w-full h-full border-0"
                title="PDF Viewer"
            />
        </div>
    );
}

export default function ViewDocumentPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
            <ViewDocumentContent />
        </Suspense>
    );
}
