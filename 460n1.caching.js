let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;

function DB(name) {
	this.init = (upgrade) => {
		let openReq = indexedDB.open(name, 1);
		openReq.onupgradeneeded = (e) => upgrade(e.target.result);
	};

	this.read = (stores, fn) =>  this.transaction('readonly', stores, fn);

	this.readWrite = (stores, fn) => this.transaction('readwrite', stores, fn);

	this.transaction = (mode, stores, fn) => {
		let openReq = indexedDB.open(name);
		openReq.onsuccess = (e) => {
			let db = e.target.result;
			let tx = db.transaction(stores, mode);
			fn(tx);
		};
	};
}

let dbStore = 'storage';

let storageDB = new DB('StorageDB');

storageDB.init((db) => db.createObjectStore(dbStore, { keyPath: 'key' }));

insert = (key,value) => storageDB.readWrite([ dbStore ], 
	(tx) => tx.objectStore(dbStore).put({
		key: key,
		value: value
	}));

readSource = (key) => storageDB.read([ dbStore ], (tx) => tx.objectStore(dbStore).get(key).onsuccess = (event) => dataURL(key, event.target.result, (data) => setSource(key, data)));

setSource = (src, value) => {
	let found = document.querySelectorAll(`[data-src="${src}"]`)[0];
	found.setAttribute(found.tagName == 'LINK' ? "href" : "src", value);
	found.removeAttribute("data-src");
};

dataURL = (src, bypass, callback) => {
	if (bypass)
		return callback(bypass.value);
	let xhr = new XMLHttpRequest();
	xhr.open("GET", src, true);
	xhr.responseType = 'arraybuffer';
	xhr.send();
	xhr.onload = () => {
		if(xhr.status != 200)
			return;
		let uInt8Array = new Uint8Array(xhr.response);
		let i = uInt8Array.length;
		let biStr = new Array(i);
		while (i--) biStr[i] = String.fromCharCode(uInt8Array[i]);
		let data = biStr.join('');
		let complete = `data:${dataType(src)};base64,${window.btoa(data)}`;
		insert(src, complete);
		callback(complete);
	}
};

dataType = (src) => {
	let extension = src.split(".")[src.split(".").length-1];
	switch(extension){
		case 'mp4':
		case 'webm':
			return 'video/'+extension;
		case 'js':
			return 'text/javascript';
		case 'css':
			return 'text/'+extension;
		default:
			return 'image/'+extension;
	}
};

(()=>{
	let dataSrc = document.querySelectorAll("[data-src]");
	for (let i = 0; i < dataSrc.length; i++)
		readSource(dataSrc[i].getAttribute("data-src"));
	let thisScript = document.querySelectorAll("[src*='460n1.caching']")[0];
	thisScript.parentNode.removeChild(thisScript);
})();
