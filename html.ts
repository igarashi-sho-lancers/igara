import * as fs from "fs";
import * as highlight from "highlight.js";
import * as marked from "marked";

const highlightStyle = fs.readFileSync("./node_modules/highlight.js/styles/railscasts.css", "utf8");
const markdownStyle = fs.readFileSync("./node_modules/github-markdown-css/github-markdown.css", "utf8");
const styleTag = `<style>
${highlightStyle}
${markdownStyle}
</style>`;

const exec = () => {
  const markdown = fs.readFileSync("README.md").toString();
  let body = marked(markdown, {
    gfm: true,
    highlight: (code) => {
      return highlight.highlightAuto(code).value;
    },
  });

  body = `<div class="markdown-body">
  ${body}
</div>`;

  fs.writeFileSync("README.html", styleTag + body);
};

exec();
