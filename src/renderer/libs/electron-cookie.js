let Cookies = {

}

Cookies.startServer = function () {
	//通信模块，mian process与renderer process（web page）
	const {
		ipcMain
	} = require('electron')
	//监听web page里发出的message
	ipcMain.on('asynchronous-message', (event, arg) => {
		console.log("mian1" + arg) // prints "ping"
		event.sender.send('asynchronous-reply', 'pong') //在main process里向web page发出message
	})

	ipcMain.on('synchronous-message', (event, arg) => {
		console.log("mian2" + arg) // prints "ping"
		event.returnValue = 'pong'
	})
}


Cookies.set = function (a, b) {

}


Cookies.get = function (a) {
	return a
}

Cookies.remove = function (a) {
	return a
}

export default Cookies