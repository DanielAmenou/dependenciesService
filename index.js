const readline = require("readline");
const dependenciesService = require("./dependenciesService");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.question("package: ", async (rawPackageName) => {
  const [name, version] = rawPackageName.split("@");
  const dependencies = await dependenciesService.getDependencies(name, version);
  if (dependencies) console.log(JSON.stringify(dependencies, null, 2));
  rl.close();
});
