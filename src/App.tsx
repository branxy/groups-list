import "./App.css";
import GroupFiltersList from "./features/groups/GroupFilters/GroupFiltersList";
import GroupCard from "./features/groups/GroupFilters/GroupCard";
import useGroups from "./hooks/useGroups";
import { useState } from "react";

export interface GroupFilters {
  isClosed: boolean | null;
  avatarColor: string | null;
  hasFriends: boolean | null;
}

// <App /> состоит из:
// 1. Кастомный хук useGroups()—отвечает за сетевые запросы списка групп с сервера supabase
// 2. Хук useState с объектом списка фильтров
// 3. Переменная filteredGroups—фильтрует оригинальный стейт групп
// 4. Рендер панели фильтров и отфильтрованных групп

function App() {
  const [groups, isLoading, error] = useGroups();
  const [groupFilters, setGroupFilters] = useState<GroupFilters>({
    isClosed: null,
    avatarColor: null,
    hasFriends: null,
  });
  let groupsContent;

  // Как работает фильтрация ниже:
  // 1. Объект с фильтрами (groupFilters) конвертируется в массив, состоящий из массивов типа ["filterName", value] с помощью Object.entries()
  // 2. Загруженные с сервера группы фильтруются (groups.filter) по условию, где свойства каждой группы должны соответствовать каждому из фильтров массива (flattenedFilters.every())
  // 3. Время фильтрации ~0.02мс, поэтому не стал оборачивать в useMemo()
  const flattenedFilters = Object.entries(groupFilters);
  const filteredGroups = groups?.filter((group) => {
    return flattenedFilters.every(([filterName, value]) => {
      if (value === null) {
        return true;
      }

      switch (filterName) {
        case "isClosed":
          return value ? group.closed : !group.closed;
        case "avatarColor":
          return group.avatar_color === value;
        case "hasFriends":
          if (value && group.friends) {
            return group.friends.length > 0;
          } else if (!value) {
            return group.friends?.length === 0 || !group.friends;
          }
          break;
        default:
          return true;
      }
    });
  });

  const hasGroups = groups && filteredGroups && filteredGroups.length > 0;

  // Если отфильтрованных групп больше 0, отрендерить их, а если меньше 0, отрендерить фразу "Групп не найдено"
  if (hasGroups) {
    groupsContent = (
      <div className="groups">
        {filteredGroups
          .sort((a, b) => a.id - b.id)
          .map((group) => (
            <GroupCard key={group.id} {...group} />
          ))}
      </div>
    );
  } else if (filteredGroups?.length === 0) {
    groupsContent = <p>Групп не найдено</p>;
  }

  return (
    <div className="App">
      {isLoading && <p>Загрузка...</p>}
      {error && <p>Ошибка загрузки групп: {error}</p>}
      <div className="groups-list">
        {groups && (
          <GroupFiltersList groups={groups} setGroupFilters={setGroupFilters} />
        )}
        {!isLoading && groupsContent}
      </div>
    </div>
  );
}

export default App;
