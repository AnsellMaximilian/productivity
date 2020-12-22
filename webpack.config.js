const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-react"]
                    }
                }
                
            },

            {
                test: [/\.s[ac]ss$/i, /\.css$/],
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },

            {
                test: /\.mp3$/,
                use: "file-loader"
            }
        ]
    }
}