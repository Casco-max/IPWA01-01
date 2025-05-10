// Prüfe die Sprache des Browsers
document.addEventListener("DOMContentLoaded", () => {
    const rtlLanguages = ['ar', 'he', 'fa', 'ur']; // Arabisch, Hebräisch, Persisch, Urdu
    const userLang = navigator.language || navigator.userLanguage;
    const menu = document.getElementById('menu');

    // Wenn die Sprache zu den RTL-Sprachen gehört: Schreibrichtung ändern
    if (menu) {
        if (rtlLanguages.some(lang => userLang.startsWith(lang))) {
            menu.setAttribute('dir', 'rtl');
        } else {
            menu.setAttribute('dir', 'ltr');
        }
    }

    // EventListener für die Pfeile zum Sortieren hinzufügen
    document.getElementById("sortLand").addEventListener("click", () => {
        sortiereNachLand();
    });

    document.getElementById("sortUnternehmen").addEventListener("click", () => {
        sortiereNachUnternehmen();
    });

    // Daten aus der JSON-Datei in die Tabelle integrieren
    fetch("tabelle.json")
        .then(res => res.json())
        .then(json => {
            daten = json;
            render(daten);
        });

    // Suchfunktion
    const suchfeld = document.querySelector("#suche");
    suchfeld.addEventListener("input", () => {
        const begriff = suchfeld.value.toLowerCase();

        const gefiltert = daten.filter(p =>
            p.land.toLowerCase().includes(begriff) ||
            p.unternehmen.toLowerCase().includes(begriff)
        );

        render(gefiltert);
    });
});

// Sortierung nach Land
let sortOrderLand = "asc";
function sortiereNachLand() {
    const gefiltert = [...daten].sort((a, b) => {
        const landA = a.land.toLowerCase();
        const landB = b.land.toLowerCase();
        return sortOrderLand === "asc" ? landA.localeCompare(landB) : landB.localeCompare(landA);
    });
    render(gefiltert);
    toggleSortIcon("land");
}

// Sortierung nach Unternehmen
let sortOrderUnternehmen = "asc";
function sortiereNachUnternehmen() {
    const gefiltert = [...daten].sort((a, b) => {
        const unternehmenA = a.unternehmen.toLowerCase();
        const unternehmenB = b.unternehmen.toLowerCase();
        return sortOrderUnternehmen === "asc" ? unternehmenA.localeCompare(unternehmenB) : unternehmenB.localeCompare(unternehmenA);
    });
    render(gefiltert);
    toggleSortIcon("unternehmen");
}

// Funktion, um die Pfeile zu ändern
function toggleSortIcon(column) {
    const iconLand = document.getElementById("sortLand");
    const iconUnternehmen = document.getElementById("sortUnternehmen");

    if (column === "land") {
        sortOrderLand = sortOrderLand === "asc" ? "desc" : "asc";
        iconLand.classList.toggle("asc", sortOrderLand === "asc");
        iconLand.classList.toggle("desc", sortOrderLand === "desc");
    }

    if (column === "unternehmen") {
        sortOrderUnternehmen = sortOrderUnternehmen === "asc" ? "desc" : "asc";
        iconUnternehmen.classList.toggle("asc", sortOrderUnternehmen === "asc");
        iconUnternehmen.classList.toggle("desc", sortOrderUnternehmen === "desc");
    }
}

// Rendern der Tabelle
function render(array) {
    const tbody = document.querySelector("#tabelle-content");
    tbody.innerHTML ="";
    array.forEach(p => {
        const tr = document.createElement("tr");

        const tdLand = document.createElement("td");
        tdLand.textContent = p.land;

        const tdUnternehmen = document.createElement("td");
        tdUnternehmen.textContent = p.unternehmen;

        const tdEmissionen = document.createElement("td");
        tdEmissionen.textContent = p.emissionen;

        tr.appendChild(tdLand);
        tr.appendChild(tdUnternehmen);
        tr.appendChild(tdEmissionen);

        tbody.appendChild(tr);
    });
}

