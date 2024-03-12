import GroupHeading from "./GroupHeading";
import GroupFollowers from "./GroupFollowers";

import type { FunctionComponent } from "react";
import type { Group } from "../../../hooks/useGroups";

// <GroupCard /> состоит из:
// 1. Функция getSuffix() для определения окончания слова "подписчики"
// 2. Рендер карточки группы согласно ТЗ

const GroupCard: FunctionComponent<Group> = (props) => {
  const { id, name, closed, avatar_color, members_count, friends } = props;
  const avatarColor = avatar_color ? avatar_color : null;

  function getSuffix(count: number) {
    const lastTwoDigits = count % 100;
    const lastDigit = count % 10;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return "подписчиков";
    }

    if (lastDigit === 1) {
      return "подписчик";
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return "подписчика";
    }

    return "подписчиков";
  }

  const suffix = getSuffix(members_count);
  const membersCount = `${members_count} ${suffix}`;

  return (
    <div className="group">
      {avatarColor && (
        <div className="avatar" style={{ backgroundColor: avatarColor }}></div>
      )}
      <div className="info">
        <GroupHeading id={id} name={name} closed={closed} />
        <GroupFollowers membersCount={membersCount} friends={friends} />
      </div>
    </div>
  );
};

export default GroupCard;
