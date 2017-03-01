# doodle
开发过程中使用 npm start 命令，访问http://localhost:8080 
为了实现修改css等静态文件也实现热更新，需要修改webpack中hot模块的代码

\node_modules\webpack\hot\dev-server.js
文件中添加reload代码。

if(upToDate()) {
	console.log("[HMR] App is up to date.");
	window.location.reload();
}


打包使用npm run build命令
