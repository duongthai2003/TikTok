import {
  faEllipsis,
  faGear,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import AccountItem from "~/conponents/AccountItem";
import Image from "~/conponents/Image";
import { Wrapper } from "~/conponents/popper";
import AccountmessOption from "./AccountmessOption/AccountmessOption";
import BackBtn from "./BackBtn/BackBtn";
import styles from "./Message.module.scss";

import { cn } from "~/utils/utils";
import { Appcontext } from "~/hook/context/Defaultcontextapi";
import Tiptap from "~/conponents/Tiptap/Tiptap";
import { EmoineIcon } from "~/conponents/Icon/Icon";
import { ImgIcon } from "~/conponents/Icon/ImgIcon";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import pusher from "~/lib/echo";
import {
  CreateGroupService,
  GetOldMessageService,
  GeUserMessageListService,
  SenMessageService,
} from "~/Services/messageService/MessageService";
import { useNavigate, useSearchParams } from "react-router-dom";

const cx = classNames.bind(styles);
const formSchema = z.object({
  messageContent: z.string(),
});
function Messages() {
  const { detailluserlogin } = useContext(Appcontext);
  const [listUserAccounts, setlistUserAccounts] = useState([]);
  const [selectUserMessage, setSelectUserMessage] = useState(null);
  const [messagesList, setMessagesList] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSetInitContent, setIsSetInitContent] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { handleSubmit, getValues, control } = useForm({
    resolver: zodResolver(formSchema),
  });
  const getSearchParams = searchParams.get("id");
  const messageboxref = useRef(null);

  // Kết nối WebSocket
  const arr = selectUserMessage && [detailluserlogin.id, selectUserMessage.id];
  const sortedString = arr && arr.sort((a, b) => a - b).join("_");
  const channel = pusher.subscribe(`private-chat.${sortedString}`);
  /// nếu kênh là private thì web socket tự động thêm private- vào tên kênh nên phải thêm vào
  // nếu là kênh public thì giữ nguyên như bên api không cần thêm gì

  useEffect(() => {
    if (messageboxref.current && messagesList.length > 1) {
      messageboxref.current.scrollTop = messageboxref.current.scrollHeight;
    }
    channel.bind("message.sent", (data) => {
      setMessagesList((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messagesList]);

  useEffect(() => {
    if (selectUserMessage) {
      getOldMessages(selectUserMessage.id); // Lấy danh sách tin nhắn
    }

    if (getSearchParams) {
      const userReceiver = listUserAccounts.find((item) => {
        return item.user.id === Number(getSearchParams);
      });
      setSelectUserMessage(userReceiver?.user);
    }
  }, [selectUserMessage, listUserAccounts]);

  useEffect(() => {
    if (!detailluserlogin.id) {
      navigate("/");
    }

    CreateGroupChat();
  }, []);

  if (getSearchParams && selectUserMessage) {
    searchParams.delete("id");
    setSearchParams(searchParams);
  }

  // Gửi tin nhắn
  const onSubmit = async () => {
    if (detailluserlogin !== "") {
      try {
        await SenMessageService(
          getValues("messageContent", {}),
          selectUserMessage.id
        );

        handleIsreset();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleIsreset = () => {
    if (isSetInitContent) {
      setIsSetInitContent(false);
    } else {
      setIsSetInitContent(true);
    }
  };

  const GeUserMessageList = async () => {
    try {
      const { data } = await GeUserMessageListService();

      setlistUserAccounts(data);
      if (!selectUserMessage && !getSearchParams)
        setSelectUserMessage(data[0].user);
    } catch {}
  };

  const getOldMessages = async (id) => {
    try {
      const { data } = await GetOldMessageService(id);
      setMessagesList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const CreateGroupChat = async () => {
    try {
      if (getSearchParams) {
        await CreateGroupService(getSearchParams);
      }
      await GeUserMessageList();
    } catch {}
  };

  return (
    <div className={cx("wrapper")}>
      <div className="container m-auto">
        <div className=" flex gap-5 h-[85dvh]">
          <div className="">
            <BackBtn />
          </div>
          <div className={cx("colum")}>
            <Wrapper className="!w-[400px]">
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
                      className="px-[16px] py-[6px] flex items-center cursor-pointer justify-between hover:bg-[#f1f1f1]"
                      style={{
                        background:
                          selectUserMessage &&
                          selectUserMessage.id === item.user.id &&
                          "#f1f1f1",
                      }}
                      key={index}
                      onClick={() => {
                        setSelectUserMessage(item.user);
                      }}
                    >
                      <div className=" flex gap-[12px] items-center">
                        <div className="size-[55px]">
                          <Image
                            className={cn(
                              " w-full h-full rounded-full object-cover"
                            )}
                            src={item.user.avatar}
                          ></Image>
                        </div>
                        <div>
                          <p className="text-[16px] font-semibold">
                            {item.user.name}
                          </p>
                          <div
                            className=" text-[14px]"
                            dangerouslySetInnerHTML={{
                              __html: item.latest_message?.message,
                            }}
                          ></div>
                        </div>
                      </div>

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
                        <div className="  text-[22px]   ">
                          <FontAwesomeIcon
                            className="p-[4px] text-[#aaa] hover:text-black"
                            icon={faEllipsis}
                          />
                        </div>
                      </Tippy>
                    </div>
                  );
                })}
              </div>
            </Wrapper>
          </div>
          <div className={cx("colum")}>
            <Wrapper className="pt-0 ">
              <div className={cx("bodyhed", "w-[730px]")}>
                {selectUserMessage && (
                  <div className=" flex flex-col h-full">
                    {/* account header */}
                    <div className=" border-b border-[#1618231f] ">
                      <AccountItem
                        data={selectUserMessage}
                        className={"messagepageBody"}
                      />
                    </div>
                    {/* mess list */}
                    <div
                      ref={messageboxref}
                      className="flex-1 flex flex-col overflow-y-scroll "
                    >
                      <div className="flex-1 flex flex-col justify-end ">
                        <div
                          className={
                            " flex flex-col gap-[12px] pb-[16px] px-[13px] "
                          }
                        >
                          {messagesList.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className={cn(
                                  " flex items-center gap-[8px] justify-end",
                                  item.sender_id !== detailluserlogin.id &&
                                    "   flex-row-reverse"
                                )}
                              >
                                <div
                                  className={cn(
                                    "px-[12px] py-[7px] bg-[#1618230f] max-w-[70%] border border-[#1618231f] rounded-[8px] text-[16px]"
                                  )}
                                  dangerouslySetInnerHTML={{
                                    __html: item.message,
                                  }}
                                ></div>
                                <div
                                  className={cn(
                                    "  size-[32px] rounded-full overflow-hidden "
                                  )}
                                >
                                  <Image
                                    src={
                                      item.sender_id === detailluserlogin.id
                                        ? detailluserlogin.avatar
                                        : selectUserMessage.avatar
                                    }
                                    className=" object-cover size-full"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    {/* input send mess */}
                    <div className=" py-[12px] px-[16px] mb-[20px] ">
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className=" flex gap-[16px] items-center "
                      >
                        <div className=" flex-1 flex items-center  bg-[#1618230f] rounded-[8px] pr-[18px]">
                          <Controller
                            control={control}
                            name="messageContent"
                            render={({ field }) => {
                              return (
                                <div className=" flex-1">
                                  <Tiptap
                                    isSetDefaultContent={isSetInitContent}
                                    content={field.value}
                                    onChange={(e) => {
                                      setNewMessage(e);
                                      field.onChange(e);
                                    }}
                                  />
                                </div>
                              );
                            }}
                          ></Controller>

                          <div className="flex gap-[8px]">
                            <div className="text-[24px]">
                              <ImgIcon />
                            </div>
                            <div className=" text-[24px]">
                              <EmoineIcon />
                            </div>
                          </div>
                        </div>

                        <button
                          className={cn(
                            " cursor-pointer text-[24px] hidden mr-[8px] ",
                            newMessage.length > 7 && " block"
                          )}
                        >
                          <FontAwesomeIcon
                            className=" text-colorPrimary"
                            icon={faPaperPlane}
                          />
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </Wrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Messages;
