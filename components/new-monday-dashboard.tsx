"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Filter,
    MoreHorizontal,
    Plus,
    ChevronDown,
    Settings,
    Calendar,
    Bell,
    Clock
} from "lucide-react"
import { MondayFilter } from "./monday-filter"

interface Task {
    id: string
    name: string
    admin: string
    status: "Pas commencé" | "En cours" | "Fait" | "Bloqué"
    echeance?: string
    date?: string
    date1?: string
    descr?: string
    date2?: string
    menuDeroulant?: string
    statut1?: string
    checked?: boolean
}

interface TaskGroup {
    id: string
    name: string
    color: "yellow" | "blue" | "green"
    tasks: Task[]
}

interface PopupProps {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Popup = ({ isVisible, onClose, children }: PopupProps) => {
    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-2xl transition-transform duration-300 ease-in-out transform scale-100 opacity-100"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 rounded-full bg-gray-700 p-1 text-gray-400 transition-colors hover:bg-gray-600 hover:text-white cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6L6 18" />
                        <path d="M6 6L18 18" />
                    </svg>
                </button>
                {children}
            </div>
        </div>
    );
};


const mockData: TaskGroup[] = [
    {
        id: "1",
        name: "Nouveau groupe",
        color: "yellow",
        tasks: [
            {
                id: "1",
                name: "Ajouter tâche",
                admin: "",
                status: "Pas commencé",
                descr: "dvfsfsd",
                menuDeroulant: "ayman",
                statut1: "+2",
                checked: false,
            },
            {
                id: "2",
                name: "Ajouter tâche",
                admin: "",
                status: "Pas commencé",
                checked: false,
            },
        ],
    },
    {
        id: "2",
        name: "youssef",
        color: "blue",
        tasks: [
            {
                id: "3",
                name: "Ajouter tâche",
                admin: "",
                status: "Pas commencé",
                date: "Sep 18",
                date1: "Sep 13",
                checked: false,
            },
            {
                id: "4",
                name: "Ajouter tâche",
                admin: "",
                status: "Pas commencé",
                checked: false,
            },
            {
                id: "5",
                name: "Ajouter tâche",
                admin: "",
                status: "Pas commencé",
                checked: false,
            },
            {
                id: "6",
                name: "project 1",
                admin: "AD",
                status: "En cours",
                echeance: "Sep 17",
                checked: false,
            },
            {
                id: "7",
                name: "Tache 2",
                admin: "",
                status: "Fait",
                echeance: "Sep 18",
                checked: false,
            },
            {
                id: "8",
                name: "Tache 3",
                admin: "",
                status: "Bloqué",
                echeance: "Sep 19",
                checked: false,
            },
        ],
    },
    {
        id: "3",
        name: "ahmed",
        color: "green",
        tasks: [],
    },
]


export function MondayDashboard() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [tablesopen, setTablesopen] = useState([true, true, true]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [tasks, setTasks] = useState(mockData)

    const handleTaskCheck = (groupId: string, taskId: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((group) =>
                group.id === groupId
                    ? {
                        ...group,
                        tasks: group.tasks.map((task) => (task.id === taskId ? { ...task, checked: !task.checked } : task)),
                    }
                    : group,
            ),
        )
    }

    const getStatusBadge = (status: Task["status"]) => {
        switch (status) {
            case "Pas commencé":
                return (
                    <Badge variant="secondary" className="bg-gray-200 text-gray-700 hover:bg-gray-200 rounded-sm">
                        Pas commencé
                    </Badge>
                )
            case "En cours":
                return <Badge className="bg-orange-500 text-white hover:bg-orange-500 rounded-sm">En cours</Badge>
            case "Fait":
                return <Badge className="bg-green-500 text-white hover:bg-green-500 rounded-sm">Fait</Badge>
            case "Bloqué":
                return <Badge className="bg-red-500 text-white hover:bg-red-500 rounded-sm">Bloqué</Badge>
            default:
                return <Badge variant="secondary">-</Badge>
        }
    }

    const getGroupHeaderColor = (color: TaskGroup["color"]) => {
        switch (color) {
            case "yellow":
                return "border-l-yellow-400"
            case "blue":
                return "border-l-blue-500"
            case "green":
                return "border-l-green-500"
            default:
                return "border-l-gray-400"
        }
    }

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleFilterToggle = () => {
        setIsFilterOpen(!isFilterOpen);
    };


    return (
        <div className="flex h-screen bg-gray-50">

            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
                {/* Logo */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Monday</span>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 p-4">

                    <div className="mt-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Items</span>
                            <div className="flex items-center gap-1">
                                <Plus className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="space-y-1">
                                <div className="flex flex-row justify-between items-center">
                                    <a
                                        href="#"
                                        className="flex items-center gap-2 px-2 py-1 text-sm text-blue-600 bg-blue-50 rounded font-medium"
                                    >
                                        <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                                        <span>tst</span>
                                    </a>
                                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <a
                                        href="#"
                                        className="flex items-center gap-2 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                                    >
                                        <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                                        <span>Tableau de bord et reporting</span>
                                    </a>
                                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-semibold text-gray-900">tst</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="sm" onClick={() => setIsPopupVisible(true)}>
                                <Bell className="w-4 h-4 mr-1" />
                                History
                            </Button>
                            <div className="flex items-center gap-1 cursor-pointer">
                                <Avatar className="w-6 h-6">
                                    <AvatarFallback className="bg-red-500 text-white text-xs">AS</AvatarFallback>
                                </Avatar>
                            </div>
                            <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
                        </div>
                    </div>
                </div>

                {/* Table Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4">

                    <div className="flex items-center gap-4 relative">
                        <Button onClick={handleDropdownToggle} className="bg-blue-600 hover:bg-blue-700 text-white">
                            New task
                            <ChevronDown className={`w-4 h-4 ml-1 transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </Button>
                        {isDropdownOpen && (
                            <div className="absolute left-0 top-10 w-[115px] rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="py-1">
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        New task
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        New Group of Tasks
                                    </a>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center gap-2 relative">
                            <Button onClick={handleFilterToggle} variant="outline" size="sm">
                                <Filter className="w-4 h-4 mr-1" />
                                Filter
                                <ChevronDown className={`w-4 h-4 ml-1 transform transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                            </Button>
                            {isFilterOpen && (
                                <div className="absolute left-0 top-10">
                                    <MondayFilter onClose={() => handleFilterToggle()} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Table Content */}
                <div className="flex-1 w-full overflow-auto">

                    {/* Task Groups */}
                    {tasks.map((group) => (

                        <div key={group.id} className="border-b border-gray-200 flex flex-col flex-1 overflow-x-auto">
                            {/* Group Header */}
                            <div className={`border-l-4 ${getGroupHeaderColor(group.color)} bg-gray-50 px-6 py-3`}>
                                <div className="flex items-center gap-2">
                                    <ChevronDown className="w-4 h-4 text-gray-600" />
                                    <span className="font-medium text-gray-900">{group.name}</span>
                                </div>
                            </div>
                            {/* Table Headers */}
                            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 w-[1600px] overflow-x-auto whitespace-nowrap flex">
                                <div className="text-sm font-medium text-gray-500 tracking-wider flex flex-row">
                                    <div className="flex items-center w-[30px]">
                                        <Checkbox />
                                    </div>
                                    <div className="w-[350px] border-r-2">
                                        {/* <Checkbox /> */}
                                        Element
                                    </div>
                                    <div className="w-[250px] ml-0.5 border-r-2 flex justify-center">Detaille Commande</div>
                                    <div className="w-[150px] ml-0.5 border-r-2 flex justify-center">Operateur</div>
                                    <div className="w-[100px] ml-0.5 border-r-2 flex justify-center">Statut</div>
                                    <div className="w-[200px] ml-0.5 border-r-2 flex justify-center">Date Design</div>
                                    <div className="w-[150px] ml-0.5 border-r-2 flex justify-center">Sortie</div>
                                    <div className="w-[150px] ml-0.5 border-r-2 flex justify-center">Payement</div>
                                    <div className="w-[200px] ml-0.5 border-r-2 flex justify-center">Date de livraison</div>
                                    <div className="w-[150px] ml-0.5 border-r-2 flex justify-center">Prix</div>
                                    <div className="w-[200px] ml-0.5 border-r-2 flex justify-center">Avance</div>
                                    <div className="w-[200px] ml-0.5 border-r-2 flex justify-center">N recue</div>
                                    <div className="w-[200px] ml-0.5 border-r-2 flex justify-center">Phone</div>
                                    <div className="w-[200px] ml-0.5 border-r-2 flex justify-center">Last Updated</div>
                                    <div className="w-[100px] ml-0.5 flex justify-center">
                                        <Plus className="w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Group Tasks */}
                            {group.tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className={`border-l-4 ${getGroupHeaderColor(group.color)} bg-white hover:bg-gray-50`}
                                >
                                    <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                                        <div className="col-span-2 flex items-center gap-2">
                                            <Checkbox checked={task.checked} onCheckedChange={() => handleTaskCheck(group.id, task.id)} />
                                            <span className="text-sm text-gray-900">{task.name}</span>
                                        </div>
                                        <div>
                                            {task.admin && (
                                                <Avatar className="w-6 h-6">
                                                    <AvatarFallback className="bg-blue-500 text-white text-xs">{task.admin}</AvatarFallback>
                                                </Avatar>
                                            )}
                                        </div>
                                        <div>{getStatusBadge(task.status)}</div>
                                        <div className="text-sm text-gray-600">{task.echeance || ""}</div>
                                        <div className="text-sm text-gray-600">{task.date || ""}</div>
                                        <div className="text-sm text-gray-600">{task.date1 || ""}</div>
                                        <div className="text-sm text-gray-600">{task.descr || ""}</div>
                                        <div className="text-sm text-gray-600">{task.date2 || ""}</div>
                                        <div className="text-sm text-gray-600">
                                            {task.menuDeroulant && (
                                                <Badge className="bg-gray-800 text-white hover:bg-gray-800 rounded-sm">
                                                    {task.menuDeroulant}
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {task.statut1 && (
                                                <Badge className="bg-gray-800 text-white hover:bg-gray-800 rounded-sm">{task.statut1}</Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Add Task Row */}
                            <div className={`border-l-4 ${getGroupHeaderColor(group.color)} bg-white`}>
                                <div className="px-6 py-4">
                                    <button className="text-sm text-gray-500 hover:text-gray-700">+ Add task</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Popup isVisible={isPopupVisible} onClose={() => setIsPopupVisible(false)}>
                {/* Content for the popup */}
                <h2 className="mb-4 text-2xl font-bold text-white">Activity History</h2>
                <div className="flex flex-col justify-center">
                    <div className="flex flex-row justify-evenly text-white mb-2">
                        <div className="flex flex-row ">
                            <Clock className="mr-2" />
                            <span>2d</span>
                        </div>
                        <div>
                            Data
                        </div>
                        <div>
                            Ahmed Saeed
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly text-white mb-2">
                        <div className="flex flex-row ">
                            <Clock className="mr-2" />
                            <span>2d</span>
                        </div>
                        <div>
                            Data
                        </div>
                        <div>
                            Ahmed Saeed
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly text-white mb-2">
                        <div className="flex flex-row ">
                            <Clock className="mr-2" />
                            <span>2d</span>
                        </div>
                        <div>
                            Data
                        </div>
                        <div>
                            Ahmed Saeed
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    )
}
