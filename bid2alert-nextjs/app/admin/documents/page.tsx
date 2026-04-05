'use client';

import { useState, useEffect } from 'react';
import { Plus, X, Upload, File, Download, Trash2 } from 'lucide-react';

interface Document {
    id: number;
    title: string;
    department?: string;
    file_path: string;
    file_type: string;
    size_bytes: number;
    created_at: string;
}

export default function AdminDocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [docTitle, setDocTitle] = useState('');
    const [docDept, setDocDept] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const res = await fetch('/api/documents');
            const data = await res.json();
            setDocuments(data);
        } catch (error) {
            console.error('Failed to fetch documents', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!uploadFile) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', uploadFile);
        formData.append('title', docTitle);
        formData.append('department', docDept);

        try {
            const res = await fetch('/api/documents', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                setIsModalOpen(false);
                fetchDocuments();
                setUploadFile(null);
                setDocTitle('');
                setDocDept('');
            } else {
                alert('Upload failed');
            }
        } catch (error) {
            console.error('Upload error', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this document?')) return;

        try {
            const res = await fetch(`/api/documents/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                fetchDocuments();
            } else {
                alert('Delete failed');
            }
        } catch (error) {
            console.error('Delete error', error);
            alert('An error occurred while deleting');
        }
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Document Center</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-bid-dark text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-bid-green hover:text-bid-dark transition font-bold flex items-center gap-2 text-sm sm:text-base"
                >
                    <Plus size={18} /> <span className="whitespace-nowrap">Upload Document</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading documents...</div>
                ) : documents.length === 0 ? (
                    <div className="p-8 text-center">
                        <div className="bg-gray-50 text-gray-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">📂</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No Documents Uploaded</h3>
                        <p className="text-gray-500 max-w-sm mx-auto">Upload sample tender documents, templates, or compliance forms for your users.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto scrollbar-hide">
                        <table className="w-full text-left text-sm text-gray-600 min-w-[600px] sm:min-w-full">
                            <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500">
                                <tr>
                                    <th className="px-6 py-3">Document Name</th>
                                    <th className="px-6 py-3">Department</th>
                                    <th className="px-6 py-3">Type</th>
                                    <th className="px-6 py-3">Size</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {documents.map((doc) => (
                                    <tr key={doc.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                                            <File size={16} className="text-bid-green shrink-0" />
                                            <span className="truncate max-w-[200px]">{doc.title}</span>
                                        </td>
                                        <td className="px-6 py-4 italic text-gray-500">{doc.department || 'N/A'}</td>
                                        <td className="px-6 py-4 uppercase text-xs">{doc.file_type?.split('/')[1] || 'FILE'}</td>
                                        <td className="px-6 py-4">{(doc.size_bytes / 1024).toFixed(1)} KB</td>
                                        <td className="px-6 py-4 font-mono text-xs">{new Date(doc.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                                            <a href={doc.file_path} download target="_blank" className="p-1 hover:text-blue-600 transition text-gray-400"><Download size={16} /></a>
                                            <button onClick={() => handleDelete(doc.id)} className="p-1 hover:text-red-600 transition text-gray-400"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Upload Document</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleUpload} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-bid-green focus:border-transparent outline-none"
                                    value={docTitle}
                                    placeholder="e.g. Tender Guidelines 2026"
                                    onChange={e => setDocTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department / Category</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-bid-green focus:border-transparent outline-none"
                                    value={docDept}
                                    placeholder="e.g. Public Works Dept"
                                    onChange={e => setDocDept(e.target.value)}
                                />
                            </div>

                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition cursor-pointer relative">
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={e => {
                                        if (e.target.files?.[0]) {
                                            setUploadFile(e.target.files[0]);
                                            if (!docTitle) setDocTitle(e.target.files[0].name);
                                        }
                                    }}
                                />
                                <div className="flex flex-col items-center">
                                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-600 font-medium">
                                        {uploadFile ? uploadFile.name : 'Click to upload or drag and drop'}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">PDF, DOCX, or Images</p>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button
                                    type="submit"
                                    disabled={!uploadFile || isUploading}
                                    className={`px-6 py-2 bg-bid-dark text-white rounded-lg hover:bg-bid-green hover:text-bid-dark transition font-bold ${isUploading ? 'opacity-50' : ''}`}
                                >
                                    {isUploading ? 'Uploading...' : 'Upload Now'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
