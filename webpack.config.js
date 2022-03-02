var path = require("path");
var webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
let isDev =
  process.env.npm_lifecycle_script.indexOf("development") === -1 ? false : true;

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: `[name]${isDev ? "" : ".[hash:8]"}.js`,
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        enforce: "pre",
        include: [path.resolve(__dirname, "./src")],
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.sass$/,
        use: ["vue-style-loader", "css-loader", "sass-loader?indentedSyntax"],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: ["vue-style-loader", "css-loader", "sass-loader"],
            sass: [
              "vue-style-loader",
              "css-loader",
              "sass-loader?indentedSyntax",
            ],
          },
          // other vue-loader options go here
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
        },
      },
    ],
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
  },
  performance: {
    hints: false,
  },
  devtool: "#eval-source-map",
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"',
        API_URL: '"https://cmt-back-gyqcajvk2a-ue.a.run.app/api"',
        // API_URL: '"https://api-cincel-app-nubuocxhfq-ue.a.run.app/api"',
        SOCKET_URL: '"https://cmt-back-gyqcajvk2a-ue.a.run.app"',
        FRONT_URL: '"https://cmtnew-1201e.web.app/"',
      },
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      extractComments: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ]);
  module.exports.devServer.contentBase = "./dist";
  module.exports.output.publicPath = "/";
}

if (process.env.NODE_ENV === "development") {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"development"',
        API_URL: '"http://0.0.0.0:3005/api"',
        SOCKET_URL: '"http://0.0.0.0:3005"',
        FRONT_URL: '"localhost:8080"',
      },
    }),
  ]);
  module.exports.output.publicPath = "/dist/";
}
