"use client";
import React, { useState, useRef } from "react";
import { Play, Copy, Download, Upload, Cpu, Code } from "lucide-react";
import { fullDecompile } from "../utils/luaDecompiler";

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const fileRef = useRef(null);

  const runDecompiler = () => {
    if (!input) return;
    setIsBusy(true);
    // Tạo hiệu ứng trễ để mô phỏng quá trình quét Opcode
    setTimeout(() => {
      setOutput(fullDecompile(input));
      setIsBusy(false);
    }, 1000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(output);
    alert("Copied to clipboard!");
  };

  return (
    <div className="h-screen flex flex-col bg-[#050506] text-zinc-400 font-sans selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-[#0a0a0c] px-6 py-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-600/20">
            <Cpu size={22} className="text-white" />
          </div>
          <h1 className="text-lg font-black tracking-tighter text-white uppercase">
            Lua<span className="text-blue-500">Byte</span>
          </h1>
        </div>
        <div className="text-[10px] font-mono bg-zinc-900 px-3 py-1 rounded-full border border-white/5 text-zinc-500">
          ENGINE: HEURISTIC_V2_STABLE
        </div>
      </nav>

      {/* Editor Grid */}
      <div className="flex-1 flex overflow-hidden p-4 gap-4">
        
        {/* Input Box */}
        <div className="flex-1 flex flex-col bg-[#0a0a0c] border border-white/5 rounded-2xl overflow-hidden ring-1 ring-white/5">
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
              <Code size={14} /> Bytecode Data
            </div>
            <div className="flex gap-2">
              <button onClick={() => fileRef.current.click()} className="btn-icon"><Upload size={14}/></button>
              <button 
                onClick={runDecompiler}
                disabled={isBusy}
                className={`flex items-center gap-2 px-5 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 shadow-lg ${
                  isBusy ? "bg-zinc-800 opacity-50" : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20"
                }`}
              >
                {isBusy ? "PROCESSING..." : "RUN DECOMPILER"}
              </button>
            </div>
          </div>
          <textarea
            className="flex-1 p-6 bg-transparent font-mono text-sm outline-none resize-none overflow-auto whitespace-pre custom-scroll text-blue-400/70"
            wrap="off"
            spellCheck="false"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste raw bytecode here (e.g. \x1bLua...)"
          />
        </div>

        {/* Output Box */}
        <div className="flex-1 flex flex-col bg-[#0a0a0c] border border-white/5 rounded-2xl overflow-hidden ring-1 ring-white/5 shadow-2xl">
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02]">
            <div className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 tracking-widest">
              Decompiled Source
            </div>
            <div className="flex gap-2">
              <button onClick={copyCode} className="btn-icon"><Copy size={14}/></button>
              <button onClick={() => {}} className="btn-icon"><Download size={14}/></button>
            </div>
          </div>
          <textarea
            className="flex-1 p-6 bg-transparent font-mono text-sm outline-none resize-none overflow-auto whitespace-pre custom-scroll text-emerald-400"
            readOnly
            wrap="off"
            value={output}
            placeholder="Waiting for input..."
          />
        </div>
      </div>

      <input type="file" ref={fileRef} className="hidden" onChange={(e) => {
        const reader = new FileReader();
        reader.onload = (ev) => setInput(ev.target.result);
        reader.readAsText(e.target.files[0]);
      }} />

      <style jsx>{`
        .btn-icon {
          @apply p-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-white/5 transition-all active:scale-90;
        }
        .custom-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #1f1f23; border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #2f2f35; }
      `}</style>
    </div>
  );
}
