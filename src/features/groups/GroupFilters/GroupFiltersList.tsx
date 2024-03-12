import { GroupFilters } from "../../../App";

import type { FunctionComponent } from "react";
import type { Groups } from "../../../hooks/useGroups";

interface GroupFiltersListProps {
  groups: Groups;
  setGroupFilters: React.Dispatch<React.SetStateAction<GroupFilters>>;
}

// <GroupFiltersList /> состоит из:
// 1. Переменная colors: извлекает список используемых цветов аватарок из полученного с сервера списка групп (groups.reduce())
// 2. Рендер трех <select> элементов с фильтрами

const GroupFiltersList: FunctionComponent<GroupFiltersListProps> = ({
  groups,
  setGroupFilters,
}) => {
  const colors = [
    ...new Set(
      groups.reduce((sum, group) => {
        if (group.avatar_color) {
          sum.push(group.avatar_color);
        }
        return sum;
      }, [] as string[])
    ),
  ];

  return (
    <div className="filters">
      <div className="select">
        <label htmlFor="private">Приватность</label>
        <select
          name="private"
          autoFocus
          onChange={(e) =>
            setGroupFilters((prev) => {
              return { ...prev, isClosed: JSON.parse(e.target.value) };
            })
          }
        >
          <option value="null">все</option>
          <option value="false">открытая</option>
          <option value="true">закрытая</option>
        </select>
      </div>
      <div className="select">
        <label htmlFor="avatar-color">Цвет аватарки</label>
        <select
          name="avatar-color"
          onChange={(e) =>
            setGroupFilters((prev) => {
              const value = e.target.value === "null" ? null : e.target.value;
              return { ...prev, avatarColor: value };
            })
          }
        >
          <option value="null">любой</option>
          {colors.map((color) => {
            return (
              <option key={color} value={color}>
                {color}
              </option>
            );
          })}
        </select>
      </div>
      <div className="select">
        <label htmlFor="has-friends">Наличие друзей</label>
        <select
          name="has-friends"
          onChange={(e) =>
            setGroupFilters((prev) => {
              return {
                ...prev,
                hasFriends: JSON.parse(e.target.value),
              };
            })
          }
        >
          <option value="null">все</option>
          <option value="true">да</option>
          <option value="false">нет</option>
        </select>
      </div>
    </div>
  );
};

export default GroupFiltersList;
