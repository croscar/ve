const {
	ipcRenderer
} = require('electron')
const {
	session,
	ipcMain
} = require('electron')

let Cookies = {

}

Cookies.startServer = function () {
	//通信模块，mian process与renderer process（web page）
	//监听web page里发出的message
	ipcMain.on('set', (event, arg1, arg2) => {
//		console.log("set " + arg1 + ":" + arg2) // prints "ping"
		const cookie = {
			url: 'http://www.github.com',
			name: arg1,
			value: arg2
		}
		session.defaultSession.cookies.set(cookie, (error) => {
			if (error) console.error(error)
		})
		console.log("set " + arg1 + ":" + arg2 + "  ok") // prints "ping"
		//		event.sender.send('set-', arg1) //在main process里向web page发出message
	})

	ipcMain.on('get', (event, arg) => {
		console.log("get " + arg) // prints "ping"
		var value

		session.defaultSession.cookies.get({
			url: 'http://www.github.com',
			name:arg
		}, (error, cookies) => {
			console.log("error:",error,"   cookies:", cookies)
			if (cookies.length>0){
//				console.log(" cookie:", cookies[0])
//				console.log(" cookiev:",cookies[0]['value'])
				value=cookies[0]['value']
				console.log("get ",arg," = ",value)
				event.returnValue = value
			}else{
				console.log("get ",arg," = null")
				event.returnValue = ''
			}
		})

	})

	ipcMain.on('remove', (event, arg) => {
		console.log("remove " + arg) // prints "ping"
		//session.defaultSession.cookies.remove(arg)
	})
}


Cookies.set = function (a, b) {
	ipcRenderer.send('set', a, b) // prints "pong"   
}


Cookies.get = function (a) {

	var b = ipcRenderer.sendSync('get', a) // prints "pong"   
	return b
}

Cookies.remove = function (a) {
	ipcRenderer.send('remove', a) // prints "pong" 
}

export default Cookies