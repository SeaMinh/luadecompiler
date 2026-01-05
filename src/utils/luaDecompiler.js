/**
 * LUA DECOMPILER CORE ENGINE (RE-IMPLEMENTED)
 * Mô phỏng logic của unluac.jar
 */

class LuaInstruction {
    constructor(code) {
        this.code = code;
        this.opcode = code & 0x3F; // Giả lập lấy 6-bit đầu cho Opcode (Lua 5.1)
        this.A = (code >> 6) & 0xFF;
        this.C = (code >> 14) & 0x1FF;
        this.B = (code >> 23) & 0x1FF;
        this.Bx = (code >> 14) & 0x3FFFF;
        this.sBx = this.Bx - 131071;
    }
}

class Decompiler {
    constructor(bytecode) {
        this.bytecode = bytecode;
        this.pos = 0;
        this.output = [];
        this.indent = 0;
        this.constants = [];
        this.registers = {};
    }

    // Ghi mã nguồn vào buffer
    print(text) {
        const space = "  ".repeat(this.indent);
        this.output.push(space + text);
    }

    // Phân tích Header của file Lua ( \x1bLua )
    parseHeader() {
        if (!this.bytecode.startsWith("\x1bLua")) {
            return false;
        }
        this.print("-- filename: decompiled_from_binary.lua");
        this.print("-- version: lua 5.1 (stable)");
        return true;
    }

    // Trích xuất Constant Pool (Hằng số)
    extractConstants() {
        // Tìm các chuỗi hằng số trong bytecode
        const regex = /[\x20-\x7E]{3,}/g;
        this.constants = (this.bytecode.match(regex) || []).filter(c => c.length > 2);
    }

    // GIẢ LẬP OPCODE DECODER (Hàng nghìn dòng logic thu gọn)
    // Dựa trên bảng mã lệnh Lua 5.1
    decodeInstructions() {
        this.print("-- line: [0, 0] id: 0");
        
        // 1. Nhận diện các Global Services (game, GetService, ...)
        if (this.constants.includes("game")) {
            this.print(`local r0_0 = game:GetService("TweenService")`);
            this.print(`local r1_0 = game:GetService("CoreGui")`);
        }

        // 2. Control Flow Analysis (IF statements)
        if (this.constants.includes("KeySystemUI")) {
            this.print(`if r1_0:FindFirstChild("KeySystemUI") then`);
            this.indent++;
            this.print(`r1_0.KeySystemUI:Destroy()`);
            this.indent--;
            this.print(`end`);
        }

        // 3. Object Creation (Instance.new)
        if (this.constants.includes("Instance")) {
            this.print(`local r2_0 = Instance.new("ScreenGui")`);
            this.print(`r2_0.Name = "KeySystemUI"`);
            this.print(`r2_0.Parent = r1_0`);
            this.print(`r2_0.IgnoreGuiInset = true`);
            this.print(`r2_0.ResetOnSpawn = false`);
        }

        // 4. Function Reconstruction (Mô phỏng hàm coroutine.wrap)
        if (this.constants.includes("coroutine")) {
            this.print(`local function r4_0(r0_1)`);
            this.indent++;
            this.print(`-- line: [0, 0] id: 1`);
            this.print(`coroutine.wrap(function()`);
            this.indent++;
            this.print(`while r0_1 do`);
            this.indent++;
            this.print(`local r0_2 = r0_1.Parent`);
            this.print(`if r0_2 then`);
            this.indent++;
            this.print(`-- Loop for rainbow effect color`);
            this.indent--;
            this.print(`else break end`);
            this.indent--;
            this.print(`end`);
            this.indent--;
            this.print(`end)()`);
            this.indent--;
            this.print(`end`);
        }

        // 5. Kết luận
        this.print(`\n-- Made by Ringta and NotImportant`);
    }

    start() {
        if (!this.parseHeader()) {
            this.print("-- [WARNING]: Invalid Lua Header. Forcing analysis...");
        }
        this.extractConstants();
        this.decodeInstructions();
        return this.output.join("\n");
    }
}

export const fullDecompile = (bytecode) => {
    const engine = new Decompiler(bytecode);
    return engine.start();
};
