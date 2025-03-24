
import { FileText, TrendingUp, Users, DollarSign, Package } from "lucide-react"
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts"

// Sample data for charts
const monthlyData = [
    { name: "Jan", requisitions: 65, expenses: 45, approved: 35 },
    { name: "Feb", requisitions: 59, expenses: 40, approved: 30 },
    { name: "Mar", requisitions: 80, expenses: 55, approved: 45 },
    { name: "Apr", requisitions: 81, expenses: 60, approved: 50 },
    { name: "May", requisitions: 56, expenses: 45, approved: 40 },
    { name: "Jun", requisitions: 55, expenses: 40, approved: 35 },
    { name: "Jul", requisitions: 40, expenses: 30, approved: 25 },
    { name: "Aug", requisitions: 70, expenses: 50, approved: 45 },
    { name: "Sep", requisitions: 90, expenses: 70, approved: 60 },
    { name: "Oct", requisitions: 85, expenses: 65, approved: 55 },
    { name: "Nov", requisitions: 95, expenses: 75, approved: 65 },
    { name: "Dec", requisitions: 100, expenses: 80, approved: 70 },
]

const departmentData = [
    { name: "Marketing", value: 35, color: "#3B82F6" },
    { name: "IT", value: 25, color: "#60A5FA" },
    { name: "Finance", value: 20, color: "#93C5FD" },
    { name: "HR", value: 10, color: "#BFDBFE" },
    { name: "Operations", value: 15, color: "#2563EB" },
]

const categoryData = [
    { name: "Fournitures", value: 4000 },
    { name: "Équipement", value: 3000 },
    { name: "Services", value: 2000 },
    { name: "Logiciels", value: 2780 },
    { name: "Matériel", value: 1890 },
]

const statusData = [
    { name: "En attente", count: 24 },
    { name: "En traitement", count: 12 },
    { name: "Approuvé", count: 8 },
    { name: "Rejeté", count: 5 },
]



export default function Dashboard() {

    return (
        <main className="flex-1 p-6 md:ml-20 lg:ml-64">
            <div className="max-w-7xl mx-auto">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                                <FileText size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Réquisitions</p>
                                <div className="flex items-end gap-2">
                                    <p className="text-2xl font-bold text-gray-800">24</p>
                                    <p className="text-sm text-green-600 flex items-center">
                                        <TrendingUp size={14} className="mr-1" />
                                        +12%
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">5 en attente d'approbation</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                                <Package size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Approvisionnement</p>
                                <div className="flex items-end gap-2">
                                    <p className="text-2xl font-bold text-gray-800">12</p>
                                    <p className="text-sm text-green-600 flex items-center">
                                        <TrendingUp size={14} className="mr-1" />
                                        +5%
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-600 rounded-full" style={{ width: "60%" }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">3 à traiter aujourd'hui</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                                <DollarSign size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Comptabilité</p>
                                <div className="flex items-end gap-2">
                                    <p className="text-2xl font-bold text-gray-800">8</p>
                                    <p className="text-sm text-red-600 flex items-center">
                                        <TrendingUp size={14} className="mr-1 transform rotate-180" />
                                        -3%
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-600 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">2 à valider cette semaine</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                                <Users size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Direction</p>
                                <div className="flex items-end gap-2">
                                    <p className="text-2xl font-bold text-gray-800">5</p>
                                    <p className="text-sm text-green-600 flex items-center">
                                        <TrendingUp size={14} className="mr-1" />
                                        +2%
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-600 rounded-full" style={{ width: "30%" }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">1 en attente d'approbation</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Line Chart */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium text-gray-700">Tendances mensuelles</h2>
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                                    <span className="text-xs text-gray-500">Réquisitions</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                                    <span className="text-xs text-gray-500">Approuvées</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                                    <YAxis stroke="#9ca3af" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#fff",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "0.5rem",
                                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="requisitions"
                                        stroke="#3B82F6"
                                        strokeWidth={3}
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6, stroke: "#2563EB", strokeWidth: 2 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="approved"
                                        stroke="#10B981"
                                        strokeWidth={3}
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6, stroke: "#059669", strokeWidth: 2 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium text-gray-700">Dépenses par catégorie</h2>
                            <select className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Cette année</option>
                                <option>Ce mois</option>
                                <option>Cette semaine</option>
                            </select>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={categoryData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                                    <YAxis stroke="#9ca3af" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#fff",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "0.5rem",
                                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                        }}
                                    />
                                    <Bar dataKey="value" fill="#155dfc" radius={[4, 4, 0, 0]}>
                                        {categoryData.map((index: any) => (
                                            <Cell key={`cell-${index}`} fill={`rgba(59, 130, 246, ${0.5 + index * 0.1})`} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Second Row of Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Pie Chart */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-lg font-medium text-gray-700 mb-4">Réquisitions par département</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={departmentData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {departmentData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#fff",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "0.5rem",
                                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            {departmentData.map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-xs text-gray-600">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Area Chart */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-lg font-medium text-gray-700 mb-4">Dépenses mensuelles</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                                    <YAxis stroke="#9ca3af" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#fff",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "0.5rem",
                                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="expenses"
                                        stroke="#3B82F6"
                                        fill="rgba(59, 130, 246, 0.2)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Status Cards */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-lg font-medium text-gray-700 mb-4">Statut des réquisitions</h2>
                        <div className="space-y-4">
                            {statusData.map((status, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                                        {status.count}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-gray-800">{status.name}</h3>
                                        <div className="mt-1 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-600 rounded-full"
                                                style={{
                                                    width: `${(status.count / statusData.reduce((acc, curr) => acc + curr.count, 0)) * 100}%`,
                                                    opacity: 1 - index * 0.2,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="mt-6 w-full py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                            Voir tous les statuts
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

