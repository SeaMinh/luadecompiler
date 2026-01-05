"use client";
import React, { useState } from "react";
import { Play, Copy, Terminal, Zap, Code2, Layers, Cpu } from "lucide-react";
import { fullDecompile } from "../utils/luaDecompiler";

export default function MetawormPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const startEngine = () => {
        if (!input) return;
        setLoading(true);
        setTimeout(() => {
            setOutput(fullDecompile(input));
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#020203] text-zinc-400 p-4 md:p-10 font-sans">
            {/* Header: Cực bự và hiện đại */}
            <div className="max-w-[1600px] mx-auto bg-[#0a0a0e] rounded-[45px] p-8 border border-white/5 flex flex-col md:flex-row items-center justify-between shadow-2xl mb-8 ring-1 ring-white/5">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-[30px] flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.2)] animate-pulse">
                        <Code2 size={40} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tighter uppercase">LUA<span className="text-blue-500">DEC</span></h1>
                        <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500 mt-1 flex items-center gap-2">
                           <Cpu size={12} /> Multi-Pattern Recognition Engine v5.0
                        </p>
                    </div>
                </div>
                <button 
                    onClick={startEngine}
                    disabled={loading}
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-400 text-white px-16 py-7 rounded-full font-black text-xl flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-blue-600/30 disabled:opacity-50"
                >
                    {loading ? "ANALYZING OPCODES..." : <><Play fill="currentColor" /> DECOMPILE NOW</>}
                </button>
            </div>

            {/* Editor Grid */}
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 h-[72vh]">
                
                {/* Input Panel */}
                <div className="bg-[#0a0a0e] rounded-[55px] border border-white/5 flex flex-col overflow-hidden group hover:border-blue-500/20 transition-all duration-500 shadow-inner">
                    <div className="px-10 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                        <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
                            <Terminal size={16} /> Raw Bytecode / Binary
                        </span>
                    </div>
                    <textarea 
                        className="flex-1 p-10 bg-transparent font-mono text-lg outline-none resize-none custom-scroll text-blue-400/40 leading-relaxed placeholder:text-zinc-800"
                        placeholder="Drop bytecode file or paste hex data here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        wrap="off"
                        spellCheck="false"
                    />
                </div>

                {/* Output Panel */}
                <div className="bg-[#0a0a0e] rounded-[55px] border border-blue-500/20 flex flex-col overflow-hidden shadow-2xl ring-4 ring-blue-500/5 group">
                    <div className="px-10 py-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                        <span className="flex items-center gap-3 text-blue-500 text-xs font-bold uppercase tracking-widest">
                            <Layers size={16} /> Reconstructed Lua Source
                        </span>
                        <button onClick={() => {navigator.clipboard.writeText(output); alert("Source Copied!")}} className="p-4 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-all active:scale-90">
                            <Copy size={20} />
                        </button>
                    </div>
                    <textarea 
                        className={`flex-1 p-10 bg-transparent font-mono text-lg outline-none resize-none custom-scroll text-emerald-400 leading-relaxed transition-all duration-1000 ${loading ? "opacity-10 blur-2xl" : "opacity-100"}`}
                        readOnly
                        value={output}
                        placeholder="The decompiled script will appear here with full logic reconstruction..."
                        wrap="off"
                    />
                </div>
            </div>

            <style jsx global>{`
                .custom-scroll::-webkit-scrollbar { width: 10px; height: 10px; }
                .custom-scroll::-webkit-scrollbar-thumb { background: #1a1a1e; border-radius: 50px; border: 3px solid #0a0a0e; }
                .custom-scroll::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
                textarea { white-space: pre !important; }
            `}</style>
        </div>
    );
}
