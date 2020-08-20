const dependenciesService = require("../dependenciesService");

let consoleOutput = [];
const originalConsoleError = console.error;
const mockedError = (output) => consoleOutput.push(output);

beforeEach(() => (console.error = mockedError));
afterEach(() => {
  console.error = originalConsoleError;
  consoleOutput = [];
});

describe("getModuleVersion", () => {
  it("not found error", async () => {
    await dependenciesService.getDependencies("TRHRGE#@%REGDEHRHukf");
    expect(consoleOutput).toEqual(["TRHRGE#@%REGDEHRHukf@latest not found"]);
  });
});
