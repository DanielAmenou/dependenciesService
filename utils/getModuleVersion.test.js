const getModuleVersion = require("./getModuleVersion");

describe("getModuleVersion", () => {
  it("npm version", () => {
    expect(getModuleVersion("1.2.3")).toBe("1.2.3");
  });
  it("^ prefix", () => {
    expect(getModuleVersion("^1.2.3")).toBe("1.2.3");
  });
  it("~ prefix", () => {
    expect(getModuleVersion("~1.2.3")).toBe("1.2.3");
  });
  it(">= prefix", () => {
    expect(getModuleVersion(">=1.2.3")).toBe("1.2.3");
  });
  it("range", () => {
    expect(getModuleVersion("1.2.3 < 2")).toBe("1.2.3");
  });
});
