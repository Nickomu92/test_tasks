/**********************************************************************
 2. Напишите функцию генератор chunkArray которая возвращает итератор возвращающий части массива указанной длинны. 
    Пример:
    const iterator = chunkArray([1,2,3,4,5,6,7,8], 3);
    iterator.next() // { value: [1,2,3], done: false }
    iterator.next() // { value: [4,5,6], done: false }
    iterator.next() // { value: [7,8], done: false }
    iterator.next() // { value: undefined, done: true }

 **********************************************************************/

// Функция-генератор, которая возвращает части массива указанной длинны. 
function* chunkArray(array, arraySliceLength) {
    for(let i = 0, count = 0; i < array.length; i++, count++) {
        // Если получили часть массива указанной длинны
        if(count === arraySliceLength) {
            count = 0;
            yield array.slice(i - arraySliceLength, i);
        }

        // Если дошли до конца массива и не получили часть массива указанной длинны
        if(i === array.length - 1)
            yield array.slice(i - count);
    }

    return array[array.length + 1];
}


// Выводим результат 
const iterator = chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3);
console.log("Обычный вывод результата:");
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());


console.log("Вывод результата для ленивых:");
// Самовызывающаяся функция 
(function funcCallCount(genFunc, count) {
    for(let i = 0; i < count; i++) {
        console.log(genFunc.next());
    }
}(chunkArray(["a", "b", "c", "d", "e", "f", "g", "h", "i", "w"], 4), 5));