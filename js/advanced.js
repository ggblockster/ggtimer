const advancedPanel = document.getElementById("advancedPanel");
const timePanel = document.getElementById("timePanel");
const advCheck = document.getElementById("advc");
const closeAdv = document.getElementById("closeAdv");
const advText = document.getElementById("at");

function togglePanel() {
    if (advCheck.checked) {
        advancedPanel.style.display = 'block';
        timePanel.classList.remove("full");
    } else {
        advancedPanel.style.display = 'none';
        timePanel.classList.add("full");
    }
}

advCheck.addEventListener("change", () => {
    togglePanel();
});

closeAdv.addEventListener("click", () => {
    advCheck.checked = false;
    togglePanel();
});

advText.addEventListener("click", () => {
    advCheck.checked = !advCheck.checked;
    togglePanel();
});

document.addEventListener("keydown", function(e) {
    if (e.code === 'KeyO') {
        advCheck.checked = !advCheck.checked;
        togglePanel();
    }
});

togglePanel();

const ulTime = document.getElementById("timelist");
const clearTimesBtn = document.getElementById("clearHistory");
let copyables;

let times;

try {
    times = JSON.parse(localStorage.getItem("times")) || [];
} catch {
    times = [];
}

function displayTimes() {
    ulTime.innerHTML = "";

    [...times]
        .reverse()
        .forEach(time => {
            if (!time) return;

            const li = document.createElement("li");
            li.textContent = time;
            li.classList.add("copyable");

            ulTime.appendChild(li);
        });
}

ulTime.addEventListener("click", async (e) => {
    if (e.target.classList.contains("copyable")) {
        await navigator.clipboard.writeText(e.target.textContent);

        e.target.classList.add("copied");
        alert(`The time "${e.target.textContent}" has been copied to your clipboard.`);
        setTimeout(() => {
            e.target.classList.remove("copied");
        }, 1000);
    }
});

function clearTimes() {
    if (confirm("Are you sure you want to delete all of your saved times?\nThis cannot be undone.")) {
        times = [];
        localStorage.removeItem("times");
        displayTimes();
    }
}

clearTimesBtn.addEventListener("click", () => {
    clearTimes();
});

function saveTime() {
    const time = timeText.textContent;

    if (!time || time === "00:00.00") {
        return;
    }

    times.push(time);
    localStorage.setItem("times", JSON.stringify(times));
    displayTimes();
}

resetBtn.addEventListener("click", saveTime);

document.addEventListener("keydown", function (e) {
    if (e.code === "Backspace" || e.code === "Delete") {
        saveTime();
    }
});

displayTimes();

function exportTimes() {
    const rows = [
        ["Times"],
        ...times.map(time => [time])
    ];

    const csv = rows
        .map(row => row.join(","))
        .join("\n");

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "times.csv";
    a.click();

    URL.revokeObjectURL(url);
}

const exportBtn = document.getElementById("exportBtn");

exportBtn.addEventListener("click", () => {
    if (confirm("Export times to \"times.csv\"?")) {
        if (times.length < 1) {
            alert("Cannot export an empty list.")
        } else {
            exportTimes();
        }
    }
});
