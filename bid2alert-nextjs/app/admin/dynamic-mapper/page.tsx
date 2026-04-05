'use client';

import { useState } from 'react';
import { Upload, FileText, Brain, Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const portals = [
    { id: 'gem', name: 'GeM' },
    { id: 'eprocurement', name: 'eProcurement' },
    { id: 'ireps', name: 'IREPS' },
    { id: 'global', name: 'Global Tools' }
];

export default function DynamicMapperPage() {
    const { user } = useAuth();
    const [selectedPortal, setSelectedPortal] = useState('gem');
    const [file, setFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError(null);
            setAnalysisResult(null);
        }
    };

    const handleAnalyze = async () => {
        if (!file) {
            setError('Please upload a sample file or structure first.');
            return;
        }

        setIsAnalyzing(true);
        setError(null);
        setAnalysisResult(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('portal', selectedPortal);

            const response = await fetch(`/api/admin/analyze-structure`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Analysis failed');
            }

            const data = await response.json();
            setAnalysisResult(data.mapping);
            setSuccess('AI Analysis Complete! Review the mapping below.');
        } catch (err: any) {
            setError(err.message || 'Error analyzing structure');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleSaveMapping = async () => {
        try {
            const response = await fetch(`/api/admin/save-mapping`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    portal: selectedPortal,
                    mapping: analysisResult
                })
            });

            if (response.ok) {
                setSuccess('Mapping saved successfully! System will now use this for future imports.');
                setTimeout(() => setSuccess(null), 5000);
            } else {
                throw new Error('Failed to save mapping');
            }
        } catch (err: any) {
            setError(err.message || 'Error saving mapping');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-bid-dark tracking-tighter">
                        AI <span className="text-bid-green">Smart Mapper</span>
                    </h1>
                    <p className="text-gray-500 mt-1">Automatically update SQL queries and insert logic using AI analysis.</p>
                </div>
                <div className="bg-bid-green shadow-lg shadow-bid-green/20 p-2 rounded-xl text-bid-dark">
                    <Brain size={32} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Selection Section */}
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 text-bid-green">
                        <Upload size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-bid-dark mb-4">Step 1: Upload Structure</h2>

                    <div className="space-y-4 w-full">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 text-left">Select Portal</label>
                            <select
                                value={selectedPortal}
                                onChange={(e) => setSelectedPortal(e.target.value)}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-bid-green outline-none"
                            >
                                {portals.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="relative">
                            <input
                                type="file"
                                id="file-upload"
                                onChange={handleFileChange}
                                className="hidden"
                                accept=".csv,.xlsx,.json,.txt"
                            />
                            <label
                                htmlFor="file-upload"
                                className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-bid-green hover:bg-bid-green/5 transition-all"
                            >
                                <span className="text-gray-400 font-medium mb-1">
                                    {file ? file.name : "Choose CSV/Excel Sample"}
                                </span>
                                <span className="text-xs text-gray-400">Max size 2MB</span>
                            </label>
                        </div>

                        <button
                            onClick={handleAnalyze}
                            disabled={!file || isAnalyzing}
                            className={`w-full py-4 rounded-xl font-black text-lg transition-all shadow-lg flex items-center justify-center gap-2
                                ${!file || isAnalyzing
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                                    : 'bg-bid-dark text-white hover:bg-black shadow-black/20'}`}
                        >
                            {isAnalyzing ? <Loader2 className="animate-spin" /> : <Brain size={20} />}
                            {isAnalyzing ? 'Analyzing with Gemini...' : 'Analyze Structure'}
                        </button>
                    </div>
                </div>

                {/* Analysis Info */}
                <div className="bg-bid-dark p-8 rounded-3xl text-white shadow-xl shadow-bid-dark/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <Brain size={120} />
                    </div>

                    <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-bid-green rounded-lg flex items-center justify-center text-bid-dark">
                            <FileText size={18} />
                        </div>
                        How it works
                    </h2>

                    <ul className="space-y-4 relative z-10">
                        <li className="flex gap-4">
                            <div className="w-6 h-6 rounded-full bg-bid-green/20 text-bid-green flex items-center justify-center shrink-0 border border-bid-green/30 font-bold text-xs pt-0.5">1</div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Upload a <strong className="text-white">Sample File</strong> or <strong className="text-white">Header List</strong> from your source.
                            </p>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-6 h-6 rounded-full bg-bid-green/20 text-bid-green flex items-center justify-center shrink-0 border border-bid-green/30 font-bold text-xs pt-0.5">2</div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                AI analyzes your format and <strong className="text-white">Automatically Maps</strong> it to the BidAlert database columns.
                            </p>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-6 h-6 rounded-full bg-bid-green/20 text-bid-green flex items-center justify-center shrink-0 border border-bid-green/30 font-bold text-xs pt-0.5">3</div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                The system <strong className="text-white">Generates Dynamic SQL</strong> logic. Next time you upload data, it works without any code changes!
                            </p>
                        </li>
                    </ul>

                    {error && (
                        <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-100">
                            <AlertCircle className="shrink-0" size={20} />
                            <p className="text-xs">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mt-8 p-4 bg-bid-green/10 border border-bid-green/20 rounded-2xl flex items-center gap-3 text-bid-green">
                            <CheckCircle2 className="shrink-0" size={20} />
                            <p className="text-xs">{success}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Analysis Result Section */}
            {analysisResult && (
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-black text-bid-dark tracking-tighter">AI Analysis <span className="text-bid-green">Mapping</span></h2>
                            <p className="text-gray-500 text-sm">Review how AI will map your columns to BidAlert Database.</p>
                        </div>
                        <button
                            onClick={handleSaveMapping}
                            className="bg-bid-green text-bid-dark px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-bid-green/20"
                        >
                            <Save size={20} />
                            Update System Logic
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(analysisResult).map(([dbCol, sourceCol]: [string, any]) => (
                            <div key={dbCol} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-bid-green hover:bg-white transition-all">
                                <div className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">Database Column</div>
                                <div className="font-bold text-bid-dark mb-3">{dbCol}</div>
                                <div className="text-[10px] uppercase tracking-widest font-black text-bid-green mb-1">Maps To Source</div>
                                <div className="p-2 bg-white rounded-lg border border-gray-100 font-mono text-sm text-gray-600">
                                    {sourceCol || '---'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
