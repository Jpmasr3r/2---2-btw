const { invoke } = window.__TAURI__.core;

async function update_display(display, label, clear) {
    return await invoke("update_display", { display: display, label: label, clear: clear });
}

async function result(display) {
    return await invoke("result", { display: display });
}

window.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    // display.innerHTML = "0";
    const buttonsContainer = document.querySelector(".buttons");

    const layout = [
        { label: "C", id: "clear" },
        { label: "(", id: null },
        { label: ")", id: null },
        { label: "/", id: null },

        { label: "7", id: null },
        { label: "8", id: null },
        { label: "9", id: null },
        { label: "*", id: null },

        { label: "4", id: null },
        { label: "5", id: null },
        { label: "6", id: null },
        { label: "-", id: null },

        { label: "1", id: null },
        { label: "2", id: null },
        { label: "3", id: null },
        { label: "+", id: null },

        { label: "0", id: null },
        { label: ".", id: null },
        { label: "=", id: null },
        { label: "%", id: null }
    ];

    layout.forEach(({ label, id }) => {
        const btn = document.createElement("button");
        btn.textContent = label;
        if (id) btn.id = id;
        buttonsContainer.appendChild(btn);

        btn.addEventListener("click", async () => {
            if (label === "=") {
                display.value = await result(display.value);
            } else {
                display.value = await update_display(display.value, label, label === "C");
            }
        });
    });
});
