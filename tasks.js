// Načtení úkolů z localStorage při načtení stránky
document.addEventListener("DOMContentLoaded", loadTasks);

// Funkce pro přidání nového úkolu do kategorie
function addTask(category) {
    const input = document.getElementById(`input-${category}`);
    const taskText = input.value.trim();

    if (taskText === "") return; // Ověření, že úkol není prázdný

    // Získání aktuálních úkolů z localStorage
    let tasks = JSON.parse(localStorage.getItem(category)) || [];
    tasks.push(taskText);

    // Uložení nového seznamu úkolů do localStorage
    localStorage.setItem(category, JSON.stringify(tasks));

    // Přidání úkolu do HTML
    renderTask(category, taskText);

    // Vyprázdnění vstupního pole
    input.value = "";
}

// Funkce pro načtení všech úkolů z localStorage
function loadTasks() {
    ['category-1', 'category-2', 'category-3'].forEach(category => {
        const tasks = JSON.parse(localStorage.getItem(category)) || [];
        tasks.forEach(task => renderTask(category, task));
    });
}

// Funkce pro zobrazení úkolu v HTML
function renderTask(category, taskText) {
    const taskList = document.getElementById(`tasks-${category}`);
    const taskItem = document.createElement("li");

    taskItem.className = "list-group-item d-flex justify-content-between align-items-center";
    taskItem.textContent = taskText;

    // Tlačítko pro odstranění úkolu
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.textContent = "Smazat";
    deleteButton.onclick = function () {
        removeTask(category, taskText, taskItem);
    };

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

// Funkce pro odstranění úkolu
function removeTask(category, taskText, taskItem) {
    // Získání aktuálních úkolů z localStorage a odstranění vybraného úkolu
    let tasks = JSON.parse(localStorage.getItem(category)) || [];
    tasks = tasks.filter(task => task !== taskText);

    // Uložení aktualizovaného seznamu úkolů do localStorage
    localStorage.setItem(category, JSON.stringify(tasks));

    // Odebrání úkolu z HTML
    taskItem.remove();
}
