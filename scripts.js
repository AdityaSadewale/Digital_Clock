document.addEventListener("DOMContentLoaded", () => {

    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const ampmEl = document.getElementById("ampm");
    const dateEl = document.getElementById("date");

    const taskText = document.getElementById("taskText");
    const taskTime = document.getElementById("taskTime");
    const taskList = document.getElementById("taskList");
    const addTaskBtn = document.getElementById("addTask");

    const alarmSound = document.getElementById("alarmSound");
    const themeToggle = document.getElementById("themeToggle");

    let tasks = [];

    /* ===== Load tasks from localStorage ===== */
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach(task => addTaskToDOM(task));
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function addTaskToDOM(task) {
        const li = document.createElement("li");
        li.className = task.done ? "done" : "";
        li.innerHTML = `
            <span class="task-info">${task.time} - ${task.text}</span>
            <div class="task-actions">
                <button class="done-btn">✅</button>
                <button class="delete-btn">🗑️</button>
            </div>
        `;

        // Mark as done
        li.querySelector(".done-btn").addEventListener("click", () => {
            task.done = !task.done;
            li.classList.toggle("done", task.done);
            saveTasks();
        });

        // Delete task
        li.querySelector(".delete-btn").addEventListener("click", () => {
            tasks = tasks.filter(t => t !== task);
            li.remove();
            saveTasks();
        });

        taskList.appendChild(li);
    }

    /* ===== Background images ===== */
    function setBackground(hour) {
        let bg;
        if (hour >= 5 && hour < 12) {
            bg = "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80";
        } else if (hour >= 12 && hour < 17) {
            bg = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80";
        } else if (hour >= 17 && hour < 20) {
            bg = "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=1600&q=80";
        } else {
            bg = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80";
        }
        document.body.style.backgroundImage = `url(${bg})`;
    }

    /* ===== Clock ===== */
    function updateClock() {
        const now = new Date();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let ampm = "AM";

        setBackground(h);

        if (h >= 12) {
            ampm = "PM";
            if (h > 12) h -= 12;
        }
        if (h === 0) h = 12;

        hoursEl.textContent = String(h).padStart(2,"0");
        minutesEl.textContent = String(m).padStart(2,"0");
        secondsEl.textContent = String(s).padStart(2,"0");
        ampmEl.textContent = ampm;

        dateEl.textContent = now.toDateString();

        checkTasks();
    }

    /* ===== Add Task ===== */
    addTaskBtn.addEventListener("click", () => {
        if (!taskText.value || !taskTime.value) {
            alert("Enter task and time");
            return;
        }

        const newTask = { text: taskText.value, time: taskTime.value, done: false };
        tasks.push(newTask);
        addTaskToDOM(newTask);
        saveTasks();

        taskText.value = "";
        taskTime.value = "";
    });

    /* ===== Task Reminder ===== */
    function checkTasks() {
        const now = new Date();
        const current = now.toTimeString().slice(0,5);

        tasks.forEach(task => {
            if (task.time === current && !task.done) {
                alarmSound.play();
                alert("⏰ Task Reminder: " + task.text);
                task.done = true;
                saveTasks();
                [...taskList.children].forEach(li => {
                    if(li.querySelector(".task-info").textContent.includes(task.text)) {
                        li.classList.add("done");
                    }
                });
            }
        });
    }

    /* ===== Theme toggle ===== */
 document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");

    // Check if element exists
    if(themeToggle){
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light");
            themeToggle.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
        });
    }

    // ... rest of your JS code (clock, tasks, etc)
});



    /* ===== Start clock ===== */
    updateClock();
    setInterval(updateClock, 1000);
});
