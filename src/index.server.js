import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import path from "path";
import fs from "fs";

// asser-manifest.json에서 파일 경로들을 조회합니다.
const manifest = JSON.parse(
  fs.readFileSync(path.resolve("./build/asset-manifest.json"), "utf-8")
);

const chunks = Object.keys(manifest.files)
  .filter(key => /chunk\.js$/.exec(key)) // chunk.js로 끝나는 키를 찾아서
  .map(key => `<script src="${manifest[key]}"></script>`) // 스크립트 테그로 변환하고
  .join(""); //합침

function createPage(root) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <meta
      name="viewport"
      content="width-device-width, initial-scale=1, shrink-to-fix=no"
    />
    <meta name="theme-color" content ="#000000" />
    <title>React App</title>
    <link href="${manifest["main.css"]}" rel="stylesheet" />
  </head>
  <body>
    <noscript>You need to enable javaScript to run this app.</noscript>
    <div id="root">
      ${root}
    </div>
    <script src="${manifest["runtime-main.js"]}"></script>
    ${chunks}
    <script src="${manifest["main.js"]}"></script>
  </body>
  </html>`;
}

const app = express();

// 서버사이드 랜더링을 처리할 핸들러 함수 입니다.
const serverRender = (req, res, next) => {
  // 이함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해 줍니다.

  const context = {};
  const jsx = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const root = ReactDOMServer.renderToString(jsx); // 렌더링을 하고
  // res.send(root); // 클라이언트에게 결과물을 응답합니다.
  res.send(createPage(root)); // 클라이언트에게 결과물을 응답합니다.
};

app.use(server);
app.use(serverRender);

// 5000 포트로 서버를 가동합니다.
app.listen(5000, () => {
  console.log("Running on http://localhost:5000");
});

// 떠있는지 확인용
// const html = ReactDOMServer.renderToString(
//   <div>Hello Server Side Rendering!</div>
// );

// console.log(html);
