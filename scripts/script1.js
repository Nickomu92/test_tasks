/*************************************************************************************

1. Напишите функцию nodeChildCount которая получает на вход объект типа Node и возвращает 
    число всех вложенных нодов, аргумент deep указывать глубину подсчета если не указан то бесконечно.
    
    Пример:
    const div = document.createElement('div')
    const p = document.createElement('p')
    const span = document.createElement('span')
    p.appendChild(span)
    div.appendChild(p)

    nodeChildCount(div) // 2
    nodeChildCount(div, 1) // 1
    nodeChildCount(div, 2) // 2

 *******************************************************************************************/

const div = document.createElement('div');
div.innerHTML = '<p>Hello, world!</p>';
const p = document.createElement('p');
const p2 = document.createElement('p');
const p3 = document.createElement('p');
const span = document.createElement('span');
span.innerHTML = '<span><p>Some <span>text</span></p></span>';
const span2 = document.createElement('span');

p.appendChild(span);
p.appendChild(span2)
div.appendChild(p);
div.appendChild(p2);
div.appendChild(p3);

// Для визуализации структуры вложенности елементов в консоле браузера
document.body.appendChild(div);

/*
<div>
    <!-- Level 1 -->
    <p>Hello, world!</p>
    <p>
        <!-- Level 2 -->
        <span>
            <!-- Level 3 -->
            <span>
                <!-- Level 4 -->
                <p>Some 
                    <!-- Level 5 -->
                    <span>text</span>
                </p>
            </span>
        </span>
    </p>
    <p></p>
    <p></p>
</div>

*/

// Функция, которая получает на вход объект типа Node и возвращает 
// число всех вложенных нодов
function nodeChildCount(node, deep) {
    let count = 0;
    // Если аргумент deep предсставляет числовой тип, то делаем из него 
    // обратный счетчик для рекурсивного вызова функции
    if(!isNaN(deep))
        deep--;
    // Если аргумент deep не число (символ, строка и т.д.) 
    else
        deep = undefined;

    // Проверка на существование дочерних елементов в текущем Node(узле)
    if(node.hasChildNodes()) {
        let children = node.childNodes;

        for(let i = 0; i < children.length; i++) {
            // Если Node представляет елемент (div, span, p и т.д.), а не другой тип, 
            // например текст ("Hello, world!", "\n" и т.д.)
            if(children[i].nodeType === document.ELEMENT_NODE) {
                if(deep > 0 || deep === undefined)
                    // Рекурсивно получаем количество вложенных Nodes(узлов) элементов
                    count += nodeChildCount(children[i], deep);
                // Добавляем текущий Node(узел)
                count++;
            }
        }
    }
  
    return count;
}


console.log(`Without deep, node = div, result = ${nodeChildCount(div)}`);  // deep = undefined
console.log(`Deep = 1, node = div, result = ${nodeChildCount(div, 1)}`);    // deep = 1
console.log(`Deep = 2, node = div, result = ${nodeChildCount(div, 2)}`);    // deep = 2
console.log(`Deep = 3, node = div, result = ${nodeChildCount(div, 3)}`);    // deep = 3
console.log(`Deep = 4, node = div, result = ${nodeChildCount(div, 4)}`);    // deep = 4
console.log(`Deep = 5, node = div,  result = ${nodeChildCount(div, 5)}`);    // deep = 5
console.log(`Deep = "Hello", node = div, result = ${nodeChildCount(div, "Hello")}`);    // deep = undefined
console.log(`Without deep, node = span, result = ${nodeChildCount(span)}`);    // deep = undefined
console.log(`Without deep, node = p3, result = ${nodeChildCount(p3)}`);    // deep = undefined
