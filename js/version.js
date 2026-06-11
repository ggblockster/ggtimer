const version = 'v1.2.8';
const vtext = document.getElementById("version");

vtext.textContent = version;
if (window.location.hostname === '127.0.0.1') {
   document.title = 'ggTimer ' + version + '-beta';
} else {
   document.title = 'ggTimer ' + version;
}

const titleObj = document.getElementById("title");
titleObj.title = `< - - - - - ggTimer ${version} - - - - - - >
   A simple, general-purpose timer`;
