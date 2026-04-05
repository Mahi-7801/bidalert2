'use client';

import { useState, useEffect } from 'react';
import { Plus, X, Search, Edit, Trash2, Layers, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface Tender {
    id: number | string;
    title: string;
    authority: string;
    description: string;
    deadline: string;
    status: 'active' | 'closed' | 'archive';
    state: string;
    category: string;
    estimated_value: number;
    source_table?: string;
}

export default function AdminTendersPage() {
    const [tenders, setTenders] = useState<Tender[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
    const [editingTender, setEditingTender] = useState<Tender | null>(null);
    const [isImporting, setIsImporting] = useState(false);
    const [importTable, setImportTable] = useState('gem_tenders');
    const [importPortal, setImportPortal] = useState('gem');
    const [csvFile, setCsvFile] = useState<File | null>(null);

    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');

    const [newTender, setNewTender] = useState<Partial<Tender>>({
        title: '',
        authority: '',
        deadline: '',
        status: 'active',
        state: '',
        category: '',
        estimated_value: 0,
        description: '',
        source_table: 'GEM'
    });

    useEffect(() => {
        fetchTenders();
    }, [statusFilter]);

    const fetchTenders = async () => {
        setIsLoading(true);
        try {
            // Sort by latest to show newly uploaded tenders first
            // Map the frontend status filter to standard API statuses
            const apiStatus = statusFilter === 'Archive' ? 'archive' : statusFilter === 'All Status' ? 'all' : 'active';
            // Add timestamp to prevent caching
            const res = await fetch(`/api/tenders?limit=250&sort=latest&status=${apiStatus}&t=${Date.now()}`);
            if (res.ok) {
                const data = await res.json();
                setTenders(data.tenders || []);
            }
        } catch (error) {
            console.error('Failed to fetch tenders', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number | string, source_table: string) => {
        if (!confirm('Are you sure you want to delete this tender?')) return;
        try {
            const res = await fetch(`/api/tenders/${id}?source_table=${source_table}`, { method: 'DELETE' });
            if (res.ok) fetchTenders();
            else alert('Failed to delete tender');
        } catch (error) {
            console.error('Error delete', error);
        }
    };

    const handleSaveTender = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = editingTender || newTender;
        try {
            const method = editingTender ? 'PUT' : 'POST';
            const url = editingTender ? `/api/tenders/${editingTender.id}` : '/api/tenders';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                setIsModalOpen(false);
                setEditingTender(null);
                setNewTender({ title: '', authority: '', deadline: '', status: 'active', state: '', category: '', estimated_value: 0, description: '' });
                fetchTenders();
            } else {
                alert('Failed to save tender');
            }
        } catch (error) {
            console.error('Error saving tender', error);
        }
    };

    const handleCsvUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!csvFile) return;

        setIsImporting(true);
        const formData = new FormData();
        formData.append('file', csvFile);
        formData.append('table', importTable);
        formData.append('portal', importPortal);

        try {
            const res = await fetch('/api/admin/import-csv', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                alert('Import successful!');
                setIsCsvModalOpen(false);
                setCsvFile(null);
                await fetchTenders();
            } else {
                let errorMessage = 'Import failed';
                try {
                    const contentType = res.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const data = await res.json();
                        errorMessage = data.message || errorMessage;
                    } else {
                        const text = await res.text();
                        console.error('Non-JSON response:', text);
                        errorMessage = `Server Error (${res.status}): Please check backend logs.`;
                    }
                } catch (e) {
                    console.error('Error parsing handling error:', e);
                }
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Import error', error);
        } finally {
            setIsImporting(false);
        }
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return 'N/A';
        try {
            if (dateStr.includes('/')) return dateStr;
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString('en-GB');
        } catch {
            return dateStr;
        }
    };

    // Filter Logic
    const filteredTenders = tenders.filter(tender => {
        const matchesSearch =
            tender.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tender.authority?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tender.id?.toString().toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
            statusFilter === 'All Status' ||
            tender.status?.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-[#f8fafc] min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Manage Tenders</h1>
                    <p className="text-sm text-gray-500 font-medium">Add, edit or import tender data directly to database.</p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                        onClick={() => setIsCsvModalOpen(true)}
                        className="flex-1 sm:flex-none bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl hover:bg-emerald-200 transition-all font-bold flex items-center justify-center gap-2 border border-emerald-200"
                    >
                        <Upload size={16} /> <span className="text-xs sm:text-sm">Upload CSV</span>
                    </button>
                    <button
                        onClick={() => { setEditingTender(null); setIsModalOpen(true); }}
                        className="flex-1 sm:flex-none bg-[#0a0f1c] text-white px-4 py-2 rounded-xl hover:bg-[#1a202c] transition-all font-bold flex items-center justify-center gap-2 shadow-sm"
                    >
                        <Plus size={16} /> <span className="text-xs sm:text-sm">Add New Tender</span>
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by tender ID, title or authority..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white outline-none text-sm font-bold text-gray-700 min-w-[150px]"
                    >
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Archive</option>
                    </select>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Synchronizing Database...</span>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto scrollbar-hide">
                            <table className="w-full text-left text-sm text-gray-600 min-w-[1000px]">
                                <thead className="bg-gray-50 text-[10px] uppercase font-black tracking-[0.1em] text-gray-400 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4">ID</th>
                                        <th className="px-6 py-4">Title</th>
                                        <th className="px-6 py-4">Authority</th>
                                        <th className="px-6 py-4 text-center">Closing Date</th>
                                        <th className="px-6 py-4 text-center">Value (₹)</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 italic-none">
                                    {filteredTenders.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-20 text-center text-gray-500">
                                                <div className="bg-gray-100 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 border-b-4 border-gray-200">
                                                    <Layers className="text-gray-300" size={32} />
                                                </div>
                                                <h3 className="text-lg font-black text-gray-800 tracking-tight">No Tenders Found</h3>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Try adjusting your filters</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredTenders.map((tender, index) => (
                                            <tr key={`${tender.source_table}-${tender.id}-${index}`} className="hover:bg-emerald-50/20 transition-all group">
                                                <td className="px-6 py-5">
                                                    <span className="text-[11px] font-black text-gray-900 block tracking-tighter">#TND-{tender.id}</span>
                                                    <span className="text-[9px] text-emerald-600 font-black uppercase tracking-tighter bg-emerald-50 px-1.5 py-0.5 rounded-md mt-1 inline-block">
                                                        {tender.source_table}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="font-bold text-gray-800 line-clamp-1 max-w-[320px] transition-colors group-hover:text-emerald-700" title={tender.title}>
                                                        {tender.title}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="text-[11px] font-medium text-gray-500 line-clamp-1 max-w-[220px]">{tender.authority}</div>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className="font-bold text-[10px] text-gray-500 flex items-center justify-center gap-1.5 whitespace-nowrap">
                                                        {formatDate(tender.deadline)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-center font-bold text-gray-400 text-xs">
                                                    {tender.estimated_value ? `₹${Number(tender.estimated_value).toLocaleString('en-IN')}` : 'N/A'}
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black tracking-widest ${tender.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                                                        tender.status === 'archive' ? 'bg-gray-100 text-gray-700' : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        {tender.status?.toUpperCase() || 'ACTIVE'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => { setEditingTender(tender); setIsModalOpen(true); }}
                                                            className="p-2 hover:bg-emerald-100 hover:text-emerald-700 rounded-xl transition-all text-gray-400 shadow-sm border border-transparent hover:border-emerald-200"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(tender.id, tender.source_table || 'GEM')}
                                                            className="p-2 hover:bg-red-100 hover:text-red-700 rounded-xl transition-all text-gray-400 shadow-sm border border-transparent hover:border-red-200"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden flex flex-col gap-4 p-4">
                            {filteredTenders.length === 0 ? (
                                <div className="py-10 text-center text-gray-500">
                                    <Layers className="text-gray-300 mx-auto mb-4" size={32} />
                                    <h3 className="text-lg font-black text-gray-800 tracking-tight">No Tenders Found</h3>
                                </div>
                            ) : (
                                filteredTenders.map((tender, index) => (
                                    <div key={`mobile-${tender.source_table}-${tender.id}-${index}`} className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] font-black text-gray-900 tracking-tight">#TND-{tender.id}</span>
                                                <span className="text-[8px] text-emerald-600 font-bold uppercase tracking-widest bg-emerald-50 px-1.5 py-0.5 rounded-md inline-block">
                                                    {tender.source_table}
                                                </span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => { setEditingTender(tender); setIsModalOpen(true); }} className="p-2 text-gray-400 hover:text-emerald-500 bg-white shadow-sm rounded-lg border border-gray-100">
                                                    <Edit size={14} />
                                                </button>
                                                <button onClick={() => handleDelete(tender.id, tender.source_table || 'GEM')} className="p-2 text-gray-400 hover:text-red-500 bg-white shadow-sm rounded-lg border border-gray-100">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-bold text-gray-800 leading-relaxed mb-1">{tender.title}</h3>
                                            <p className="text-[10px] text-gray-500 line-clamp-1">{tender.authority}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pb-1">
                                            <div>
                                                <span className="text-[8px] text-gray-400 uppercase font-black tracking-widest block mb-0.5">Closing Date</span>
                                                <span className="text-[10px] font-bold text-gray-700">{formatDate(tender.deadline)}</span>
                                            </div>
                                            <div>
                                                <span className="text-[8px] text-gray-400 uppercase font-black tracking-widest block mb-0.5">Value</span>
                                                <span className="text-[10px] font-bold text-gray-700">{tender.estimated_value ? `₹${Number(tender.estimated_value).toLocaleString('en-IN')}` : 'N/A'}</span>
                                            </div>
                                        </div>
                                        <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black tracking-widest ${tender.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                                                {tender.status?.toUpperCase() || 'ACTIVE'}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* CSV Import Modal */}
            {isCsvModalOpen && (
                <div className="fixed inset-0 bg-[#0a0f1c]/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-5 sm:p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 sm:p-3 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/20">
                                    <Upload size={20} className="sm:w-6 sm:h-6" />
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight truncate">Upload CSV Data</h2>
                                    <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest truncate">Import tenders directly to DB</p>
                                </div>
                            </div>
                            <button onClick={() => setIsCsvModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-full">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleCsvUpload} className="p-5 sm:p-8 space-y-4 sm:space-y-6">
                            <div>
                                <label className="block text-[10px] sm:text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 sm:mb-3 truncate">Target Database Table</label>
                                <select
                                    className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs sm:text-sm font-bold text-gray-800 outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all appearance-none cursor-pointer"
                                    value={importTable}
                                    onChange={e => {
                                        const val = e.target.value;
                                        setImportTable(val);
                                        // Sync portal with table
                                        if (val === 'gem_tenders') setImportPortal('gem');
                                        else if (val === 'eprocurement_tenders') setImportPortal('eprocurement');
                                        else if (val === 'ireps_tenders') setImportPortal('ireps');
                                        else if (val === 'temp_tenders_global') setImportPortal('global');
                                    }}
                                >
                                    <option value="gem_tenders">GEM Tenders (gem_tenders)</option>
                                    <option value="eprocurement_tenders">eProcurement Tenders (eprocurement_tenders)</option>
                                    <option value="ireps_tenders">iREPS Tenders (ireps_tenders)</option>
                                    <option value="temp_tenders_global">Global Tenders (temp_tenders_global)</option>
                                </select>
                                <p className="text-[10px] text-gray-400 font-medium mt-2 ml-1">Select the table where data will be stored.</p>
                            </div>

                            <div
                                className={`border-2 border-dashed rounded-[28px] p-6 sm:p-10 text-center transition-all cursor-pointer group ${csvFile ? 'bg-emerald-50/50 border-emerald-200' : 'bg-gray-50 border-gray-100 hover:border-emerald-300 hover:bg-emerald-50/20'}`}
                                onClick={() => document.getElementById('csv-input')?.click()}
                            >
                                <input id="csv-input" type="file" accept=".csv" className="hidden" onChange={e => setCsvFile(e.target.files?.[0] || null)} />

                                {csvFile ? (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="p-4 bg-emerald-500 text-white rounded-3xl shadow-xl shadow-emerald-500/30">
                                            <FileText size={32} />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-black text-gray-800">{csvFile.name}</p>
                                            <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">{(csvFile.size / 1024).toFixed(1)} KB • Ready to Import</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); setCsvFile(null); }}
                                            className="text-[10px] text-red-500 font-black uppercase tracking-widest hover:underline mt-2"
                                        >
                                            Remove File
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="p-5 bg-white text-gray-300 rounded-3xl shadow-sm border border-gray-100 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                            <Upload size={32} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-gray-800 uppercase tracking-tight">Drag and drop or click to select CSV</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Only .csv files are supported</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2 sm:gap-4 pt-2 sm:pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsCsvModalOpen(false)}
                                    className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-[11px] font-black text-gray-400 uppercase tracking-widest hover:bg-gray-50 rounded-2xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!csvFile || isImporting}
                                    className={`flex-[1.5] sm:flex-[2] px-4 sm:px-10 py-3 sm:py-4 bg-[#0a0f1c] text-white font-black text-[10px] sm:text-[11px] uppercase tracking-widest rounded-2xl shadow-xl shadow-black/20 flex items-center justify-center gap-2 transition-all ${(!csvFile || isImporting) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-500 hover:scale-[1.02]'}`}
                                >
                                    {isImporting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Importing...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle size={16} />
                                            Start Import
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
                            <h2 className="text-xl font-bold text-gray-900">{editingTender ? 'Edit Tender' : 'Add New Tender'}</h2>
                            <button onClick={() => { setIsModalOpen(false); setEditingTender(null); }} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveTender} className="p-6 space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Tender Title *</label>
                                    <input
                                        type="text" required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-medium"
                                        value={editingTender ? editingTender.title : newTender.title}
                                        onChange={e => editingTender ? setEditingTender({ ...editingTender, title: e.target.value }) : setNewTender({ ...newTender, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Authority *</label>
                                    <input
                                        type="text" required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-medium"
                                        value={editingTender ? editingTender.authority : newTender.authority}
                                        onChange={e => editingTender ? setEditingTender({ ...editingTender, authority: e.target.value }) : setNewTender({ ...newTender, authority: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Source Table</label>
                                    <select
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold"
                                        disabled={!!editingTender}
                                        value={editingTender ? editingTender.source_table : (newTender as any).source_table || 'GEM'}
                                        onChange={e => setNewTender({ ...newTender, source_table: e.target.value } as any)}
                                    >
                                        <option value="GEM">GEM</option>
                                        <option value="eProcurement">eProcurement</option>
                                        <option value="iREPS">iREPS</option>
                                        <option value="Global">Global</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Closing Date *</label>
                                    <input
                                        type="date" required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-bold"
                                        value={editingTender ? editingTender.deadline?.split('T')[0] : newTender.deadline}
                                        onChange={e => editingTender ? setEditingTender({ ...editingTender, deadline: e.target.value }) : setNewTender({ ...newTender, deadline: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Estimated Value (₹)</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-bold"
                                        value={editingTender ? editingTender.estimated_value : newTender.estimated_value}
                                        onChange={e => editingTender ? setEditingTender({ ...editingTender, estimated_value: Number(e.target.value) }) : setNewTender({ ...newTender, estimated_value: Number(e.target.value) })}
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Category *</label>
                                    <input
                                        type="text" required
                                        placeholder="e.g. Service, Work, Goods"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-medium"
                                        value={editingTender ? editingTender.category : newTender.category}
                                        onChange={e => editingTender ? setEditingTender({ ...editingTender, category: e.target.value }) : setNewTender({ ...newTender, category: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">State *</label>
                                    <input
                                        type="text" required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-medium"
                                        value={editingTender ? editingTender.state : newTender.state}
                                        onChange={e => editingTender ? setEditingTender({ ...editingTender, state: e.target.value }) : setNewTender({ ...newTender, state: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Description</label>
                                <textarea
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-medium min-h-[100px]"
                                    value={editingTender ? editingTender.description : newTender.description}
                                    onChange={e => editingTender ? setEditingTender({ ...editingTender, description: e.target.value }) : setNewTender({ ...newTender, description: e.target.value })}
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t border-gray-50">
                                <button type="button" onClick={() => { setIsModalOpen(false); setEditingTender(null); }} className="px-6 py-3 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-2xl transition-all">Cancel</button>
                                <button type="submit" className="px-8 py-3 bg-[#0a0f1c] text-white font-black text-sm rounded-2xl hover:bg-emerald-500 transition-all shadow-xl shadow-black/10">
                                    {editingTender ? 'Update Tender' : 'Create Tender'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
