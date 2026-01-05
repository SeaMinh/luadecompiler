"use client";
import React, { useState, useRef } from "react";

export default function LuaDecompiler() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const fileInputRef = useRef(null);

  // Hàm xử lý khi bấm nút Run (Giả lập Decompiler)
  const handleRun = () => {
    if (!inputCode.trim()) {
      alert("Vui lòng nhập bytecode!");
      return;
    }
    // Chỗ này bạn sẽ gọi logic decompile thực tế hoặc API
    setOutputCode(`-- Decompiled Result --\nfunction hello()\n  print("Hello from Decompiler!")\nend\n\n${inputCode}`);
  };

  // Upload file và đọc nội dung
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setInputCode(event.target.result);
      reader.readAsText(file);
    }
  };

  // Copy nội dung bên phải
  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode);
    alert("Đã copy vào bộ nhớ tạm!");
  };

  // Download nội dung bên phải thành file .lua
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([outputCode], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "decompiled_script.lua";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-blue-400">LUA DECOMPILER</h1>
      </header>

      {/* Main Content: Hai khung chia đôi */}
      <main className="flex flex-1 gap-4 overflow-hidden">
        
        {/* Khung bên trái: Nhập liệu */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex gap-2 mb-2">
            <button 
              onClick={handleRun}
              className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded font-bold transition"
            >
              RUN
            </button>
            <button 
              onClick={() => fileInputRef.current.click()}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded transition"
            >
              Upload File
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
            />
          </div>
          <textarea
            className="flex-1 w-full p-4 bg-gray-800 border border-gray-700 rounded font-mono text-sm resize-none overflow-auto whitespace-pre"
            placeholder="Dán Lua Bytecode vào đây..."
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            wrap="off" // Quan trọng để kéo ngang thay vì xuống dòng
          />
        </div>

        {/* Khung bên phải: Kết quả */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex gap-2 mb-2">
            <button 
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded transition"
            >
              Copy
            </button>
            <button 
              onClick={handleDownload}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-1 rounded transition"
            >
              Download
            </button>
          </div>
          <textarea
            className="flex-1 w-full p-4 bg-gray-800 border border-gray-700 rounded font-mono text-sm text-green-400 resize-none overflow-auto whitespace-pre"
            placeholder="Kết quả sẽ hiển thị ở đây..."
            value={outputCode}
            readOnly
            wrap="off" // Quan trọng để kéo ngang
          />
        </div>
      </main>

      <footer className="mt-4 text-gray-500 text-xs text-center">
        Powered by Next.js & Vercel
      </footer>
    </div>
  );
}
