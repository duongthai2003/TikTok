import classNames from "classnames/bind";
import styles from "./AccountmessOption.module.scss";

import { faBell, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faArrowsUpToLine, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Wrapper } from "~/conponents/popper";
const cx = classNames.bind(styles);

function AccountmessOption({}) {
  return (
    <div className={cx("block")}>
      <Wrapper>
        <div className={cx("item")}>
          <span>
            <FontAwesomeIcon icon={faBell} />
          </span>
          <span>Unmute</span>
        </div>
        <div className={cx("item")}>
          <span>
            <FontAwesomeIcon icon={faTrashCan} />
          </span>
          <span>Delete</span>
        </div>
        <div className={cx("item")}>
          <span>
            <FontAwesomeIcon icon={faArrowsUpToLine} />
          </span>
          <span>Pin to top</span>
        </div>
        <div className={cx("item")}>
          <span>
            <FontAwesomeIcon icon={faBan} />
          </span>
          <span>Block</span>
        </div>
      </Wrapper>
    </div>
  );
}
export default AccountmessOption;
