"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronRight, X } from "lucide-react"

interface FilterItem {
    id: string
    name: string
    count: number
    color?: string
}

interface FilterSection {
    title: string
    items: FilterItem[]
}

export function MondayFilter({ onClose }: { onClose?: () => void }) {
    const [activeFilters, setActiveFilters] = useState<string[]>([])

    const recentFilters: FilterSection = {
        title: "Recent filters",
        items: [{ id: "group", name: "Group", count: 0 }],
    }

    const groupFilters: FilterItem[] = [
        { id: "top-group", name: "Top group", count: 2, color: "bg-gray-400" },
        { id: "nouveau-gr", name: "Nouveau gr...", count: 2, color: "bg-yellow-400" },
        { id: "youssef", name: "youssef", count: 6, color: "bg-blue-500" },
        { id: "ahmed", name: "ahmed", count: 1, color: "bg-green-500" },
        { id: "ayman", name: "ayman", count: 0, color: "bg-purple-500" },
    ]

    const allColumnsData = {
        group: [
            { id: "top-group-col", name: "Top group", count: 2, color: "bg-gray-400" },
            { id: "nouveau-gr-col", name: "Nouveau gr...", count: 2, color: "bg-yellow-400" },
            { id: "youssef-col", name: "youssef", count: 6, color: "bg-blue-500" },
            { id: "ahmed-col", name: "ahmed", count: 1, color: "bg-green-500" },
            { id: "ayman-col", name: "ayman", count: 0, color: "bg-purple-500" },
        ],
        nom: [
            { id: "ajouter-tache", name: "Ajouter tâche", count: 5 },
            { id: "project-1", name: "project 1", count: 1 },
            { id: "tache-2", name: "Tâche 2", count: 1 },
            { id: "tache-3", name: "Tâche 3", count: 1 },
            { id: "project-5", name: "project 5", count: 1 },
        ],
        admin: [
            { id: "me-dynamic", name: "Me (dynamic)", count: 0, avatar: "M" },
            { id: "ayman-dou", name: "Ayman Dou...", count: 1, avatar: "AD" },
            { id: "unassigned", name: "Unassigned", count: 8 },
        ],
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-[800px] max-h-[500px] overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-medium text-gray-900">Quick filters</h3>
                        <p className="text-xs text-gray-500 mt-1">Showing all of 9 tasks</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-gray-500 text-xs">
                            Clear all
                        </Button>
                        {onClose && (
                            <Button variant="ghost" size="sm" onClick={onClose}>
                                <X className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex">
                {/* Left Panel - Recent Filters */}
                <div className="w-48 border-r border-gray-200 p-4">
                    <h4 className="text-xs font-medium text-gray-700 mb-3">{recentFilters.title}</h4>

                    {/* Group Section */}
                    <div className="mb-4">
                        <div className="text-xs font-medium text-gray-700 mb-2">Group</div>
                        <div className="space-y-1">
                            {groupFilters.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between py-1 px-2 hover:bg-gray-50 rounded text-xs"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                                        <span className="text-gray-700">{item.name}</span>
                                    </div>
                                    <span className="text-gray-500">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel - All Columns */}
                <div className="flex-1 p-4">
                    <h4 className="text-xs font-medium text-gray-700 mb-3">All columns</h4>

                    <div className="flex gap-6">
                        {/* Group Column */}
                        <div className="flex-1">
                            <div className="text-xs font-medium text-gray-700 mb-2">Group</div>
                            <div className="space-y-1">
                                {allColumnsData.group.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between py-1 px-2 hover:bg-gray-50 rounded text-xs"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                                            <span className="text-gray-700">{item.name}</span>
                                        </div>
                                        <span className="text-gray-500">{item.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Nom Column */}
                        <div className="flex-1">
                            <div className="text-xs font-medium text-gray-700 mb-2">Nom</div>
                            <div className="space-y-1">
                                {allColumnsData.nom.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between py-1 px-2 hover:bg-gray-50 rounded text-xs"
                                    >
                                        <span className="text-gray-700">{item.name}</span>
                                        <span className="text-gray-500">{item.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Admin Column */}
                        <div className="flex-1">
                            <div className="text-xs font-medium text-gray-700 mb-2">Admin</div>
                            <div className="space-y-1">
                                {allColumnsData.admin.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between py-1 px-2 hover:bg-gray-50 rounded text-xs"
                                    >
                                        <div className="flex items-center gap-2">
                                            {item.avatar ? (
                                                <Avatar className="w-4 h-4">
                                                    <AvatarFallback className="bg-blue-500 text-white text-[8px]">{item.avatar}</AvatarFallback>
                                                </Avatar>
                                            ) : (
                                                <div className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
                                                    <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                                </div>
                                            )}
                                            <span className="text-gray-700">{item.name}</span>
                                        </div>
                                        <span className="text-gray-500">{item.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Status Column (partially visible) */}
                        <div className="w-16">
                            <div className="text-xs font-medium text-gray-700 mb-2">St...</div>
                            <div className="flex items-center">
                                <ChevronRight className="w-3 h-3 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
                <button className="text-xs text-blue-600 hover:text-blue-700">Switch to advanced filters</button>
            </div>
        </div>
    )
}
