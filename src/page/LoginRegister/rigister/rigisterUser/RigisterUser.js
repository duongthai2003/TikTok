import styles from "./Regidteruser.module.scss";
import classNames from "classnames/bind";
import Button from "~/conponents/Button";
import Input from "../../assets/input";
import React, { memo, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faX } from "@fortawesome/free-solid-svg-icons";
import useDebounce from "~/hook/useDebounce";
import { CreateUser } from "~/Services/User/createUserService";
import Selectfileavatar from "./selectfileavatar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const cx = classNames.bind(styles);

const TestSchema = z.object({
  email: z.string().email({ message: "Vui lòng nhập đúng định dạng" }),
  password: z.string().min(6, { message: "Mật khẩu phải dài hơn 6 ký tự" }),
  name: z.string().min(1, { message: "Vui lòng nhập tên tài khoản" }),
  nickName: z.string().min(1, { message: "Vui lòng nhập nickName" }),
});

function RigisterUser({
  userShow,
  onUserShow,
  setuserShow,
  showLoginOrRegister,
}) {
  const [avatar, setAvatar] = useState("");
  const [nextslide, setnextslide] = useState(false);
  const [notication, setnotication] = useState("");

  const {
    register,
    handleSubmit,

    watch,
    setError,
    formState: { errors, isLoading },
  } = useForm({
    resolver: zodResolver(TestSchema),
    mode: "onChange", //  validate mỗi khi người dùng gõ
  });

  const onSubmit = async (data) => {
    try {
      const resuilt = await CreateUser(
        data.email,
        data.password,
        data.name,
        data.nickName,
        avatar
      );

      if (resuilt.data?.email) {
        setError("email", {
          message: "Email đã tồn tại hoặc không đúng định dạng",
        });
        setnextslide(false);

        return;
      }
      showLoginOrRegister();
    } catch (err) {
      console.log(err);
    }
  };

  const getEamil = useDebounce(watch("email"), 300);
  const getPassword = useDebounce(watch("password"), 300);

  const checkbtn = () => {
    if (!getEamil || !getPassword || errors.email || errors.password) {
      return "disible";
    }
  };

  const handlenextbtn = (e) => {
    e.preventDefault();
    if (!errors.email && !errors.password && getEamil && getPassword) {
      setnextslide(true);
    }
  };

  useEffect(() => {
    console.log(errors);
  }, [getEamil, getPassword]);
  return (
    <div
      className={cx(
        userShow ? "rigisterUser" : "rigisterUserNone"
        // "rigisterUser"
      )}
    >
      <div className={cx("rigisterUser_Main")}>
        <div className={cx("header")}>
          <div style={{ width: "40px" }}>
            {nextslide && (
              <span
                className={cx("leftArrow")}
                onClick={() => {
                  setnextslide(false);
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </span>
            )}
          </div>

          <div className={cx("rigisterUser_Main-title")}>
            <h2>Sign up</h2>
            {notication ? <h3 className={cx("isFormValid")}>{}</h3> : ""}
          </div>
          <div className={cx("rigisterUser_Main-delete")} onClick={onUserShow}>
            <span>
              <FontAwesomeIcon icon={faX} />
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={cx("form")}>
          <div className={cx(nextslide && "nextslide")}>
            <div
              className={cx(
                "account",
                nextslide ? "-translate-x-full hidden" : ""
              )}
            >
              <Input
                label="Email : "
                placeholder="Nhập email"
                type="text"
                isError={errors.email && errors.email.message}
                {...register("email")}
              />
              <Input
                label="PassWord : "
                placeholder="Nhập passWord"
                type="text"
                isError={errors.password && errors.password.message}
                {...register("password")}
              />
              <span className={cx("nextbtn", checkbtn())}>
                <Button large primary onClick={handlenextbtn}>
                  Next
                </Button>
              </span>
            </div>
            <div
              className={cx(
                "infoName",
                nextslide ? "translate-x-0 " : "translate-x-full hidden",
                "flex flex-col items-center"
              )}
            >
              <Selectfileavatar avatar={avatar} setAvatar={setAvatar} />
              <Input
                label="Name: "
                placeholder="Nhập tên tài khoản"
                type="text"
                isError={errors.name && errors.name.message}
                {...register("name")}
              />

              <Input
                label="NickName: "
                placeholder="Nhap nickName"
                type="text"
                isError={errors.nickName && errors.nickName.message}
                {...register("nickName")}
              />

              <div className={cx("rigisterUser_Main-submit")}>
                <Button
                  large
                  primary
                  lefticon={
                    isLoading && <span className={"spinner-border"}></span>
                  }
                >
                  {isLoading ? "" : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default memo(RigisterUser);
