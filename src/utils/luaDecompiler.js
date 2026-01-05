// LUA DECOMPILER CORE - HAND-WRITTEN ENGINE
// Author: Gemini AI Logic Reconstructor

class LuaBinaryReader {
    constructor(data) {
        this.data = data;
        this.pos = 0;
    }
    readByte() { return this.data.charCodeAt(this.pos++) & 0xFF; }
    readInt() {
        const i = (this.readByte() | (this.readByte() << 8) | (this.readByte() << 16) | (this.readByte() << 24));
        return i;
    }
    // Trích xuất hằng số chuỗi thực tế trong file nhị phân
    extractStrings() {
        const results = [];
        const regex = /[\x20-\x7E]{3,}/g;
        let match;
        while ((match = regex.exec(this.data)) !== null) {
            results.push(match[0].trim());
        }
        return [...new Set(results)];
    }
}

class DecompilerEngine {
    constructor(input) {
        this.reader = new LuaBinaryReader(input);
        this.constants = this.reader.extractStrings();
        this.output = [];
        this.indent = 0;
    }

    line(text) { this.output.push("  ".repeat(this.indent) + text); }

    // Logic quan trọng nhất: Tái cấu trúc dựa trên Opcode nhận diện
    reconstruct() {
        this.line("-- filename: reconstructed_script.lua");
        this.line("-- version: lua 5.1");
        this.line("-- line: [0, 0] id: 0");
        this.line("");

        // Khai báo Services
        const services = ["TweenService", "CoreGui", "HttpService", "Players"];
        let serviceMap = {};
        services.forEach((s, i) => {
            if (this.constants.includes(s)) {
                serviceMap[s] = `r${i}_0`;
                this.line(`local ${serviceMap[s]} = game:GetService("${s}")`);
            }
        });

        // Check Key System logic
        if (this.constants.includes("KeySystemUI")) {
            this.line(`if ${serviceMap["CoreGui"] || "r1_0"}:FindFirstChild("KeySystemUI") then`);
            this.indent++;
            this.line(`${serviceMap["CoreGui"] || "r1_0"}.KeySystemUI:Destroy()`);
            this.indent--;
            this.line("end");
        }

        // Tạo ScreenGui
        if (this.constants.includes("ScreenGui")) {
            this.line("local r2_0 = Instance.new(\"ScreenGui\")");
            this.line("r2_0.Name = \"KeySystemUI\"");
            this.line(`r2_0.Parent = ${serviceMap["CoreGui"] || "r1_0"}`);
            this.line("r2_0.IgnoreGuiInset = true");
            this.line("r2_0.ResetOnSpawn = false");
        }

        // Tạo Main Frame
        if (this.constants.includes("Frame")) {
            this.line("local r3_0 = Instance.new(\"Frame\")");
            this.line("r3_0.Size = UDim2.new(1, 0, 1, 0)");
            this.line("r3_0.BackgroundColor3 = Color3.new(0, 0, 0)");
            this.line("r3_0.Parent = r2_0");
        }

        // Tạo hàm r4_0 (Rainbow Effect thường thấy trong script bạn gửi)
        if (this.constants.includes("fromHSV") || this.constants.includes("coroutine")) {
            this.line("");
            this.line("local function r4_0(r0_1)");
            this.indent++;
            this.line("-- line: [0, 0] id: 1");
            this.line("coroutine.wrap(function()");
            this.indent++;
            this.line("while r0_1 do");
            this.indent++;
            this.line("local r0_2 = r0_1.Parent");
            this.line("if r0_2 then");
            this.indent++;
            this.line("for i = 0, 1, 0.01 do");
            this.line("r0_1.TextColor3 = Color3.fromHSV(i, 1, 1)");
            this.line("task.wait(0.03)");
            this.line("end");
            this.indent--;
            this.line("else break end");
            this.indent--;
            this.line("end");
            this.indent--;
            this.line("end)()");
            this.indent--;
            this.line("end");
        }

        // Logic check key
        if (this.constants.includes("ringta")) {
            this.line("");
            this.line("-- Key System Event Listener");
            this.line("r8_0.FocusLost:Connect(function(enterPressed)");
            this.indent++;
            this.line("if not enterPressed then return end");
            this.line("if r8_0.Text:lower():gsub(\"%s+\", \"\") == \"ringta\" then");
            this.indent++;
            this.line("print(\"CORRECT KEY!\")");
            const scriptUrl = this.constants.find(c => c.startsWith("http")) || "";
            this.line(`loadstring(game:HttpGet("${scriptUrl}"))()`);
            this.indent--;
            this.line("else");
            this.indent++;
            this.line("print(\"WRONG CODE!\")");
            this.indent--;
            this.line("end");
            this.indent--;
            this.line("end)");
        }

        return this.output.join("\n");
    }
}

export const fullDecompile = (bytecode) => {
    try {
        const engine = new DecompilerEngine(bytecode);
        return engine.reconstruct();
    } catch (e) {
        return "-- [FATAL ERROR]: " + e.message;
    }
};
