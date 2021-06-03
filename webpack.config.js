const path = require('path')

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [ // webpack に対してビルド時に追加で行う処理を記述
      {
        test: /\.ts$/,           //.ts で終わるファイルに対して
        use: 'ts-loader',        // ts-loader を実行する
        exclude: /node_modules/, // 除外するファイルを正規表現で指定
      },
    ],
  },
  resolve: { // モジュールとして解決するファイルの拡張子を指定
    extensions: ['.ts'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: 'dist/',
  }
}
