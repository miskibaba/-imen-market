const input = document.getElementById("searchInput");
const list = document.getElementById("autocompleteList");
let lastScript = null;

/* SADECE MARKETLE ALAKALI KELİMELER */
const allowedKeywords = [
    // GIDA
    "yağ","şeker","un","pirinç","bulgur","makarna","salça",
    "süt","yoğurt","peynir","yumurta","çay","kahve","kola",
    "bisküvi","çikolata","bakliyat",

    // TEMİZLİK
    "deterjan","çamaşır","bulaşık","temizlik","sabun",
    "şampuan","çamaşır suyu","yumuşatıcı",

    // TEKNOLOJİ / ELEKTRİK
    "ampul","uzatma kablosu","pil","priz","anahtar",
    "şarj","kablo","elektrik"
];

if (input) {
    input.addEventListener("input", () => {
        const q = input.value.trim().toLowerCase();

        list.innerHTML = "";
        list.style.display = "none";

        if (q.length < 2) return;

        if (lastScript) lastScript.remove();

        const script = document.createElement("script");
        script.src =
            "https://suggestqueries.google.com/complete/search" +
            "?client=firefox&q=" +
            encodeURIComponent(q) +
            "&callback=showSuggestions";

        lastScript = script;
        document.body.appendChild(script);
    });
}

function showSuggestions(data) {
    const suggestions = data[1];
    list.innerHTML = "";

    const filtered = suggestions.filter(item =>
        allowedKeywords.some(word =>
            item.toLowerCase().includes(word)
        )
    );

    if (!filtered.length) {
        list.style.display = "none";
        return;
    }

    filtered.forEach(text => {
        const li = document.createElement("li");
        li.textContent = text;

        li.onclick = () => {
            input.value = text;
            list.style.display = "none";
        };

        list.appendChild(li);
    });

    list.style.display = "block";
}

document.addEventListener("click", e => {
    if (!e.target.closest(".search-box")) {
        list.style.display = "none";
    }
});
