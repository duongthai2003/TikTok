import styles from "./BackBtn.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { profilepage } from "~/page/Profile/Profile";
import { useRef } from "react";

const cx = classNames.bind(styles);

function BackBtn({}) {
  const ar = [1, 23, 3];
  const backpageRef = useRef();
  const handleback = () => {
    backpageRef.current.click();
  };
  return (
    <div className={cx("wrapper")} onClick={handleback}>
      <span className={cx("icon")}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </span>
      <Link to={profilepage && profilepage.page} ref={backpageRef} />
    </div>
  );
}
export default BackBtn;
