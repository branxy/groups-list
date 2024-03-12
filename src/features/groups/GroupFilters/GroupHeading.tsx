import type { FunctionComponent } from "react";
import type { Group } from "../../../hooks/useGroups";

interface GroupHeadingProps {
  id: Group["id"];
  name: Group["name"];
  closed: Group["closed"];
}

const GroupHeading: FunctionComponent<GroupHeadingProps> = ({
  id,
  name,
  closed,
}) => {
  return (
    <div className="heading">
      <div className="title">
        <span>{`${id}. ${name}`}</span>
      </div>
      {closed && (
        <div className="closed">
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2_1315)">
              <path
                d="M6 0.583332C7.933 0.583332 9.5 2.14261 9.5 4.07399V5.83217L10.3728 5.83333C10.8573 5.83333 11.25 6.22974 11.25 6.71989V11.9468C11.25 12.4364 10.8512 12.8333 10.3728 12.8333H1.62716C1.14272 12.8333 0.75 12.4369 0.75 11.9468V6.71989C0.75 6.23026 1.14879 5.83333 1.62716 5.83333L2.5 5.83217V4.0847C2.5 2.22001 3.96073 0.695772 5.79474 0.589276L6 0.583332ZM6 2.33333L5.83041 2.34134C4.93807 2.42614 4.25 3.17369 4.25 4.08333V5.83333H7.75V4.08333C7.75 3.1101 6.9665 2.33333 6 2.33333Z"
                fill="#5C9CE6"
              />
            </g>
            <defs>
              <clipPath id="clip0_2_1315">
                <rect width="12" height="13" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      )}
    </div>
  );
};

export default GroupHeading;
