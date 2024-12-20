export function shuffleArray(array) {
  // Копируем массив, чтобы не изменять оригинальный
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Генерируем случайный индекс от 0 до i
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Меняем местами элемент arr[i] и элемент arr[randomIndex]
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
  }

  return shuffledArray;
}