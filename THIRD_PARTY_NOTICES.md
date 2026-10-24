# 上游来源与许可证

`yuketang-font-deobfuscator-copy.user.js` 基于
[novob/yuketang-deobfuscator](https://github.com/novob/yuketang-deobfuscator)，
核对版本为提交 [`eff23eebba1221555d19d10e65a47cd2cd412da5`](https://github.com/novob/yuketang-deobfuscator/tree/eff23eebba1221555d19d10e65a47cd2cd412da5)。

- 上游版权：Copyright (c) 2026 novob。
- 上游许可证：MIT，完整文本保留于 [LICENSE.upstream](LICENSE.upstream)，也嵌入整合版脚本中。
- 上游脚本署名：GLM-5.1 & DeepSeek-V4-Pro in Trae CN。
- 本项目仅增加拖选复制 CSS、版本与发布元数据，保留字体指纹表、字体还原逻辑及原有权限声明。
- 提供的原始文件与该提交的上游脚本一致，仅换行格式和上游 ScriptCat 下载地址元数据不同。

整合版沿用上游的 `opentype.js@1.3.4` 依赖，通过 `@require` 加载。
其项目与许可证见 [opentype.js](https://github.com/opentypejs/opentype.js)。本仓库未打包该依赖。

独立版 `yuketang-copy-helper.user.js` 不包含上游字体代码或字形表，不需要第三方依赖。
