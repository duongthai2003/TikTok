import classNames from "classnames/bind";
import { useState, useContext } from "react";
import { Acongicon, EmoineIcon } from "~/conponents/Icon/Icon";
import styles from "./WriteComment.module.scss";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import { CreateComment } from "~/Services/commentService/CreateComment";
import Tiptap from "~/conponents/Tiptap/Tiptap";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const cx = classNames.bind(styles);
const formSchema = z.object({
  comment: z.string(), //.min(1, { message: "Mô tả không được để trống" }),
});

function WriteComment({ videoid, onclick, recallcomment }) {
  const [isSetInitContent, setIsSetInitContent] = useState(false);

  const { control, handleSubmit, getValues } = useForm({
    resolver: zodResolver(formSchema),
  });

  const { detailluserlogin, btnlikeactive } = useContext(Appcontext);

  const handleIsreset = () => {
    if (isSetInitContent) {
      setIsSetInitContent(false);
    } else {
      setIsSetInitContent(true);
    }
  };
  const onSubmit = async () => {
    const comment_content = getValues("comment");
    if (detailluserlogin !== "") {
      // calll api create comment
      try {
        await CreateComment(
          comment_content,
          detailluserlogin && detailluserlogin.id,
          videoid
        );
        btnlikeactive();
        handleIsreset();
      } catch (err) {
        console.log(err);
      }
      recallcomment();
    } else {
      console.log(6666666666);
      onclick();
    }
  };
  return (
    <div className="flex" style={{ display: "flex" }}>
      <form onSubmit={handleSubmit(onSubmit)} className={cx("wrappper")}>
        <div>
          <Controller
            control={control}
            name="comment"
            render={({ field }) => {
              return (
                <Tiptap
                  isSetDefaultContent={isSetInitContent}
                  content={field.value}
                  onChange={field.onChange}
                />
              );
            }}
          ></Controller>

          <div>
            <span>
              <Acongicon />
            </span>
            <span>
              <EmoineIcon />
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            if (detailluserlogin === "") {
              onclick();
            }
          }}
        >
          Đăng
        </button>
      </form>
    </div>
  );
}
export default WriteComment;
