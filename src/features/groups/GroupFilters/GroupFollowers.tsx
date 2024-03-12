import GroupFriendsList from "./GroupFriendsList";

import type { FunctionComponent } from "react";
import type { Group } from "../../../hooks/useGroups";

interface GroupFollowersProps {
  membersCount: string;
  friends: Group["friends"];
}

// <GroupFollowers /> состоит из:
// 1. Функция getFriendSuffix(): определяет окончание слова "друзей" для разных числовых значений
// 2. Рендер данных о количестве подписчиков и количестве друзей

const GroupFollowers: FunctionComponent<GroupFollowersProps> = ({
  membersCount,
  friends,
}) => {
  const hasFriends = Array.isArray(friends);

  function getFriendSuffix(count: number): string {
    const lastTwoDigits = count % 100;
    const lastDigit = count % 10;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return "друзей";
    }

    if (lastDigit === 1) {
      return "друг";
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return "друга";
    }

    return "друзей";
  }

  const suffix = hasFriends && getFriendSuffix(friends.length);
  const friendsCount = `${hasFriends && friends.length} ${suffix}`;
  return (
    <div className="followers">
      <span>{membersCount}</span>
      {hasFriends && (
        <GroupFriendsList friends={friends} friendsCount={friendsCount} />
      )}
    </div>
  );
};

export default GroupFollowers;
