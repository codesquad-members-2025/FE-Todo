// webpack.config.js
const path = require("path");

module.exports = {
  // 1) 진입점(시작 파일)
  entry: "./src/app.js",

  // 2) 번들 결과물 설정
  output: {
    filename: "bundle.js", // 결과물 파일명
    path: path.resolve(__dirname, "dist"), // 결과물이 생성될 폴더
  },

  // 3) 모드 설정: development, production, none 중 선택
  mode: "development", // 개발용: 빠른 빌드, 소스맵 등

  // 4) 로더/플러그인 설정 (필요하다면)
  module: {
    rules: [
      // 예: Babel 로더, CSS 로더 등이 있다면 여기 추가
      {
        test: /\.css$/, // .css 확장자 파일
        use: [
          "style-loader", // 순서 중요: 뒤에서부터 처리
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    // 예: HtmlWebpackPlugin 등이 있다면 여기 추가
  ],
  devServer: {
    static: "./dist",
    port: 8080,
  },
};
