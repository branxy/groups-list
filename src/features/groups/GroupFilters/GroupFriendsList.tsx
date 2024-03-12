import GroupFriend from "./GroupFriend";

import { type FunctionComponent, useState } from "react";

interface GroupFriendsListProps {
  friends: Friend[];
  friendsCount: string;
}

export interface Friend {
  first_name: string;
  last_name: string;
}
const GroupFriendsList: FunctionComponent<GroupFriendsListProps> = ({
  friends,
  friendsCount,
}) => {
  const [showFriends, setShowFriends] = useState(false);

  return (
    <div className="friends">
      <button id="open-friends" onClick={() => setShowFriends(!showFriends)}>
        <div className="svg">
          <svg
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3" cy="3" r="3" fill="#5C9CE6" />
          </svg>
        </div>
        <span>{friendsCount}</span>
      </button>
      {showFriends && (
        <div className="friends-list">
          {friends.map((friend) => {
            const key = `${friend.first_name}-${friend.last_name}-${Math.floor(
              Math.random() * 1000
            )}`;
            return <GroupFriend key={key} friend={friend} />;
          })}
        </div>
      )}
    </div>
  );
};

export default GroupFriendsList;
