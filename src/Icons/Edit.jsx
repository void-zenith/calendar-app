import React from "react";
const Edit = (props) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={props.onClick}
    >
      <circle cx="15" cy="15" r="15" fill="#363865" />
      <path
        d="M7.88144 23C7.75963 22.9998 7.6392 22.9742 7.52781 22.9249C7.41641 22.8756 7.31649 22.8037 7.23439 22.7137C7.15081 22.6245 7.08703 22.5186 7.04724 22.4029C7.00744 22.2873 6.99254 22.1646 7.00349 22.0428L7.21859 19.6769L17.1552 9.74108L20.2605 12.8464L10.3265 22.7813L7.96133 22.9965C7.93477 22.9989 7.90811 23.0001 7.88144 23ZM20.8804 12.2255L17.7759 9.1202L19.6381 7.25756C19.7196 7.17591 19.8164 7.11114 19.923 7.06694C20.0296 7.02275 20.1438 7 20.2592 7C20.3746 7 20.4888 7.02275 20.5954 7.06694C20.702 7.11114 20.7988 7.17591 20.8804 7.25756L22.7425 9.1202C22.8241 9.20176 22.8889 9.29862 22.9331 9.40523C22.9773 9.51184 23 9.62611 23 9.74152C23 9.85693 22.9773 9.9712 22.9331 10.0778C22.8889 10.1844 22.8241 10.2813 22.7425 10.3628L20.8813 12.2246L20.8804 12.2255Z"
        fill="white"
      />
    </svg>
  );
};

export default Edit;