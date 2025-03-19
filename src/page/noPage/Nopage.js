import classNames from "classnames/bind";
import styles from "./NoPage.module.scss";
import Header from "~/layouts/Conponent/Header/Header";

import images from "~/access/image";
import Button from "~/conponents/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);

function NoPage() {
  return (
    <div className={cx("wrapper", "container-fluid")}>
      <div className={cx("row")}>
        <Header />
        <div className={cx("content")}>
          <div className={cx("err404")}>
            <h1>4</h1>
            <img src={images.laughimg} alt="" />
            <h1>4</h1>
          </div>
          <p>Couldn't find this page</p>
          <h2>Check out more trending videos on TikTok</h2>
          <span className={cx("button")}>
            <Button
              to={"/"}
              lefticon={<FontAwesomeIcon icon={faPlay} />}
              primary
              large
            >
              Watch now
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}
export default NoPage;
