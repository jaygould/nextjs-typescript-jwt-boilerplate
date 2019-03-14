module.exports = function(api) {
  api.cache(true);

  const presets = [
    "next/babel",
    ["@babel/preset-typescript", { isTSX: true, allExtensions: true }]
  ];

  const plugins = [];

  return {
    presets,
    plugins
  };
};
