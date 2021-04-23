module.exports = function (api) {
  api.cache(true)
  return {
    "presets": ["module:metro-react-native-babel-preset", "module:react-native-dotenv"],
    "plugins":[["module:@babel/plugin-proposal-decorators",{legacy:true}], ["module:@babel/plugin-transform-runtime",{"regenerator": false}]]

  };
}
