import "./style.scss";

import Input from "../../assets/input";
import { useContext } from "react";
import React, { useState, useEffect } from "react";
import { CheckEmail } from "../../assets/emailCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import useDebounce from "~/hook/useDebounce";
import * as loginservice from "~/Services/loginservice";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import Loading from "~/conponents/loading/Loading";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../assets/button";

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Vui lòng nhập email",
    })
    .email({ message: "Vui lòng nhập đúng định dạng" }),
  password: z.string().min(6, { message: "Mật khẩu phải dài hơn 6 ký tự" }), //Vui lòng nhập PassWord
});

export default function LogInItem({ onUserShow, userShow, hide }) {
  const [callapierr, setcallapierr] = useState("");
  const [loading, setloading] = useState(false);

  const { setdata_login_success } = useContext(Appcontext);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setloading(true);
      const resuilt = await loginservice.login(data.email, data.password);

      setdata_login_success(resuilt.data);

      setloading(false);
    } catch (err) {
      setcallapierr("Email hoặc mật khẩu không chính xác");
      setloading(false);
    }
  };

  return (
    <div className={userShow ? "logInUser" : "logInUserNone"}>
      <div className="logInUser_wrapper">
        <div className="logInUser_wrapper-body">
          <h2>Đăng nhập</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email: "
              placeholder="Nhập email"
              type="email"
              isError={errors.email && errors.email.message}
              {...register("email")}
            />
            <Input
              label="PassWord: "
              placeholder="Nhập passWord"
              type="password"
              isError={errors.password && errors.password.message}
              {...register("password")}
            />
            <p className="Callapierr">{callapierr}</p>
            <div className="logInUser_wrapper-footer">
              <Button name="Log In" />
            </div>
          </form>
        </div>

        <div className="logInUser_wrapper-head">
          <span onClick={onUserShow}>
            <FontAwesomeIcon icon={faX} />
          </span>
        </div>
        {loading && (
          <div className={"loadingicon"}>
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
