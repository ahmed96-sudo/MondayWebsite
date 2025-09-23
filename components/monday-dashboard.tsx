"use client"

import { useState } from "react"
// import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  Users,
  MoreHorizontal,
  Plus,
  ChevronDown,
  Settings,
  HelpCircle,
  Grid3X3,
  User,
  Home,
  Briefcase,
  Calendar,
  Target,
  BarChart3,
  Bell,
  MessageSquare,
  Zap,
  Share2,
  Clock
} from "lucide-react"

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
  // const [searchQuery, setSearchQuery] = useState("")
  const [tablesopen, setTablesopen] = useState([true, true, true]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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


  return (
    <div className="flex h-screen bg-gray-50">
      {/* Top notification bar */}
      {/* <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white px-4 py-2 text-sm flex items-center justify-between z-50">
        <span>Enable desktop notifications on this computer</span>
        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            Enable now
          </Button>
          <button className="text-gray-300 hover:text-white">×</button>
        </div>
      </div> */}

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
              {/* <ChevronDown className="w-4 h-4 text-gray-400" /> */}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {/* <Bell className="w-5 h-5 text-gray-400" />
                <div className="relative">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">1</span>
                  </div>
                </div>
                <MessageSquare className="w-5 h-5 text-gray-400" />
                <User className="w-5 h-5 text-gray-400" />
                <Zap className="w-5 h-5 text-gray-400" />
                <BarChart3 className="w-5 h-5 text-gray-400" />
                <Search className="w-5 h-5 text-gray-400" />
                <HelpCircle className="w-5 h-5 text-gray-400" />
                <Share2 className="w-5 h-5 text-gray-400" />
                <Grid3X3 className="w-5 h-5 text-gray-400" /> */}
              </div>
              {/* <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 bg-transparent">
                <Target className="w-4 h-4 mr-1" />
                Sidekick
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-1" />
                Integrate
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-1" />
                Automate
              </Button>
              <div className="flex items-center gap-1">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-red-500 text-white text-xs">AS</AvatarFallback>
                </Avatar>
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-blue-500 text-white text-xs">AN</AvatarFallback>
                </Avatar>
              </div>
              <Button variant="outline" size="sm">
                Invite / 2
              </Button> */}
              <Button variant="outline" size="sm" onClick={() => setIsPopupVisible(true)}>
                <Bell className="w-4 h-4 mr-1" />
                History
              </Button>
              <div className="flex items-center gap-1 cursor-pointer">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-red-500 text-white text-xs">AS</AvatarFallback>
                </Avatar>
                {/* <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-blue-500 text-white text-xs">AN</AvatarFallback>
                </Avatar> */}
              </div>
              <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          {/* <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">Main table</span>
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
              <Plus className="w-4 h-4 text-gray-400" />
            </div>
          </div> */}

          <div className="flex items-center gap-4 relative">
            {/* <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                  New task
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions" className="bg-white border-2 shadow-2xl rounded-lg w-[130px]">
                <DropdownItem key="new">New file</DropdownItem>
                <DropdownItem key="copy">Copy link</DropdownItem>
                <DropdownItem key="edit">Edit file</DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger">
                  Delete file
                </DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
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
                    New Table
                  </a>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              {/* <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search"
                  className="pl-9 w-48"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-1" />
                Person
              </Button> */}
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-1" />
                Filter
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
              {/* <Button variant="outline" size="sm">
                <ArrowUpDown className="w-4 h-4 mr-1" />
                Sort
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-1" />
                Hide
              </Button>
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-1" />
                Group by
              </Button>
              <MoreHorizontal className="w-4 h-4 text-gray-400" /> */}
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-full">

            {/* Task Groups */}
            {tasks.map((group) => (

              <div key={group.id} className="border-b border-gray-200">
                {/* Group Header */}
                <div className={`border-l-4 ${getGroupHeaderColor(group.color)} bg-gray-50 px-6 py-3`}>
                  <div className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-900">{group.name}</span>
                  </div>
                </div>
                {/* Table Headers */}
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
                  <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 tracking-wider border-collapse grid-flow-col">
                    <div className="flex items-center">
                      <Checkbox/>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      {/* <Checkbox /> */}
                      Element
                    </div>
                    <div>Detaille Commande</div>
                    <div>OPERATEUR</div>
                    <div>Statut</div>
                    <div>Date Design</div>
                    <div>Sortie</div>
                    <div>Payement</div>
                    <div>Date de livraison</div>
                    <div>PRIX</div>
                    <div>AVANCE</div>
                    <div>N recue</div>
                    <div>Phone</div>
                    <div>Last Updated</div>
                    <div>
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
                        <div className="flex items-center gap-2">
                          <Settings className="w-4 h-4 text-gray-400" />
                          <Calendar className="w-4 h-4 text-gray-400" />
                        </div>
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

        {/* Help Button */}
        {/* <div className="fixed bottom-6 right-6">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 p-0">Help</Button>
        </div> */}
      </div>
      <Popup isVisible={isPopupVisible} onClose={() => setIsPopupVisible(false)}>
        {/* Content for the popup */}
        <h2 className="mb-4 text-2xl font-bold text-white">Activity History</h2>
        <div>
          <div className="flex flex-row justify-evenly text-white">
            <div className="flex flex-row ">
              <Clock className="mr-2" />
              <span>2d</span>
            </div>
            <div>
              Date1
            </div>
            <div>
              Ahmed Saeed
            </div>
          </div>
          {/* <p className="text-gray-300">
            This is the content you can pass into the popup component. You can add text, forms, or any other JSX here.
          </p> */}
        </div>
      </Popup>
    </div>
  )
}
