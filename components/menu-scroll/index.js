import ContactIMG from "../../public/images/menu/Subtract.png";
import React, { useState } from "react";
import Image from "next/image";
import GoTop from "../../components/Shared/GoTop";
import { contactInfo } from "./resources/contact";
import zaloChatIcon from "../../public/images/zalochat.svg";
import fbChatIcon from "../../public/images/fbchat.svg";
import supportIcon from "../../public/images/support.svg";
import { useMediaQuery } from "react-responsive";
import Plus from "../../public/images/plus.png";
import MenuScrollClose from "../../public/images/menuScroll_close.png";
import HotDeal from "../../public/images/menu/hotdeal.png";
import Oto from "../../public/images/menu/car-menu.png";
import Moto from "../../public/images/menu/moto.png";
import Family from "../../public/images/menu/family.png";
import { useRouter } from "next/router";

export default function MenuScroll() {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [menuItem, setMenuItem] = useState(false);
  const [typeMenu, setTypeMenu] = useState("");

  return (
    <>
      {!isMobile ? (
        <div className="menu-wrap">
          {menuItem && (
            <div className="d-flex flex-column align-items-center">
              <a
                rel="noreferrer"
                target="_blank"
                href={contactInfo && contactInfo.zalo_chat}
                className="zalo-logo"
              >
                <Image width="50" height={50} src={zaloChatIcon} alt="zalo" />
              </a>
              <a
                rel="noreferrer"
                target="_blank"
                href={contactInfo && contactInfo.facebook_chat}
                className="fb-logo"
              >
                <Image width="50" height={50} src={fbChatIcon} alt="Facebook" />
              </a>
              <a
                href={`tel:${contactInfo && contactInfo.phone.trim()}`}
                className="call-logo"
              >
                <Image width="50" height={50} src={supportIcon} alt="Liên hệ" />
              </a>
            </div>
          )}
          <div
            className="menu-circle rounded-circle contact"
            onClick={() => setMenuItem(!menuItem)}
          >
            <Image
              // onClick={toggleNavbar}
              className="contact-icon"
              src={ContactIMG}
              alt="logo-contact"
              layout="intrinsic"
            />
          </div>
          <GoTop scrollStepInPx="100" delayInMs="10.50" />
        </div>
      ) : (
        <>
          {!menuItem && (
            <div className="menu-wrap mobile">
              <div
                className="menu-circle rounded-circle event"
                onClick={() => {
                  setTypeMenu("baohiem");
                  setMenuItem(!menuItem);
                }}
              >
                <Image
                  // onClick={toggleNavbar}
                  className="contact-icon"
                  src={Plus}
                  alt="logo-contact"
                  layout="intrinsic"
                />
              </div>
              <div
                className="menu-circle rounded-circle mt-2 contact"
                onClick={() => {
                  setTypeMenu("lienhe");
                  setMenuItem(!menuItem);
                }}
              >
                <Image
                  // onClick={toggleNavbar}
                  className="contact-icon"
                  src={ContactIMG}
                  alt="logo-contact"
                  layout="intrinsic"
                />
              </div>
              {/* <GoTop scrollStepInPx="100" delayInMs="10.50" /> */}
            </div>
          )}
          {menuItem && (
            <>
              <div className="menuItem-wrap"></div>
              {typeMenu === "baohiem" ? (
                <div className="menu-wrap menuItem d-flex flex-column align-items-center">
                  <div className="bg-white border">
                    <div
                      className="item-wrap"
                      onClick={() => setMenuItem(!menuItem)}
                    >
                      <Image
                        // onClick={toggleNavbar}
                        className="contact-icon"
                        src={HotDeal}
                        alt="logo-contact"
                        layout="intrinsic"
                      />
                      <div className="text-danger hotline">HOT DEAL!</div>
                    </div>
                    <div
                      className="item-wrap"
                      onClick={() => {
                        setMenuItem(!menuItem);
                        router.push('/san-pham/oto#mua-ngay')
                      }}
                    >
                      <Image
                        // onClick={toggleNavbar}
                        className="contact-icon"
                        src={Oto}
                        alt="logo-contact"
                        layout="intrinsic"
                      />
                      <div className="pt-1">BH Ôtô</div>
                    </div>
                    <div
                      className="item-wrap"
                      onClick={() => {
                        setMenuItem(!menuItem);
                        router.push('/san-pham/tnds#mua-ngay')
                      }}
                    >
                      <Image
                        // onClick={toggleNavbar}
                        className="contact-icon"
                        src={Moto}
                        alt="logo-contact"
                        layout="intrinsic"
                      />
                      <div className="pt-1">BH Xe máy</div>
                    </div>
                    <div
                      className="item-wrap"
                      onClick={() => {
                        setMenuItem(!menuItem);
                        router.push('/san-pham/an-gia#mua-ngay')
                      }}
                    >
                      <Image
                        // onClick={toggleNavbar}
                        className="contact-icon"
                        src={Family}
                        alt="logo-contact"
                        layout="intrinsic"
                      />
                      <div className="pt-1">BH Gia đình</div>
                    </div>
                    <div
                      className="item-wrap no-line"
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                        setMenuItem(!menuItem);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-chevron-up"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                        />
                      </svg>
                      <div className="pt-1">Đầu trang</div>
                    </div>
                  </div>
                  <div
                    className="menu-circle rounded-circle event mt-3"
                    onClick={() => setMenuItem(!menuItem)}
                  >
                    <Image
                      // onClick={toggleNavbar}
                      className="contact-icon"
                      src={MenuScrollClose}
                      alt="logo-contact"
                      layout="intrinsic"
                    />
                  </div>
                </div>
              ) : (
                <div className="menu-wrap menuItem d-flex flex-column align-items-center">
                  <div className="border contact">
                    <div className="d-flex flex-column align-items-center">
                      <a
                        rel="noreferrer"
                        target="_blank"
                        href={contactInfo && contactInfo.zalo_chat}
                        className="zalo-logo"
                      >
                        <Image
                          width="50"
                          height={50}
                          src={zaloChatIcon}
                          alt="zalo"
                        />
                      </a>
                      <a
                        rel="noreferrer"
                        target="_blank"
                        href={contactInfo && contactInfo.facebook_chat}
                        className="fb-logo"
                      >
                        <Image
                          width="50"
                          height={50}
                          src={fbChatIcon}
                          alt="Facebook"
                        />
                      </a>
                      <a
                        href={`tel:${contactInfo && contactInfo.phone.trim()}`}
                        className="call-logo"
                      >
                        <Image
                          width="50"
                          height={50}
                          src={supportIcon}
                          alt="Liên hệ"
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="menu-circle rounded-circle event mt-3"
                    onClick={() => setMenuItem(!menuItem)}
                  >
                    <Image
                      // onClick={toggleNavbar}
                      className="contact-icon"
                      src={MenuScrollClose}
                      alt="logo-contact"
                      layout="intrinsic"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
