import HomeHeader from "~/conponents/HomeHeader";
import Video from "~/conponents/Video";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { memo, useContext, useEffect, useRef, useState } from "react";
import Loading from "~/conponents/loading/Loading";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import Videobtnactive from "~/conponents/Videobtnactive";
import { CheckVideoLiked } from "./checkVideoLiked";

const cx = classNames.bind(styles);

function Contentmain({ video, page, setpage }) {
  const [loadmore, setloadmore] = useState(false);
  const contairef = useRef();

  const { loading_detail, listLikeduser } = useContext(Appcontext);

  const observerRef = useRef(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];
        if (lastEntry.isIntersecting) {
          setpage((prev) => prev + 1);
          setloadmore(true);
        } else {
          setloadmore(false);
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    const sentinel = document.querySelector("#sentinel");
    if (sentinel && video.length > 0) {
      observerRef.current.observe(sentinel);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [video]);

  return (
    <div ref={contairef} className="list-video">
      {video &&
        video.map((item, index) => {
          return (
            <div key={index} className={cx("home-conten")}>
              <HomeHeader data={item} />
              <div className={cx("video_lock")}>
                <Video data={item} />
                <Videobtnactive
                  data={item}
                  video_id_liked={
                    CheckVideoLiked(listLikeduser, item.id) &&
                    CheckVideoLiked(listLikeduser, item.id)
                  }
                />
              </div>
            </div>
          );
        })}
      {/* Phần tử để theo dõi */}
      <div id="sentinel"></div>

      {loading_detail && (
        <div className={cx("load")}>
          <Loading />
        </div>
      )}
      {loadmore && (
        <div className={cx("loadmore")}>
          <Loading />
        </div>
      )}
    </div>
  );
}
export default memo(Contentmain);
