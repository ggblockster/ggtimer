const version = 'v1.2.4';
const vtext = document.getElementById("version");

vtext.textContent = version;
document.title = 'ggTimer ' + version;

const titleObj = document.getElementById("title");
titleObj.title = `< - - - - - ggTimer ${version} - - - - - - >
   A simple, general-purpose timer`