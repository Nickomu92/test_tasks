<?php
    $dir = '/var/www/html/logs/';
    // Получаем список файлов и каталогов, расположенных по указанному пути
    $files = scandir($dir);

	// Открываем файл для записи ( параметр "а" - будем досаписывать в конец файла)
	$fp = fopen($dir . "dict.txt", "a");
	 
    for($i = 0; $i < count($files); $i++) {
        // Если не родительская директория . или .., то и
        if($files[$i] !== "." || $files[$i] !== "..") {
            // При помощи функции pathinfo() получим в массив информацию о пути файла
            $path_parts = pathinfo($files[$i]);
        
            if($path_parts['extension'] === "txt") {
                // Если не файл dict.txt в котором храним связи старое имя => новое имя, то
                if($path_parts['filename'] !== "dict") {
                    // Переменная для хранения старого имени файла
                    $old_file_name = $path_parts['basename'];
                    // Переменная для хранения нового имени файла
                    $new_file_name = md5($path_parts['filename']) . "." . $path_parts['extension'];
                    // Строка для хранения связи старого и нового имен файлов
                    // формат сохранения (access.txt => 9df3b01c60df20d13843841ff0d4482c.txt)
                    $text = $old_file_name . ' => ' . $new_file_name ."\n";  
                    // Записываем данные в открытый файл
                    fwrite($fp,  $text);
                    // Переименовываем файл
                    rename($dir . $old_file_name, $dir . $new_file_name);
                }
            }
        }
    }

	// Закрываем файл, чтоб освободить его 
	fclose($fp);
?>