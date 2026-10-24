# 雨课堂拖选复制助手

让雨课堂题干与选择题选项支持鼠标拖选、`Ctrl+C` 复制。提供独立 Tampermonkey（篡改猴）脚本，以及包含字体反混淆的整合版。

## 安装：按需要选择一个版本

| 版本 | 适用情况 | 安装链接 |
| --- | --- | --- |
| 独立版 1.0.1 | 已有可正常工作的字体反混淆脚本，或复制内容本来就是正常中文 | [安装拖选复制独立版](https://raw.githubusercontent.com/TySchip/yuketang-copy-helper/main/yuketang-copy-helper.user.js) |
| 整合版 1.0.1 | 希望一个脚本同时完成字体还原和解除拖选限制 | [安装字体还原与拖选复制整合版](https://raw.githubusercontent.com/TySchip/yuketang-copy-helper/main/yuketang-font-deobfuscator-copy.user.js) |

1. 安装并启用 [Tampermonkey](https://www.tampermonkey.net/)。已经安装则跳过。
2. 点击上面的安装链接，在 Tampermonkey 界面确认安装或更新。
3. 打开或刷新雨课堂题目页，整合版需等待字体还原完成。
4. 在题干或选项**文字上按住鼠标拖动**，再按 `Ctrl+C`，即可粘贴到其他应用。

安装一次后，后续页面加载会自动执行，无需每次打开控制台。先保存尚未提交的作答，再刷新页面。

独立版可以和原有字体反混淆脚本一起使用。使用整合版时，无需再装独立版，也不要同时启用另一份字体反混淆脚本，以免重复替换文字。整合版保留原脚本的 `@name` 和 `@namespace`；Tampermonkey 识别为同一脚本时会更新原版本，安装前可先导出备份。

如果链接只显示源码：打开 Tampermonkey 管理面板 → 新建脚本 → 用完整源码替换模板 → 保存。参见 [Tampermonkey 官方安装说明](https://www.tampermonkey.net/faq.php?locale=zh_CN&q=Q102)。

如果 Chrome 中脚本未执行：检查扩展是否启用、是否有雨课堂站点访问权限，并按 [Tampermonkey 官方 Q209](https://www.tampermonkey.net/faq.php?locale=zh_CN&q=Q209) 检查“允许用户脚本”开关或适用版本的开发者模式。此项目不会替你修改浏览器权限。

固定版本的脚本附件与 SHA-256 校验文件见 [Releases](https://github.com/TySchip/yuketang-copy-helper/releases)。

## 为什么显示中文，却不能正常复制？

这是两个独立问题。

### 1. 鼠标拖不出选区：CSS 禁止选中

已检查的雨课堂题目位于 `iframe#iframeExerciseId` 内，选项使用 Element UI 的 `label.el-radio`。选项及内部文字计算得到的 `user-select` 为 `none`。

本项目在题目所在文档中添加一个 `<style id="ykt-copy-style">`，覆盖题干与选项的选中样式：

```css
.problem-body, .problem-body *, .el-radio, .el-radio * {
  user-select: text !important;
  -webkit-user-select: text !important;
}
.radioText { cursor: text !important; }
```

代码不清除 `click`、`mousedown`、`copy` 等事件，不改按钮的 `disabled`、`checked` 或答案数据。普通点击仍遵循网页原有的答题逻辑；脚本本身不选择答案或提交作业。

这不是适配所有网站的通用解除限制工具：如果另一个页面还通过事件阻止选中或复制，需要重新检查实际原因。

### 2. 能拖选，但粘贴乱码：字体混淆

雨课堂可能使用 `exam-data-decrypt-font` 字体与 `.xuetangx-com-encrypted-font` 类，让底层文字和屏幕显示不同。

独立版只解除 CSS 选中限制，不进行字体还原。整合版沿用 [novob/yuketang-deobfuscator](https://github.com/novob/yuketang-deobfuscator) 的实现：解析字体字形、匹配内置指纹表、替换文字节点，并禁用混淆字体。拖选样式与字体处理相互独立，安装整合版后请保持原有反混淆与禁用混淆字体功能开启。

## iframe、翻题和刷新

两个版本均匹配 `*://*.yuketang.cn/*`，且没有 `@noframes`，可在匹配网址的题目 iframe 内运行。`@noframes` 的含义见 [官方文档](https://www.tampermonkey.net/documentation.php?locale=zh_CN&q=noframes)。

- 同一文档内翻题：已有 CSS 会自动匹配新题干和选项，不必逐题注入。
- 刷新或 iframe 重新加载：脚本管理器在匹配的新文档中重新执行。
- 独立版在 `document-end` 执行；整合版沿用原脚本初始化过程。选中文字前需等待脚本完成加载。
- 如果网站更换域名、DOM 类名或限制方式，可能需要更新匹配规则或 CSS。

## 权限与外部请求

独立版为 `@grant none`，无外部依赖，不读取题目内容，不主动发起网络请求，只注入上述 CSS。

整合版保留上游已有权限、`opentype.js` CDN 依赖及混淆字体下载流程，没有为拖选功能增加权限。两版均未加入向外发送题目或答案的代码，也不处理验证码。

## 验证记录与本地检查

2026-10-24，在实际雨课堂页面定位到选项的 `user-select: none`。覆盖 CSS 后，使用者确认鼠标拖选与正常中文复制均成功。这项实测针对所检查的页面；脚本管理器中的安装更新及其他课程页面仍需按下列步骤核验。

安装后的检查方法：

1. 拖选一段题干和一项选项文字，分别复制到文本编辑器，与屏幕中文核对。
2. 确认选中答案没有因拖选而变化。
3. 在确认答案已保存或作业已提交后翻题，再复制下一题文字。
4. 刷新后再次拖选，确认无需重新粘贴控制台代码。

发布前执行 JavaScript 语法检查，并核对整合版的字体代码和映射表与原版一致：

```sh
node --check yuketang-copy-helper.user.js
node --check yuketang-font-deobfuscator-copy.user.js
```

## 来源与许可证

本项目的新增代码与文档采用 [MIT License](LICENSE)。整合版基于 novob 的 MIT 项目，原版权与许可文本保留在 [LICENSE.upstream](LICENSE.upstream) 和脚本内，详情见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
