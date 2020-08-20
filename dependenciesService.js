const axios = require("axios").default;
const QuickLRU = require("quick-lru");
const getModuleVersion = require("./utils/getModuleVersion");

const REGISTRY_URL = process.env.REGISTRY_URL || "https://registry.npmjs.org/";
const cache = new QuickLRU({ maxSize: process.env.MAX_CACHE || 10000 });

const getSubDependencies = async (dependencies) => {
  const dependenciesPromises = [];
  Object.keys(dependencies).forEach((depName) => {
    const depVersion = getModuleVersion(dependencies[depName]);
    dependenciesPromises.push(getDependenciesHelper(depName, depVersion));
  });
  return Promise.all(dependenciesPromises);
};

const getDependenciesHelper = async (packageName, version) => {
  const cacheKey = `${packageName}@${version}`;
  if (cache.has(cacheKey)) {
    const dependencies = cache.get(cacheKey);
    const result = { name: packageName, version };
    if (dependencies) result.dependencies = await getSubDependencies(dependencies);
    return result;
  }
  return axios
    .get(`${REGISTRY_URL}${packageName}/${version}`)
    .then(async (axiosResponse) => {
      const { name, version, dependencies } = axiosResponse.data;
      const result = { name, version };
      if (version != "latest") cache.set(cacheKey, dependencies);
      if (dependencies) result.dependencies = await getSubDependencies(dependencies);
      return result;
    })
    .catch((error) => {
      errorsHandler(error, cacheKey);
    });
};

const errorsHandler = (error, version) => {
  if (error.response) console.error(`${version} not found`);
  else console.error(`could not connect to server. error code: ${error.code}`);
};

const getDependencies = async (packageName, version = "latest") => {
  return await getDependenciesHelper(packageName, getModuleVersion(version));
};

module.exports = { getDependencies };
