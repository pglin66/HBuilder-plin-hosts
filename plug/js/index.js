 CodeMirror.fromTextArea(document.querySelector("#editor-textarea"), {
	mode: "powershell",
	tabSize: 8,
	lineNumbers: true, // 显示行号
	styleActiveLine: true, // 高亮选中行
	keyMap: "sublime", // 快捷键，依赖keymap/sublime.js，依赖于addon/search/searchcursor.js
	// theme: "mdn-like",
	// theme: "neo",
	theme: "neat",
	// viewportMargin: Infinity,  // 自适应内容高度
	// scrollbarStyle: "simple",  // 简单的滚动条，有依赖
});