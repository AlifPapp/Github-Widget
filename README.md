<div>
  <h1 align="center">Github Widget</h1>
</div>

## Example
<a href="https://AlifPapp.github.io/Github-Widget/">
<img src="https://raw.githubusercontent.com/AlifPapp/Github-Widget/main/Example.png" alt="AutoSend.png"></a>

## About

Forked from: [surbhioberoi/github-widget](https://github.com/surbhioberoi/github-widget) 

Changes:
- Updated the css to incorporate github theme colors.
- Added option to specify how many repos it displays.
- Can use the Repo's gh-pages in your iframe.

## How to use

- **Inline DOM manipulation:** <details><summary>Expand</summary>
  Copy paste this code in your HTML
  ```html
  <div class="github-widget" data-username="github" data-toprepos="3"></div>
  <div class="github-widget" data-username="AlifPapp" data-toprepos="4"></div>
  <script src="https://AlifPapp.github.io/Github-Widget/githubwidget.js"></script>
  ```
</details>

- **iframe:** <details><summary>Expand</summary>
  1: Create a new html file and use the *Inline DOM manipulation* method shown above.
  <br>2: Link your new html file into your iframe.
  <br>Example:
  ```html
  <iframe src="github-widget/widget.html" width="330" height="515" scrolling="no" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
  ```
</details>

- **iframe_2:** *(Using this repo's gh-pages)* <details><summary>Expand</summary>
  Copy paste this code in your HTML
  ```html
  <iframe src="https://AlifPapp.github.io/Github-Widget/#/?username=AlifPapp&toprepos=4" width="330" height="515" scrolling="no" allowtransparency="true" frameborder="0"     sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
  ```
  Options:
  - `username=:username` replace `:username` with your GitHub username
  - `toprepos=:number` replace `:number` with number of repos you want to list
  - `style=:styles` replace `:styles` with your own styles
  - `css=:csslink` replace `:csslink` with an external css link | ***Must be the last paramater***
</details>
