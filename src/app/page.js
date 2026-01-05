"use client";
import React, { useState } from "react";
import { Play, Copy, Shield, Terminal, Zap } from "lucide-react";
import { fullDecompile } from "../utils/luaDecompiler";

export default function LuaPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const runAction = () => {
        if (!input) return;
        setLoading(true);
        // Hiệu ứng "Analyzing"
        setTimeout(() => {
            const res = fullDecompile(input);
            setOutput(res);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-300 p-8 md:p-16">
            <div className="max-w-7xl mx-auto space-y-10">
                
                {/* Header bự tròn */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-[#0f0f12] p-8 rounded-[40px] border border-white/5 shadow-2xl">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-blue-600 rounded-[30px] flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.4)]">
                            <Shield size={40} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-white tracking-tighter">UNLUAC <span className="text-blue-500">PRO</span></h1>
                            <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Self-Written Decompiler Engine v4.0</p>
                        </div>
                    </div>
                    <button 
                        onClick={runAction}
                        className="group flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full font-black text-xl hover:bg-blue-600 hover:text-white transition-all active:scale-90 shadow-xl"
                    >
                        <Play fill="currentColor" className="group-hover:animate-pulse" /> START RECONSTRUCT
                    </button>
                </div>

                {/* Editor Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Input */}
                    <div className="flex flex-col bg-[#0f0f12] rounded-[50px] border border-white/5 overflow-hidden ring-1 ring-white/5">
                        <div className="px-10 py-6 border-b border-white/5 flex items-center gap-3 bg-white/[0.01]">
                            <Terminal size={18} className="text-zinc-500" />
                            <span className="text-sm font-bold uppercase tracking-widest text-zinc-500">Binary Input</span>
                        </div>
                        <textarea 
                            className="flex-1 min-h-[500px] p-10 bg-transparent font-mono text-lg outline-none resize-none custom-scroll text-blue-400/60 leading-relaxed"
                            placeholder="Paste your bytecode here..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            wrap="off"
                            spellCheck="false"
                        />
                    </div>

                    {/* Output */}
                    <div className="flex flex-col bg-[#0f0f12] rounded-[50px] border border-blue-500/20 overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.05)] ring-1 ring-blue-500/20">
                        <div className="px-10 py-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                            <div className="flex items-center gap-3 text-blue-500">
                                <Zap size={18} />
                                <span className="text-sm font-bold uppercase tracking-widest">Lua Source Code</span>
                            </div>
                            <button onClick={() => {navigator.clipboard.writeText(output); alert("Copied!")}} className="p-3 hover:bg-white/5 rounded-full transition-all">
                                <Copy size={20} />
                            </button>
                        </div>
                        <textarea 
                            className={`flex-1 min-h-[500px] p-10 bg-transparent font-mono text-lg outline-none resize-none custom-scroll text-emerald-400 leading-relaxed transition-all duration-1000 ${loading ? "opacity-10 blur-md" : "opacity-100"}`}
                            readOnly
                            value={output}
                            placeholder="Reconstructed Lua will appear here..."
                            wrap="off"
                            spellCheck="false"
                        />
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .custom-scroll::-webkit-scrollbar { width: 10px; height: 10px; }
                .custom-scroll::-webkit-scrollbar-thumb { background: #222; border-radius: 50px; }
                .custom-scroll::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
                textarea { white-space: pre !important; }
            `}</style>
        </div>
    );
}
