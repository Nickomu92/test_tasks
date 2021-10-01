<?php
    $filename = "/var/www/html/logs/access.txt";
    // Открываем файл для чтения
    $handle = fopen($filename, "r");
    // Получаем содержимое файла в строку
    $contents = fread($handle, filesize($filename));
    // Закрываем файл
    fclose($handle);
    // Открываем файл для записи
    $handle = fopen($filename, "w");
    // Записываем данные в файл
    fwrite($handle,  $contents);
    // Закрываем файл
    fclose($handle);
    echo "\nФайл перезаписан\n";
?>