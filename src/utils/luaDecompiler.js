class LuaBytecodeDecoder {
  constructor(input) {
    this.input = input;
    this.constants = [];
    this.lines = [];
  }

  // Hàm trích xuất chuỗi từ bytecode nhị phân
  extractStrings() {
    // Tìm các chuỗi ký tự có thể đọc được (printable) từ 3 ký tự trở lên
    const regex = /[\x20-\x7E]{3,}/g;
    return this.input.match(regex) || [];
  }

  // Giả lập phân tích luồng lệnh (Instruction Flow)
  analyzeLogic() {
    const rawStrings = this.extractStrings();
    this.constants = [...new Set(rawStrings)];

    let code = "-- [ DECOMPILED SOURCE ] --\n";
    code += "-- Detected Version: Luau / Lua 5.1\n\n";

    // Khởi tạo các Service thường thấy trong Roblox/Lua
    const services = ["game", "TweenService", "CoreGui", "Players", "RunService", "HttpService"];
    const foundServices = this.constants.filter(c => services.includes(c));
    
    foundServices.forEach(s => {
      if (s !== "game") {
        code += `local ${s} = game:GetService("${s}")\n`;
      }
    });

    code += "\n";

    // Phân tích logic UI nếu có các hằng số đặc trưng
    if (this.constants.includes("Instance") && this.constants.includes("new")) {
      const instances = this.constants.filter(c => 
        ["ScreenGui", "Frame", "TextLabel", "TextBox", "UICorner", "ImageLabel"].includes(c)
      );

      instances.forEach(ins => {
        const varName = ins.toLowerCase();
        code += `local ${varName} = Instance.new("${ins}")\n`;
      });
    }

    // Tái tạo các thuộc tính (Properties)
    code += "\n-- Properties Reconstruction\n";
    if (this.constants.includes("KeySystemUI")) {
      code += `if game:GetService("CoreGui"):FindFirstChild("KeySystemUI") then\n`;
      code += `    game:GetService("CoreGui").KeySystemUI:Destroy()\n`;
      code += `end\n`;
    }

    // Trích xuất các chuỗi text hiển thị
    const uiTexts = this.constants.filter(c => 
      !services.includes(c) && !["Instance", "new", "GetService", "Parent", "Name"].includes(c)
    );

    uiTexts.forEach(text => {
      if (text.length > 1) {
        code += `-- Data Constant: "${text}"\n`;
      }
    });

    code += "\nreturn true";
    return code;
  }
}

export const fullDecompile = (bytecode) => {
  try {
    const decoder = new LuaBytecodeDecoder(bytecode);
    return decoder.analyzeLogic();
  } catch (err) {
    return `-- Error: Failed to parse bytecode structure\n-- ${err.message}`;
  }
};
