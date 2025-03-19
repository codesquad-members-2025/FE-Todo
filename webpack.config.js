// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // 1) 진입점(시작 파일)
  entry: "./src/app.js",

  // 2) 번들 결과물 설정
  output: {
    filename: "bundle.js", // 결과물 파일명
    path: path.resolve(__dirname, "dist"), // 결과물이 생성될 폴더
    clean: true, // 빌드할 때 기존 dist 폴더 정리
    // publicPath: "", // 상대 경로로 설정
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
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              // html-loader가 <img src="./images/hero.png"> 등을 파싱하여
              // Webpack 모듈로 인식하도록
              sources: {
                list: [
                  {
                    // 기본값과 유사하게, <img src="...">를 처리
                    tag: "img",
                    attribute: "src",
                    type: "src",
                  },
                  // 필요 시, <link>, <source>, <video> 등 추가
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // 이미지 파일 처리
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]", // 이미지가 dist/images 폴더에 저장됨
        },
      },
      {
        test: /\.json$/,
        type: "asset/resource", // JSON을 별도 파일로 저장
      },
    ],
  },
  plugins: [
    // 예: HtmlWebpackPlugin 등이 있다면 여기 추가
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 원본 HTML 파일
      filename: "index.html", // 출력될 HTML 파일 이름
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/images", to: "images" }, // 이미지 폴더를 dist로 복사
      ],
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.join(__dirname, "public"), // ✅ public 폴더 서빙
      },
      {
        directory: path.join(__dirname, "dist"), // ✅ dist 폴더 서빙
      },
    ],
    port: 8080,
    open: true,
  },
};
