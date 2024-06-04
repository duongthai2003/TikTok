import { faEllipsis, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { click } from "@testing-library/user-event/dist/click";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import AccountItem from "~/conponents/AccountItem";
import HomeHeader from "~/conponents/HomeHeader";
import Image from "~/conponents/Image";
import { Wrapper } from "~/conponents/popper";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import { Suggest } from "~/Services/SuggestServices";
import { IPHTTP } from "~/utils/httprequest";
import Home from "../Home/Home";
import AccountmessOption from "./AccountmessOption/AccountmessOption";
import BackBtn from "./BackBtn/BackBtn";
import Close from "./Close/Close";
import styles from "./Message.module.scss";
const cx = classNames.bind(styles);
function Messages({}) {
  const { detailluserlogin } = useContext(Appcontext);

  const [listUserAccounts, setlistUserAccounts] = useState([]);
  const [clickuser, setclickuser] = useState("");

  useEffect(() => {
    const callapi = async () => {
      try {
        const resuilt = await Suggest({ page: 1 });
        setlistUserAccounts(resuilt);
      } catch {}
    };
    callapi();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container h-100 ")}>
        <div className="row h-100  ">
          <div className="col-lg-1 h-100 ">
            <BackBtn />
          </div>
          <div className={cx("colum", "col-lg-4", "h-100")}>
            <Wrapper>
              <div className={cx("head")}>
                <h2>Messages</h2>
                <div className={cx("settting")}>
                  <FontAwesomeIcon icon={faGear} />
                  <div className={cx("setting_options")}></div>
                </div>
              </div>
              <div className={cx("users")}>
                {/* /// */}
                {listUserAccounts.map((item, index) => {
                  return (
                    <div
                      className={cx("users_item")}
                      key={index}
                      onClick={() => {
                        setclickuser(item);
                      }}
                    >
                      <AccountItem
                        data={item}
                        className={"messagepage"}
                        nolinktag
                      />

                      <Tippy
                        interactive
                        placement="bottom"
                        trigger="click"
                        render={(attr) => {
                          return (
                            <div tabIndex={"-1"} {...attr}>
                              <AccountmessOption />
                            </div>
                          );
                        }}
                      >
                        <span className={cx("option")}>
                          <FontAwesomeIcon icon={faEllipsis} />
                        </span>
                      </Tippy>
                    </div>
                  );
                })}
              </div>
            </Wrapper>
          </div>
          <div className={cx("colum", "col-lg-7", "h-100")}>
            <Wrapper>
              <div className={cx("bodyhed")}>
                <div className={cx(" border-bottom")}>
                  <AccountItem data={clickuser} className={"messagepageBody"} />
                </div>
                <div className={cx("messagecontent")}>
                  <div className={cx("usersend")}>
                    <p className={cx("content")}>
                      Liên quan vụ ngộ độc sau khi ăn bánh mì ở tỉnh Đồng Nai,
                      đến nay, theo Sở Y tế tỉnh Đồng Nai cho biết, đã có 529
                      ngộ độc nghi ăn bánh mì. Đáng nói, có 2 ca bệnh nhi tiên
                      lượng rất nặng. {clickuser.id}
                    </p>
                    <div className={cx("avatar")}>
                      <Image src={IPHTTP + clickuser.avatar} />
                    </div>
                  </div>
                  <div className={cx("userresive")}>
                    <p>duong thai 23 {clickuser.id}</p>
                  </div>
                </div>
                <div className={cx("sentmessBlock")}>
                  <h1>duong thai {clickuser.id}</h1>
                </div>
              </div>
            </Wrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Messages;
