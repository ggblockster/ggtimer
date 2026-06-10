const timeText = document.getElementById("time");
const startBtn = document.getElementById("start");
const startBtnText = document.getElementById("st");
const startBtnIcon = document.getElementById("stIcon");
const resetBtn = document.getElementById("reset");

let ms = 0;
let s = 0;
let m = 0;

let msx = 0;
let sx = 0;
let mx = 0;

let running = false;

function reset() {
    running = false;
    s = 0;
    m = 0;
    ms = 0;
    startBtn.classList.remove("active");
    startBtnText.textContent = "Start";
    startBtnIcon.textContent = "play_arrow";
}

document.addEventListener('keydown', function (event) {
    console.log(event.key);
    if (event.key === ' ' || event.code === 'Space') {
        event.preventDefault();
        running = !running;
        if (running) {
            startBtn.classList.add("active");
            startBtnText.textContent = "Pause";
            startBtnIcon.textContent = "pause";
        } else {
            startBtn.classList.remove("active");
            startBtnText.textContent = "Start";
            startBtnIcon.textContent = "play_arrow";
        }
    } else if ((event.code === 'Backspace') || (event.code === 'Delete')) {
        event.preventDefault();
        reset();
    }
});

startBtn.addEventListener("click", () => {
    running = !running;
    console.log(running);
    if (running) {
        console.log('active');
        startBtn.classList.add("active");
        startBtnText.textContent = "Pause";
        startBtnIcon.textContent = "pause";
    } else {
        console.log('inactive');
        startBtn.classList.remove("active");
        startBtnText.textContent = "Start";
        startBtnIcon.textContent = "play_arrow";
    }
});

resetBtn.addEventListener("click", () => {
    reset();
});

setInterval(() => {
    if (running) {
        if (ms == 98) {
            ms = 0;
            if (s == 60) {
                s = 0;
                m += 1;
            }
            s += 1;
            if (m == 11) {
                running = false;
            }
        }
        ms += 1;
    }

    if (ms < 10) {
        msx = "0" + String(ms);
    } else {
        msx = ms;
    }

    if (s < 10) {
        sx = "0" + String(s);
    } else {
        sx = s;
    }

    if (m < 10) {
        mx = "0" + String(m);
    } else {
        mx = m;
    }

    timeText.textContent = `${mx}:${sx}.${msx}`;
}, 10);
