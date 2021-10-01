/************************************************************************************
5. Есть функция primitiveMultiply, которая умножает числа, но случайным образом 
    может выбрасывать исключения типа: NotificationException, ErrorException. 
    Задача написать функцию обертку которая будет повторять вычисление при исключении 
    NotificationException, но прекращать работу при исключениях ErrorException.

    Пример:
    function NotificationException() {}
    function ErrorException() {}
    function primitiveMultiply(a, b) {
    const rand = Math.random();
    if (rand < 0.5) {
        return a * b;
    } else if(rand > 0.85) {
        throw new ErrorException()
    } else {
        throw new NotificationException()
    }
    }

    function reliableMultiply(a, b) {
    // Ваш код
    }
    console.log(reliableMultiply(8, 8));

****************************************************************************************/


function NotificationException() {}

function ErrorException() {}

function primitiveMultiply(a, b) {
    const rand = Math.random();

    if (rand < 0.5) {
        return a * b;
    } 

    else if(rand > 0.85) {
        throw new ErrorException()
    } 

    else {
        throw new NotificationException()
    }
}

// Функция-обертка, которая повторяет вычисление при исключении NotificationException, 
// но прекращает работу при исключениях ErrorException.
function reliableMultiply(a, b) {
    try {
        return primitiveMultiply(a, b); 
    }

    catch(exception) {
        // Если "наше исключение" принадлежит к NotificationException, то:
        if(exception instanceof NotificationException) {
            // Выводим предупреждающее сообщение, и
            console.warn("NotificationException: Просто уведомление");
            // Рекурсивно вызываем функцию
            return reliableMultiply(a, b);
        }
            
        // Если "наше исключение" принадлежит к ErrorException, то:
        else if(exception instanceof ErrorException) {
            // Выводит сообщение об ошибке
            console.error("ErrorException: Фатальная ошибка");
            // Возвращаем строку (можно конечно ничего не выводить, но тогда вызов функции в данном случае 
            // на строчке 74 вернет в консоль браузера "undefined")
            return "Упс, что-то пошло не по плану";
        }
    }   
}

console.log(reliableMultiply(8, 8));