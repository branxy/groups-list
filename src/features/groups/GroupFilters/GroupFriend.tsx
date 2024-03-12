import { Friend } from "./GroupFriendsList";

import type { FunctionComponent } from "react";

interface GroupFriendProps {
  friend: Friend;
}

const GroupFriend: FunctionComponent<GroupFriendProps> = ({ friend }) => {
  const { first_name, last_name } = friend;
  return (
    <span>
      {first_name} {last_name}
    </span>
  );
};

export default GroupFriend;
