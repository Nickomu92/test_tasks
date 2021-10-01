<?php
    $dir = '/var/www/html/images/';
    // Получаем список файлов и каталогов, расположенных по указанному пути
    $files = scandir($dir);

    for($i = 0; $i < count($files); $i++) {
        // Если не родительская директория . или .., то и
        if($files[$i] !== "." || $files[$i] !== ".." ) {
            // При помощи функции pathinfo() получим в массив информацию о пути файла
            $path_parts = pathinfo($files[$i]);
        
            if($path_parts['extension'] === "jpg") {
                // Выводим имя файла без пути и расширения
               echo $path_parts['filename'] . "\n";
            }
        }
    }
?>
