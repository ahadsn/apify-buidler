import React from 'react'
import { useBuilderStore } from '../store/builder.store';
import { BuilderActions } from '../actions/builder.actions';
import { ChevronRight, ChevronDown, MoreVertical, Copy, EyeOff, Trash2, Layers, Search, Filter, X } from 'lucide-react';

function ElementTree() {
    const [collapsed, setCollapsed] = React.useState<Set<string>>(new Set());
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filterType, setFilterType] = React.useState('all');
    const [showActions, setShowActions] = React.useState<string | null>(null);
    const [showFilters, setShowFilters] = React.useState(false);

    const {
        elements,
        selectedId,
    } = useBuilderStore();

    const handleClick = (id: string) => {
        BuilderActions.selectElement(id);
    }

    const toggleCollapse = (id: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCollapsed(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    }

    const expandAll = () => {
        setCollapsed(new Set());
    }

    const collapseAll = () => {
        const allIds = new Set<string>();
        const collectIds = (els: any[]) => {
            els.forEach(el => {
                if (el.children && el.children.length > 0) {
                    allIds.add(el.id);
                    collectIds(el.children);
                }
            });
        };
        if (elements) collectIds(elements);
        setCollapsed(allIds);
    }

    const getIcon = (type: string) => {
        const icons: Record<string, string> = {
            container: 'C', text: 'T', heading: 'H', button: 'B',
            image: 'I', hero: 'H', grid: 'G'
        };
        return icons[type] || 'E';
    }

    const getIconColor = (type: string) => {
        const colors: Record<string, string> = {
            container: 'bg-gradient-to-br from-purple-500 via-purple-600 to-fuchsia-600',
            text: 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600',
            heading: 'bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600',
            button: 'bg-gradient-to-br from-orange-500 via-orange-600 to-red-600',
            image: 'bg-gradient-to-br from-pink-500 via-pink-600 to-rose-600',
            hero: 'bg-gradient-to-br from-yellow-500 via-amber-600 to-orange-600',
            grid: 'bg-gradient-to-br from-cyan-500 via-cyan-600 to-blue-600'
        };
        return colors[type] || 'bg-gradient-to-br from-zinc-600 to-zinc-700';
    }

    const matchesSearch = (element: any): boolean => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        const nameMatch = element.name?.toLowerCase().includes(term);
        const typeMatch = element.type?.toLowerCase().includes(term);
        const contentMatch = element.content?.toLowerCase().includes(term);
        const childMatch = element.children?.some((child: any) => matchesSearch(child));
        return nameMatch || typeMatch || contentMatch || childMatch;
    }

    const matchesFilter = (element: any): boolean => {
        if (filterType === 'all') return true;
        return element.type === filterType;
    }

    const renderElement = (element: any, depth: number = 0) => {
        if (!matchesSearch(element) || !matchesFilter(element)) return null;

        const hasChildren = element.children && element.children.length > 0;
        const isCollapsed = collapsed.has(element.id);
        const isSelected = selectedId === element.id;
        const showMenu = showActions === element.id;

        return (
            <div key={element.id} style={{ marginLeft: depth > 0 ? '8px' : '0' }}>
                <div
                    onClick={() => handleClick(element.id)}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        setShowActions(showMenu ? null : element.id);
                    }}
                    className={`
                        group flex items-center gap-1.5 px-1.5 py-1 rounded-md cursor-pointer
                        transition-all duration-150 relative
                        ${isSelected
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
                            : 'text-zinc-400 hover:bg-zinc-800/70 hover:text-white'
                        }
                    `}
                >
                    {/* Collapse toggle */}
                    {hasChildren ? (
                        <button
                            onClick={(e) => toggleCollapse(element.id, e)}
                            className={`flex-shrink-0 transition-transform duration-150 ${
                                isSelected ? 'text-white' : 'text-zinc-500 hover:text-white'
                            }`}
                        >
                            {isCollapsed ? (
                                <ChevronRight size={12} />
                            ) : (
                                <ChevronDown size={12} />
                            )}
                        </button>
                    ) : (
                        <span className="w-3"></span>
                    )}

                    {/* Icon badge */}
                    <span className={`${getIconColor(element.type)} w-4 h-4 rounded text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0 shadow-sm`}>
                        {getIcon(element.type)}
                    </span>

                    {/* Element name */}
                    <span className={`text-[11px] truncate flex-1 font-medium ${
                        isSelected ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                    }`}>
                        {element.name}
                    </span>

                    {/* Children count badge */}
                    {hasChildren && (
                        <span className={`text-[9px] px-1 py-0.5 rounded-full font-semibold ${
                            isSelected 
                                ? 'bg-white/20 text-white' 
                                : 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-zinc-300'
                        }`}>
                            {element.children.length}
                        </span>
                    )}

                    {/* Quick actions */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowActions(showMenu ? null : element.id);
                        }}
                        className={`opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity ${
                            isSelected ? 'text-white' : 'text-zinc-500 hover:text-white'
                        }`}
                        title="More actions"
                    >
                        <MoreVertical size={12} />
                    </button>

                    {/* Context menu */}
                    {showMenu && (
                        <div
                            className="absolute right-0 top-full mt-1 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl z-50 py-0.5 min-w-[120px] backdrop-blur-sm"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="w-full px-2.5 py-1 text-[11px] text-left text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all flex items-center gap-2">
                                <Copy size={11} />
                                Duplicate
                            </button>
                            <button className="w-full px-2.5 py-1 text-[11px] text-left text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all flex items-center gap-2">
                                <Copy size={11} />
                                Copy
                            </button>
                            <button className="w-full px-2.5 py-1 text-[11px] text-left text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all flex items-center gap-2">
                                <EyeOff size={11} />
                                Hide
                            </button>
                            <div className="border-t border-zinc-700/50 my-0.5"></div>
                            <button className="w-full px-2.5 py-1 text-[11px] text-left text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all flex items-center gap-2">
                                <Trash2 size={11} />
                                Delete
                            </button>
                        </div>
                    )}
                </div>

                {/* Children */}
                {hasChildren && !isCollapsed && (
                    <div className="border-l border-zinc-800 ml-1.5 pl-1 mt-0.5">
                        {element.children.map((child: any) => renderElement(child, depth + 1))}
                    </div>
                )}
            </div>
        );
    }

    const elementTypes = React.useMemo(() => {
        const types = new Set<string>();
        const collectTypes = (els: any[]) => {
            els.forEach(el => {
                types.add(el.type);
                if (el.children) collectTypes(el.children);
            });
        };
        if (elements) collectTypes(elements);
        return Array.from(types);
    }, [elements]);

    const hasActiveFilters = searchTerm || filterType !== 'all';

    return (
        <div className='flex flex-col overflow-hidden bg-gradient-to-br from-black via-zinc-950 to-black text-white h-full'>
            {/* Compact Header */}
            <div className="sticky top-0 bg-black/95 backdrop-blur-md z-10 border-b border-zinc-800/50">
                {/* Title Bar */}
                <div className="flex items-center justify-between px-2 py-1.5 md:px-3 md:py-2">
                    <div className="flex items-center gap-1.5">
                        <div className="p-1 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-md">
                            <Layers size={14} className="text-purple-400" />
                        </div>
                        <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                            Elements
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                        {/* Filter toggle button */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`p-1 rounded border transition-all ${
                                hasActiveFilters 
                                    ? 'bg-blue-600 border-blue-500 text-white' 
                                    : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600'
                            }`}
                            title="Toggle filters"
                        >
                            {showFilters ? <X size={12} /> : <Filter size={12} />}
                        </button>
                        
                        {/* Expand/Collapse buttons */}
                        <button
                            onClick={expandAll}
                            className="p-1 bg-zinc-900 hover:bg-zinc-800 rounded border border-zinc-700 text-zinc-400 hover:text-white transition-all"
                            title="Expand all"
                        >
                            <ChevronDown size={11} />
                        </button>
                        <button
                            onClick={collapseAll}
                            className="p-1 bg-zinc-900 hover:bg-zinc-800 rounded border border-zinc-700 text-zinc-400 hover:text-white transition-all"
                            title="Collapse all"
                        >
                            <ChevronRight size={11} />
                        </button>
                    </div>
                </div>

                {/* Collapsible Filters */}
                {showFilters && (
                    <div className="px-2 pb-2 space-y-1.5 md:px-3 animate-in slide-in-from-top-2 duration-200">
                        {/* Search */}
                        <div className="relative">
                            <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-zinc-900 text-white pl-7 pr-2 py-1.5 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 text-[11px] transition-all placeholder-zinc-500"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                                >
                                    <X size={12} />
                                </button>
                            )}
                        </div>

                        {/* Filter */}
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full bg-zinc-900 text-white px-2 py-1.5 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 text-[11px] transition-all"
                        >
                            <option value="all">All Types</option>
                            {elementTypes.map(type => (
                                <option key={type} value={type}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Tree */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-1.5 py-1.5 md:px-2 md:py-2" onClick={() => setShowActions(null)}>
                {elements && elements.length > 0 ? (
                    <div className="space-y-0.5">
                        {elements.map(element => renderElement(element, 0))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="p-2.5 bg-zinc-900 rounded-lg mb-2">
                            <Layers size={20} className="text-zinc-600" />
                        </div>
                        <p className="text-[11px] text-zinc-500 font-medium">No elements</p>
                        <p className="text-[10px] text-zinc-600 mt-0.5">Add elements to start</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ElementTree