import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react'
interface sectionProps{
    title:string,
    expanded:any,
    onToggle:any,
    children:any,
}
function Section({ title, expanded, onToggle, children }: sectionProps) {
    return (
        <div className="bg-white/5 rounded-lg border border-white/10">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-3 text-white hover:bg-white/5"
            >
                <span className="font-medium text-sm">{title}</span>
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {expanded && <div className="p-3 space-y-3 border-t border-white/10">{children}</div>}
        </div>
    );
}

export default Section
