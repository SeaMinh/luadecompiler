"use client";
import React, { useState, useRef } from "react";
import { Play, Copy, Download, Upload, Cpu, Zap } from "lucide-react";
import { fullDecompile } from "../utils/luaDecompiler";

export default function LuaPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const handleRun = () => {
    if (!input) return;
    setLoading(true);
    setTimeout(() => {
      setOutput(fullDecompile(input));
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-white p-6 md:p-10 font-sans">
      {/* Header Chuyên nghiệp */}
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
            <Cpu size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter">LUA <span className="text-blue-500">DECOMPILER</span></h1>
            <p className="text-zinc-500 text-sm font-mono italic">Advanced Heuristic Engine v3.0</p>
          </div>
        </div>
        
        <button 
          onClick={handleRun}
          className="hidden md:flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black text-lg hover:bg-blue-500 hover:text-white transition-all active:scale-90 shadow-xl"
        >
          <Play fill="currentColor" size={20} /> RUN ENGINE
        </button>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 h-[70vh]">
        
        {/* Khung Trái - Input */}
        <div className="bg-[#111115] rounded-[40px] border border-white/5 flex flex-col overflow-hidden shadow-inner">
          <div className="p-6 flex justify-between items-center border-b border-white/5 bg-white/[0.02]">
            <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
              <Zap size={14} className="text-yellow-500" /> Raw Bytecode
            </span>
            <button onClick={() => fileRef.current.click()} className="p-3 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
              <Upload size={18} />
            </button>
          </div>
          <textarea
            className="flex-1 p-8 bg-transparent font-mono text-base outline-none resize-none custom-scroll text-blue-300/60 leading-relaxed"
            wrap="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your hex/bytecode here..."
          />
        </div>

        {/* Khung Phải - Output */}
        <div className="bg-[#111115] rounded-[40px] border border-white/5 flex flex-col overflow-hidden shadow-2xl ring-1 ring-blue-500/20">
          <div className="p-6 flex justify-between items-center border-b border-white/5 bg-white/[0.02]">
            <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Reconstructed Source</span>
            <div className="flex gap-3">
              <button onClick={() => {navigator.clipboard.writeText(output); alert("Copied!")}} className="p-3 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
                <Copy size={18} />
              </button>
              <button className="p-3 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
                <Download size={18} />
              </button>
            </div>
          </div>
          <textarea
            className={`flex-1 p-8 bg-transparent font-mono text-base outline-none resize-none custom-scroll leading-relaxed transition-all duration-700 ${
              loading ? "opacity-20 blur-sm" : "opacity-100 text-emerald-400"
            }`}
            readOnly
            wrap="off"
            value={output}
            placeholder="System waiting for analysis..."
          />
        </div>
      </main>

      {/* Mobile Run Button */}
      <div className="md:hidden mt-6 text-center">
         <button onClick={handleRun} className="w-full bg-blue-600 p-5 rounded-2xl font-bold">RUN</button>
      </div>

      <input type="file" ref={fileRef} className="hidden" onChange={(e) => {
        const r = new FileReader();
        r.onload = (ev) => setInput(ev.target.result);
        r.readAsText(e.target.files[0]);
      }} />

      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar { width: 12px; height: 12px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #222; border-radius: 100px; border: 4px solid #111115; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
      `}</style>
    </div>
  );
}
