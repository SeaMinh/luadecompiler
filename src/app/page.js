"use client";
import React, { useState, useRef } from "react";
import { Play, Upload, Copy, Download, Code2 } from "lucide-react";

export default function LuaDecompiler() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [isDecompiling, setIsDecompiling] = useState(false);
  const fileInputRef = useRef(null);

  const handleRun = () => {
    if (!inputCode.trim()) return;
    setIsDecompiling(true);
    
    // Giả lập quá trình giải mã trong 800ms
    setTimeout(() => {
      setOutputCode(`-- Decompiled by Lua Tool\n-- Timestamp: ${new Date().toLocaleString()}\n\nlocal function main()\n    print("Hello World")\n    for i=1, 10 do\n        print("Counting: " .. i)\n    end\nend\n\nmain()`);
      setIsDecompiling(false);
    }, 800);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setInputCode(event.target.result);
      reader.readAsText(file);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputCode);
    alert("Đã sao chép vào bộ nhớ tạm!");
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-950 text-gray-200">
      {/* Header */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-gray-900/50">
        <div className="flex items-center gap-2">
          <Code2 className="text-blue-500" />
          <span className="font-bold tracking-wider text-xl">LUA <span className="text-blue-500">DECOMPILER</span></span>
        </div>
        <div className="text-xs text-gray-500 font-mono">v1.0.0-stable</div>
      </nav>

      {/* Toolbar & Editors */}
      <main className="flex flex-1 overflow-hidden p-4 gap-4">
        
        {/* CỘT TRÁI */}
        <div className="flex-1 flex flex-col min-w-0 bg-gray-900 rounded-lg border border-gray-800 shadow-2xl">
          <div className="p-2 border-b border-gray-800 flex justify-between items-center bg-gray-800/30">
            <span className="text-xs font-semibold px-3 text-gray-400 uppercase tracking-widest">Input (Bytecode)</span>
            <div className="flex gap-2">
              <button 
                onClick={() => fileInputRef.current.click()}
                className="flex items-center gap-2 px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 active:scale-95 transition-all rounded shadow-md"
              >
                <Upload size={14} /> Upload
              </button>
              <button 
                onClick={handleRun}
                disabled={isDecompiling}
                className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded shadow-md transition-all active:scale-95 ${
                  isDecompiling ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-500 text-white"
                }`}
              >
                <Play size={14} fill="currentColor" /> {isDecompiling ? "RUNNING..." : "RUN"}
              </button>
            </div>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
          <textarea
            className="flex-1 p-4 bg-transparent font-mono text-sm outline-none resize-none overflow-auto whitespace-pre custom-scrollbar"
            placeholder="Paste your Lua bytecode here..."
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            wrap="off"
            spellCheck="false"
          />
        </div>

        {/* CỘT PHẢI */}
        <div className="flex-1 flex flex-col min-w-0 bg-gray-900 rounded-lg border border-gray-800 shadow-2xl">
          <div className="p-2 border-b border-gray-800 flex justify-between items-center bg-gray-800/30">
            <span className="text-xs font-semibold px-3 text-gray-400 uppercase tracking-widest">Output (Source)</span>
            <div className="flex gap-2">
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 active:scale-95 transition-all rounded shadow-md"
              >
                <Copy size={14} /> Copy
              </button>
              <button 
                onClick={() => {
                  const blob = new Blob([outputCode], { type: "text/plain" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "decompiled.lua";
                  a.click();
                }}
                className="flex items-center gap-2 px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all rounded shadow-md text-white"
              >
                <Download size={14} /> Download
              </button>
            </div>
          </div>
          <textarea
            className="flex-1 p-4 bg-transparent font-mono text-sm outline-none resize-none overflow-auto whitespace-pre text-green-400 custom-scrollbar"
            value={outputCode}
            readOnly
            wrap="off"
            placeholder="Decompiled code will appear here..."
            spellCheck="false"
          />
        </div>

      </main>

      {/* Footer */}
      <footer className="px-6 py-2 border-t border-gray-800 text-[10px] text-gray-600 flex justify-between">
        <div>Ready to decompile</div>
        <div>UTF-8 | Lua 5.1/5.3/5.4 Support</div>
      </footer>
    </div>
  );
}
