// Pobieranie elementów DOM
const inputField = document.querySelector("#textInput"); // Pole tekstowe input
const characterKeys = document.querySelectorAll(".key"); // Klawisze znaków
const functionKeys = document.querySelectorAll(".controlButton"); // Funkcyjne klawisze kontrolne
const digitRow = document.querySelector(".numberKeys"); // Wiersz z cyframi
const spaceBar = document.querySelector(".spaceBar"); // Klawisz spacji
const delKey = document.querySelector(".del"); // Klawisz Delete

// Definicja funkcji do podświetlania klawiszy
const highlightKey = (keyChar, highlight) => {
    let key;
    // Sprawdzanie, który klawisz ma zostać podświetlony
    if (keyChar === " ") {
        key = spaceBar; // Dla spacji
    } else if (keyChar === "Backspace" || keyChar === "Delete") {
        key = delKey; // Dla Backspace lub Delete
    } else if (!isNaN(keyChar) && keyChar !== " ") {
        // Dla cyfr
        key = Array.from(digitRow.querySelectorAll("span")).find(k => k.textContent === keyChar);
    } else {
        // Dla liter
        key = Array.from(characterKeys).find(
            k => k.textContent.toLowerCase() === keyChar.toLowerCase());
    }
    
    // Podświetlenie lub usunięcie podświetlenia klawisza
    if (key) {
        if (highlight) {
            key.classList.add('highlight'); // Dodanie klasy podświetlenia
        } else {
            key.classList.remove('highlight'); // Usunięcie klasy podświetlenia
        }
    }
};

// Funkcja do przewijania tekstu w polu input
const scrollTextInput = () => {
    inputField.scrollLeft = inputField.scrollWidth; // Przewijanie tekstu w input, aby ostatnie znaki były widoczne
};

// Obsługa kliknięć na klawisze znaków
characterKeys.forEach((character) => {
    character.addEventListener("click", () => {
        inputField.value += character.textContent; // Dodanie znaku do input
        scrollTextInput(); // Przewijanie tekstu
    });
});

// Obsługa kliknięć na cyfry
digitRow.querySelectorAll("span").forEach((digit) => {
    digit.addEventListener("click", () => {
        inputField.value += digit.textContent; // Dodanie cyfry do input
        scrollTextInput(); // Przewijanie tekstu
    });
});

// Obsługa kliknięć na klawisze funkcyjne
functionKeys.forEach((funcKey) => {
    funcKey.addEventListener("click", () => {
        switch (true) {
            case funcKey.classList.contains("del"):
                // Kasowanie ostatniego znaku w input
                inputField.value = inputField.value.substring(0, inputField.value.length - 1);
                scrollTextInput(); // Przewijanie tekstu
                break;

            case funcKey.classList.contains("spaceBar"):
                // Dodanie spacji do input
                inputField.value += " ";
                scrollTextInput(); // Przewijanie tekstu
                break;

            case funcKey.classList.contains("toggleNumbers"):
                // Pokazanie/ukrycie cyfr
                funcKey.classList.toggle("show-numbers");
                digitRow.style.display = funcKey.classList.contains("show-numbers") ? "flex" : "none";
                break;
        }
    });
});

// Obsługa zdarzeń klawiatury
document.addEventListener("keydown", (event) => {
    // Obsługa klawiszy Backspace i Delete
    if (event.key === "Backspace" || event.key === "Delete") {
        inputField.value = inputField.value.substring(0, inputField.value.length - 1);
        event.preventDefault(); // Zapobieganie domyślnej akcji
    } else if (!event.repeat && event.key.length === 1) {
        // Dodanie wciśniętego znaku do input
        inputField.value += event.key;
    }

    highlightKey(event.key, true); // Podświetlenie odpowiedniego klawisza
    scrollTextInput(); // Przewijanie tekstu
});

document.addEventListener("keyup", (event) => {
    highlightKey(event.key, false); // Usunięcie podświetlenia klawisza
});



