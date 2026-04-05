import { Bell, Mail, MessageSquare } from 'lucide-react';

export default function AlertsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 overflow-x-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Tender Alerts</h1>
                    <p className="text-xl text-gray-600">Never miss an opportunity with our smart alert system</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <div className="bg-bid-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="h-8 w-8 text-bid-green" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Email Alerts</h3>
                        <p className="text-gray-600">Get tender notifications directly in your inbox</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <div className="bg-bid-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell className="h-8 w-8 text-bid-green" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Custom Alerts</h3>
                        <p className="text-gray-600">Set up personalized alert criteria</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Configure Your Alerts</h2>
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Alert Frequency</label>
                            <select className="w-full border border-gray-300 rounded-md px-4 py-2">
                                <option>Instant</option>
                                <option>Daily Digest</option>
                                <option>Weekly Summary</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    Construction
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    IT & Software
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    Medical
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    Transportation
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">States</label>
                            <select className="w-full border border-gray-300 rounded-md px-4 py-2">
                                <option>All States</option>
                                <option>Maharashtra</option>
                                <option>Delhi</option>
                                <option>Karnataka</option>
                            </select>
                        </div>
                        <button className="w-full bg-bid-green text-white py-3 rounded-md font-semibold hover:bg-bid-greenhover transition-colors">
                            Save Alert Settings
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
