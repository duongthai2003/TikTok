import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import Image from "../Image";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { IPHTTP } from "~/utils/httprequest";
import { useContext } from "react";
import { Appcontext } from "~/hook/context/Defaultcontextapi";

const cx = classNames.bind(styles);
function AccountItem({ data, className, showfl = false, nolinktag = false }) {
  const { setsearch_user_click } = useContext(Appcontext);
  const clickaccount = () => {
    setsearch_user_click(`/@${data.nickname}`);
  };
  let Tag = Link;
  if (nolinktag) {
    Tag = "div";
  }
  return (
    <Tag
      to={`/@${data.nickname}`}
      className={cx("wrapper", { [className]: className })}
      onClick={clickaccount}
    >
      <Image className={cx("avata")} src={IPHTTP + data.avatar}></Image>
      <div className={cx("info")}>
        {showfl && <p className={cx("bio")}>{data.bio}</p>}
        <p className={cx("name")}>
          <span>{data.name}</span>
          {data.tick === "true" ? (
            <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
          ) : (
            ""
          )}
        </p>
        <p className={cx("username")}>
          {data.nickname}
          {showfl && (
            <span className={cx("followercount")}>
              <strong> {data.follower_counts} </strong>follower
            </span>
          )}
        </p>
        <div className={cx("firstMessage")}>
          <p className={cx("textmessage")}>
            Duong quang thai Duong quang thai Duong quang thai
          </p>
          <p className={cx("date")}>20/8/2003</p>
        </div>
      </div>
    </Tag>
  );
}
export default AccountItem;
