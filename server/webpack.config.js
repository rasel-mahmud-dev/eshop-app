const nodeExternals = require("webpack-node-externals");
const path = require("path");
const { readdirSync, lstatSync } = require('fs');

// const isProd = process.env.NODE_ENV === "production"
const isProd = false

// Get all files in the src directory
const getSrcFiles = (dir) => {
    const files = readdirSync(dir);
    let srcFiles = [];
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = lstatSync(filePath);
        if (stat.isDirectory()) {
            srcFiles = srcFiles.concat(getSrcFiles(filePath));
        } else {
            srcFiles.push(filePath);
        }
    });
    return srcFiles;
};

// Generate entry points dynamically
const generateEntryPoints = () => {
    const srcDir = path.resolve(__dirname, "src");
    const srcFiles = getSrcFiles(srcDir);
    const entryPoints = {};
    srcFiles.forEach((file) => {
        const relativePath = path.relative(srcDir, file);
        const entryName = relativePath.replace(/\.js$/, "");
        entryPoints[entryName] = file;
    });
    return entryPoints;
};

module.exports = {
    entry: generateEntryPoints(),
    // mode: isProd ?  "production": "development",
    mode: "development",
    target: "node",
    watch: !isProd,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        libraryTarget: "commonjs2",
    },
    externals: [nodeExternals()],
    resolve: {
        alias: {
            src: path.resolve(__dirname, "src/")
        }
    },
    stats: {
        all: undefined,
        moduleAssets: false,
        dependentModules: false,
        excludeModules: false,
    },
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets:  ['@babel/preset-env'],
                    }
                }
            }
        ]
    },
};