/************************************************************************
 
4. Сделать функцию mapper которая на вход принимает набор правил для преобразования данных.
    Формат правила:

    [<поле которое преобразовуем>, <новое название поля>[, <функция для преобразования значения>]]
    Пример:
    let testData3 = [{"name":"Vasya","email":"vasya@example.com","age":20,"skills":{"php":0,"js":-1,"madness":10,"rage":10}},
    {"name":"Dima","email":"dima@example.com","age":34,"skills":{"php":5,"js":7,"madness":3,"rage":2}},
    {"name":"Colya","email":"colya@example.com","age":46,"skills":{"php":8,"js":-2,"madness":1,"rage":4}},
    {"name":"Misha","email":"misha@example.com","age":16,"skills":{"php":6,"js":6,"madness":5,"rage":2}},
    {"name":"Ashan","email":"ashan@example.com","age":99,"skills":{"php":0,"js":10,"madness":10,"rage":1}},
    {"name":"Rafshan","email":"rafshan@example.com","age":11,"skills":{"php":0,"js":0,"madness":0,"rage":10}}]

    const mapRules = [
    ["name", "n", (value) => value.toLowerCase()],
    ["age", "a"]
    ]

    testData3.map(mapper(mapRules)) // 
    [{"n":"vasya","a":20},
    {"n":"dima","a":34},
    {"n":"colya","a":46},
    {"n":"misha","a":16},
    {"n":"ashan","a":99},
    {"n":"rafshan","a":11}]
 
 ***********************************************************************/

let testData3 = [
        {"name":"Vasya","email":"vasya@example.com","age":20,"skills":{"php":0,"js":-1,"madness":10,"rage":10}},
        {"name":"Dima","email":"dima@example.com","age":34,"skills":{"php":5,"js":7,"madness":3,"rage":2}},
        {"name":"Colya","email":"colya@example.com","age":46,"skills":{"php":8,"js":-2,"madness":1,"rage":4}},
        {"name":"Misha","email":"misha@example.com","age":16,"skills":{"php":6,"js":6,"madness":5,"rage":2}},
        {"name":"Ashan","email":"ashan@example.com","age":99,"skills":{"php":0,"js":10,"madness":10,"rage":1}},
        {"name":"Rafshan","email":"rafshan@example.com","age":11,"skills":{"php":0,"js":0,"madness":0,"rage":10}}             
];
    
const mapRules = [
    ["name", "n", (value) => value.toLowerCase()],
    ["age", "a"]
];

// Функция mapper (точнее замыкание), которая на вход принимает набор правил для преобразования данных
function mapper(arrRules, i) {
    let strObj = "";

    function innerMapper() {
        // Создаём коллекцию в которой будем хранить необходимые поля для создания нового объекта
        let map = new Map();

        for(let item of arrRules) {
            // Если в формате правила указаны <поле которое преобразовуем> и <новое название поля>,то
            if(item[0] !== undefined && item[1] !== undefined) 
                // Преобразовываем объект в строку, меняем название поля при помощи регулярных выражений
                // и преобразовывем строку снова в обьект
                i = JSON.parse(JSON.stringify(i).replace(new RegExp(item[0], "g"), item[1]));
            

            // Если в формате правила указана <функция для преобразования значения>, то выполняем её
            if(item[2] !== undefined) {
                const func = eval(item[2]);
                i[item[1]] = func(i[item[1]]);
            }

            // Заполняем коллекцию
            for (let key in i) {
                if(key == item[1]) {
                    map.set(`${key}`, i[key]);
                }  
            }
        }

        // При помощи метода Object.fromEntries() создаем новый объект с необходимыми полями(ключ значение)
        i = Object.fromEntries(map.entries());
        strObj += JSON.stringify(i);
        return JSON.parse(strObj);
    }
    
    return innerMapper();
}

console.log("Аутентичный массив объектов:");
console.log(testData3);

let testData4 = testData3.map( i => mapper(mapRules, i));
console.log("Массив объектов со списком правил №1:");
console.log(testData4);


const mapRules2 = [
    ["name", "FirstName", (value) => value.toUpperCase()],
    ["email", "мыло", (value) => value.toUpperCase()],
    ["skills", "Навыки", function(value) {value["php"] += 10; value.js *= 3; return value;}],
    ["age", "Возр.", function(value) {return value + 100;}]

];

let testData5 = testData3.map( i => mapper(mapRules2, i));
console.log("Массив объектов со списком правил №2:");
console.log(testData5);