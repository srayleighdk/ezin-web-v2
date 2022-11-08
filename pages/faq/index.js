import React, { useEffect, useState } from "react";
import { Row, Col, Menu, Collapse, Spin, Empty, Tabs } from "antd";
import { getFAQ, getFAQContent } from "../api";
import Head from "next/head";
import styles from "../../styles/faq.module.scss";
import { createMarkupNormal } from "../../utils/auth.helper";
import { useMediaQuery } from "react-responsive";
const { Panel } = Collapse;
import ContentFAQ from "../../components/Faq";

export async function getStaticProps() {
  const res = await getFAQ();
  const faqCat = res?.data?.data;

  return {
    props: {
      faqCat,
    },
  };
}

export default function FAQ({ faqCat }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [faqCatId, setFaqCatId] = useState(
    faqCat.reduce((total, item) => {
      if (item.title === "General") {
        return (total = total + item._id);
      }
      return total;
    }, "")
  );
  const [faqContent, setFaqContent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    infoFAQContent();
  }, [faqCatId]);

  const infoFAQContent = async () => {
    setLoading(true);
    const res = await getFAQContent(faqCatId);
    setFaqContent(res?.data?.data);
    setLoading(false);
  };
  const children = faqCat
    .filter((e) => e.is_active)
    .sort((a, b) => a.title.length - b.title.length)
    .map((e) => ({
      label: e.title,
      key: e._id,
    }));

  const items = [
    {
      label: "Tổng quan",
      key: "submenu1",
      children,
    },
  ];

  const onClick = (e) => {
    setFaqCatId(e.key);
  };

  const onChangeTab = (key) => {
    setFaqCatId(key);
  };

  const genExtra = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-question-circle-fill icon-check"
      viewBox="0 0 16 16"
    >
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
    </svg>
  );

  return (
    <>
      <Head>
        <title key="title">{`FAQ | Ezin`}</title>
        <meta property="og:title" key="og-title" content={`FAQ | Ezin`} />
        <meta
          property="og:description"
          key="og-description"
          content={"FAQ Ezin"}
        />
      </Head>
      <section className={`ptb-100 ${isMobile && "mt-2"}`}>
        <div className={styles.faq}>
          <h1 className="text-center text-primary faq__header">FAQ</h1>
          <div className={`container bg-white`}>
            {isMobile ? (
              <Tabs
                defaultActiveKey={children.reduce((total, item) => {
                  if (item.title === "General") {
                    return (total = total + item._id);
                  }
                  return total;
                }, "")}
                onChange={onChangeTab}
                key={children.length}
              >
                {children?.map((item) => (
                  <Tabs.TabPane tab={item.label} key={item.key}>
                    {/* <Collapse
                    defaultActiveKey={["1"]}
                    accordion
                    expandIconPosition="end"
                  >
                    {faqContent.length === 0 ? (
                      <Empty
                        className="d-flex align-items-center flex-column my-4"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                      />
                    ) : (
                      faqContent?.map((e, index) => {
                        return (
                          !e?.is_deleted && (
                            // <Panel
                            //   header={e?.question}
                            //   key={e._id}
                            //   className="faq__content"
                            // >
                            //   <p
                            //     dangerouslySetInnerHTML={createMarkupNormal(
                            //       e.title
                            //     )}
                            //   ></p>
                            // </Panel>
                          )
                        );
                      })
                    )}
                  </Collapse> */}
                    {faqContent.length === 0 ? (
                      <Empty
                        className="d-flex align-items-center flex-column my-4"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                      />
                    ) : (
                      <ContentFAQ
                        faqContent={faqContent}
                        classnamePanel="faq__header-item"
                      />
                    )}
                  </Tabs.TabPane>
                ))}
              </Tabs>
            ) : (
              <Row className={`${styles.faqContain}`}>
                <Col span={6}>
                  <Menu
                    onClick={onClick}
                    className={styles.sidebar}
                    defaultSelectedKeys={[faqCatId]}
                    defaultOpenKeys={["submenu1"]}
                    mode="inline"
                    items={items}
                  />
                </Col>
                <Col span={18} className={`pl-5 ${styles.faqContext}`}>
                  <h2 className="faq__title">
                    {faqCat?.find((e) => e._id === faqCatId).title}
                  </h2>
                  {loading ? (
                    <Spin className="faq__loading" />
                  ) : faqContent?.length === 0 ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  ) : (
                    // <Collapse
                    //   defaultActiveKey={["1"]}
                    //   accordion
                    //   expandIconPosition="end"
                    // >
                    //   {faqContent?.map((e, index) => {
                    //     return (
                    //       !e?.is_deleted && (
                    //         // <Panel
                    //         //   header={e?.question}
                    //         //   key={e._id}
                    //         //   className="faq__content"
                    //         // >
                    //         //   <p
                    //         //     dangerouslySetInnerHTML={createMarkupNormal(
                    //         //       e.title
                    //         //     )}
                    //         //   ></p>
                    //         // </Panel>
                    //       )
                    //     );
                    //   })}
                    // </Collapse>
                    <ContentFAQ
                      faqContent={faqContent}
                      classnamePanel="faq__header-item"
                    />
                  )}
                </Col>
              </Row>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
