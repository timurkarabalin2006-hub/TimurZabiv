let hour: number = 14; // создаём переменную hour (0–23

if (hour >= 6 && hour < 12) {
    console.log("Morning"); // с 6 до 11 → утро
} else if (hour >= 12 && hour < 18) {
    console.log("Afternoon"); // с 12 до 17 → день
} else if (hour >= 18 && hour < 24) {
    console.log("Evening"); // с 18 до 23 → вечер
} else {
    console.log("Night"); // с 0 до 5 → ночь
}
