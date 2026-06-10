const sOverMenu = document.getElementById("sOverlay");
const closeShortcuts = document.getElementById("closeShortcuts");
const openShortcuts = document.getElementById("scbtn")

closeShortcuts.addEventListener("click", () => {
    sOverMenu.style.display = 'none';
});

openShortcuts.addEventListener("click", () => {
    sOverMenu.style.display = 'grid';
});

document.addEventListener("keydown", function(e) {
    if (e.code === 'KeyI') {
        if (sOverMenu.style.display == 'none') {
            sOverMenu.style.display = 'grid';
        } else {
            sOverMenu.style.display = 'none';
        }
    }
});

sOverMenu.addEventListener("click", (evt) => {
  if (!evt.target.closest("#sMenu")) sOverMenu.style.display = 'none';
});

sOverMenu.style.display = 'none';
