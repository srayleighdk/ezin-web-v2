import React, { useEffect, useState } from "react";
import { Row, Col, Menu, Collapse, Spin, Empty } from 'antd';
import { getFAQ, getFAQContent } from "../api";
import Head from 'next/head';
import styles from '../../styles/faq.module.scss';
import { createMarkupNormal } from "../../utils/auth.helper";
const { Panel } = Collapse;

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
  const [faqCatId, setFaqCatId] = useState(faqCat[0]?._id);
    const [faqContent, setFaqContent] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        setLoading(true);
        const res = await getFAQContent(faqCatId)
        setFaqContent(res?.data?.data)
        setLoading(false);
    }, [faqCatId])
    const children = faqCat.filter(e => e.is_active).map(e => (
        {
            label: e.title,
            key: e._id,
        }
    ))

    const items = [
        {
            label: 'Tổng quan',
            key: 'submenu1',
            children
        },
    ];

    const onClick = (e) => {
        setFaqCatId(e.key)
    };

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
      <div className={styles.faq}>
        <h1 className="text-center text-primary faq__header">FAQ</h1>

        <div className={`container bg-white`}>
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
                <Collapse defaultActiveKey={["1"]}>
                  {faqContent?.map((e) => {
                    return (
                      !e?.is_deleted && (
                        <Panel
                          header={e?.question}
                          key={e._id}
                          className="faq__content"
                        >
                          <p
                            dangerouslySetInnerHTML={createMarkupNormal(
                              e.title
                            )}
                          ></p>
                        </Panel>
                      )
                    );
                  })}
                </Collapse>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
