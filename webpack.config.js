const path = require('path')

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [ // webpack に対してビルド時に追加で行う処理を記述
      {
        test: /\.tsx?$/,           //.tsx で終わるファイルに対して
        use: 'ts-loader',        // ts-loader を実行する
        exclude: /node_modules/, // 除外するファイルを正規表現で指定
      },
    ],
  },
  resolve: { // モジュールとして解決するファイルの拡張子を指定
    extensions: ['.js', '.ts', '.tsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: 'dist/',
  }
}
