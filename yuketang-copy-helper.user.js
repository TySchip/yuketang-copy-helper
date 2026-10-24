// ==UserScript==
// @name         雨课堂题干与选项拖选复制
// @namespace    https://github.com/TySchip/yuketang-copy-helper
// @version      1.0.1
// @description  允许鼠标拖选雨课堂题干和选择题选项，保留原有答题交互；字体反混淆需另行启用
// @author       TySchip
// @license      MIT
// @homepageURL  https://github.com/TySchip/yuketang-copy-helper
// @supportURL   https://github.com/TySchip/yuketang-copy-helper/issues
// @downloadURL  https://raw.githubusercontent.com/TySchip/yuketang-copy-helper/main/yuketang-copy-helper.user.js
// @updateURL    https://raw.githubusercontent.com/TySchip/yuketang-copy-helper/main/yuketang-copy-helper.user.js
// @match        *://*.yuketang.cn/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

// Copyright (c) 2026 TySchip. Released under the MIT License.
(function() {
    'use strict';

    if (document.getElementById('ykt-copy-style')) return;

    const selectionStyleEl = document.createElement('style');
    selectionStyleEl.id = 'ykt-copy-style';
    selectionStyleEl.textContent = [
        '.problem-body, .problem-body *, .el-radio, .el-radio * {',
        '  user-select: text !important;',
        '  -webkit-user-select: text !important;',
        '}',
        '.radioText { cursor: text !important; }'
    ].join('\n');
    document.head.appendChild(selectionStyleEl);
})();
