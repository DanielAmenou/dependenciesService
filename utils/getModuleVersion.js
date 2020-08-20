const getModuleVersion = (rawVersion) => {
  if (rawVersion === "latest") return rawVersion;
  const result = rawVersion.replace(/[<>^~=]/g, "").split(" ");
  return result[1] || result[0];
};

module.exports = getModuleVersion;
