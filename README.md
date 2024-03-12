# Список сообществ с фильтрами (React, TypeScript, Supabase)

Приложении при открытии запрашивает список групп с сервера [supabase](https://supabase.com/).

## Установка:

Для запуска полной локальной копии потребуется бесплатный аккаунт в [Supabase](https://supabase.com/dashboard/new?plan=free). Рабочая демо доступна [здесь]().

1. Клонировать репозиторий (или скачать ZIP):

```
git clone https://github.com/branxy/groups-list.git
```

2. Перейти в проект:

```
cd groups-list
```

3. Установить зависимости:

```
npm i
```

4. Войти в [дэшборд](https://supabase.com/dashboard/) supabase, создать новый проект, создать таблицу `groups`:

```sql
create table
  public.groups (
    id bigint not null,
    name text not null,
    closed boolean not null,
    avatar_color text null,
    members_count bigint not null,
    friends jsonb null,
    constraint groups_pkey primary key (id),
    constraint groups_id_key unique (id)
  ) tablespace pg_default;
```

5. Импортировать в таблицу данные групп (файл проекта groups_rows.csv):

```csv
id,name,closed,avatar_color,members_count,friends
2,Собачки,false,green,147,
5,Мишки,true,red,4,
8,Зайки,false,white,777,
14,Птички,true,blue,23,
10,Утконосы,true,,0,
1,Котики,false,red,457,"[{""last_name"":""Петрова"",""first_name"":""Маша""},{""last_name"":""Агапов"",""first_name"":""Фёдор""},{""last_name"":""Петрова"",""first_name"":""Вера""}]"
3,Бабочки,true,yellow,2,"[{""last_name"":""Гончаров"",""first_name"":""Василий""}]"
4,Утята,false,blue,88,"[{""last_name"":""Пивоварова"",""first_name"":""Маша""},{""last_name"":""Кот"",""first_name"":""Илья""}]"
6,Улитки,true,,99,"[{""last_name"":""Петрова"",""first_name"":""Маша""}]"
7,Выдры,false,purple,5,"[{""last_name"":""Харитонова"",""first_name"":""Ирина""},{""last_name"":""Самсонов"",""first_name"":""Владислав""},{""last_name"":""Антонов"",""first_name"":""Сергей""}]"
9,Кролики,true,yellow,8,"[{""last_name"":""Елец"",""first_name"":""Даша""}]"
11,Куропатки,false,red,33,"[{""last_name"":""Петрова"",""first_name"":""Зоя""},{""last_name"":""Зайцева"",""first_name"":""Марфа""}]"
12,Козлики,false,,7,"[{""last_name"":""Самсонова"",""first_name"":""Катя""}]"
13,Тигры,false,orange,11,"[{""last_name"":""Лещенко"",""first_name"":""Лев""},{""last_name"":""Бондарчук"",""first_name"":""Фёдор""},{""last_name"":""Брежнева"",""first_name"":""Вера""}]"
```

6. Задать таблице Row Level Security из шаблона: "Enable read access for all users"

7. Создать в проекте файл `.env.local` и добавить ключи supabase (доступны в дэшборде проекта supabase по адресу Project Settings/API):

```
VITE_SUPABASE_URL=project_url
VITE_SUPABASE_KEY=api_key
```
8. Запуск:
```
npm run dev
```
