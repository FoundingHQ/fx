import { getPrettierParser } from "../prettier";

describe("getPrettierParser", () => {
  it("should resolve typescript files", () => {
    const file = "src/somefile.ts";
    expect(getPrettierParser(file)).toBe("typescript");
  });

  it("should resolve tsx files", () => {
    const file = "src/somefile.tsx";
    expect(getPrettierParser(file)).toBe("typescript");
  });

  it("should resolve unknown files", () => {
    const file = "src/prisma.schema";
    expect(getPrettierParser(file)).toBe(null);
  });
});
