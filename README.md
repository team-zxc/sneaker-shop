# sneaker-shop

# Для запуска сервера:
1) Установить poetry на свой python с версией > 3.8;
2) Запуск из директории с файлом ./server/lookout команды: python poetry update,
если запущено вирт. окружение poetry, то команда будет выглядеть: poetry update;
3) Создать базу и пользователя:
   * Установить PostreSQL и создать там пользователя;
   * Создать БД;
   * Прописать в файл settings.py настройки для базы.
4) Создать миграции: python manage.py makemigrations;
5) Применить миграции на БД: python manage.py migrate;
6) Создать суперпользователя Django: python manage.py createsuperuser;
7) Запуск проекта: python manage.py runserver.

