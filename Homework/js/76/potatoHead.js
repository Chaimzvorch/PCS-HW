// --- DRAG & DROP LOGIC ---
let draggedElement = null;

// store original positions for reset
const originalPositions = new Map();

window.addEventListener("DOMContentLoaded", () => {
    const parts = document.querySelectorAll(".part");

    parts.forEach((part) => {
        // Save starting position in the panel
        originalPositions.set(part, { parent: part.parentElement });

        // Add a smooth transition for movement
        part.style.transition = "all 0.3s ease";
    });

    setupMusic(); // initialize music
});

// --- DRAG FUNCTIONS ---
function drag(event) {
    draggedElement = event.target;
    draggedElement.style.transition = "none"; // disable animation while dragging
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();

    const base = document.getElementById("potato-base");
    const rect = base.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Move the original element
    draggedElement.style.position = "absolute";
    draggedElement.style.left = `${x - 30}px`;
    draggedElement.style.top = `${y - 30}px`;
    draggedElement.style.transition = "all 0.3s ease"; // restore smooth movement

    // Append to potato base if not already there
    if (!base.contains(draggedElement)) {
        base.appendChild(draggedElement);
    }

    draggedElement = null;
}

// --- RESET FUNCTION ---
function resetParts() {
    const base = document.getElementById("potato-base");
    const panel = document.getElementById("parts-panel");

    const parts = base.querySelectorAll(".part");
    parts.forEach((part) => {
        // Smoothly move part back to the panel
        part.style.position = "static";
        panel.appendChild(part);
    });
}

// --- BACKGROUND MUSIC SETUP ---
function setupMusic() {
    const music = document.getElementById("bg-music");
    music.volume = 0;
    music.loop = true;
    music.autoplay = true;
    music.muted = true;

    const playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                // ✅ unmute & fade in gently
                setTimeout(() => {
                    music.muted = false;
                    let v = 0;
                    const fade = setInterval(() => {
                        if (v < 0.15) {
                            v += 0.01;
                            music.volume = v;
                        } else {
                            clearInterval(fade);
                        }
                    }, 200);
                }, 500);
            })
            .catch(() => {
                // ❌ If autoplay blocked, wait for user click
                console.log("Autoplay blocked — waiting for user interaction.");
                window.addEventListener(
                    "click",
                    () => {
                        music.muted = false;
                        music.volume = 0.15;
                        music.play();
                    },
                    { once: true }
                );
            });
    }
}

// --- MUTE / UNMUTE BUTTON ---
function toggleMusic() {
    const music = document.getElementById("bg-music");
    const button = document.getElementById("music-toggle");

    if (music.muted || music.volume === 0) {
        music.muted = false;
        music.volume = 0.15;
        button.textContent = "🔊 Mute Music";
    } else {
        music.muted = true;
        button.textContent = "🔇 Unmute Music";
    }
}
