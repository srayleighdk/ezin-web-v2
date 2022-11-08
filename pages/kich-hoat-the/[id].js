// Shortcut for kich-hoat
import React from "react";
import Axios from "axios";
import { baseURL } from "../../utils/config";
import { setActivation } from "../../src/store/actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import { getImageUrl } from "../../utils/helpers";
import ActivateMobile from "../../components/ActiveMobile/ActiveMobile";

const KichHoat = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  React.useEffect(() => {
    const { data } = props;
    if (data) {
      // const payload = { seri: data.serial, code: data.code };
      const payload = { short_id: router.query.id };
      dispatch(setActivation(payload));
      if (data?.status == 2 && router?.query?.id) {
        // console.log('props?.data?.status', data?.status, router?.query?.id)
        return router.replace(`/q/${router?.query?.id}`);
      }
    }
  }, [props]);

  // TH activate thi redirect sang /q/
  const image = props?.data?.package_id?.product_id?.image;
  return props?.data?.status != 2 ? (
    <>
      {props?.data ? (
        <Head>
          <title key="title">{`Ezin E-voucher code: ${router?.query?.id}`}</title>
          <meta name="robots" content="noindex" />
          <meta
            property="og:title"
            key="og-title"
            content={`Ezin E-voucher code: ${router?.query?.id}`}
          />
          <meta
            property="og:description"
            key="og-description"
            content={`Click vào đây để hoàn tất hợp đồng thông minh ngay!`}
          />
          <meta
            property="og:image"
            key="og-image"
            content={image && `${getImageUrl()}/${image.path}`}
          />
        </Head>
      ) : (
        <Head>
          <title key="title">{`Kích hoạt bảo hiểm | Ezin`}</title>
          <meta name="robots" content="noindex" />
          <meta
            property="og:title"
            key="og-title"
            content={`Kích hoạt bảo hiểm | Ezin`}
          />
          <meta
            property="og:description"
            key="og-description"
            content={"Kích hoạt bảo hiểm"}
          />
        </Head>
      )}

      <section
        className="pricing-area pt-100 pb-70"
        style={{ paddingTop: "150px" }}
      >
        <div className="container">
          <div id="activation">
            <ActivateMobile
              title={"Kích-hoạt-thẻ"}
              desc={""}
              quote={""}
              id={id}
            />
            <div className="service-card">
              <div>
                <p>
                  Nếu bạn vẫn không thể kích hoạt thẻ, vui lòng xem video hướng
                  dẫn dưới đây:
                </p>{" "}
              </div>
              <div className="container" id="videos">
                <div className="video-container">
                  {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/5BdiwJxTU9E?rel=0&autoplay=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/Lax3BiQqVrQ?rel=0&autoplay=0"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <>
      {props?.data ? (
        <Head>
          <title key="title">{`Ezin Smart contract: ${router?.query?.id}`}</title>
          <meta
            property="og:title"
            key="og-title"
            content={`Ezin Smart contract: ${router?.query?.id}`}
          />
          <meta
            property="og:description"
            key="og-description"
            content={`Bảo hiểm đã được kích hoạt thành công!`}
          />
          <meta
            property="og:image"
            key="og-image"
            content={image && `${getImageUrl()}/${image.path}`}
          />
        </Head>
      ) : (
        <Head>
          <title key="title">{`Kích hoạt bảo hiểm | Ezin`}</title>
          <meta
            property="og:title"
            key="og-title"
            content={`Kích hoạt bảo hiểm | Ezin`}
          />
          <meta
            property="og:description"
            key="og-description"
            content={"Kích hoạt bảo hiểm"}
          />
        </Head>
      )}

      <div className="step-wrapper-1 text-center">
        <div>
          <div className="mt-4">
            Thẻ đã được kích hoạt, vui lòng chờ trong giây lát...
          </div>
        </div>
      </div>
    </>
  );
};

export default KichHoat;

export async function getServerSideProps(context) {
  const id = context.params.id;
  const res = await Axios.get(`${baseURL}/card/byid/${id}`);
  const { data } = res;
  return {
    props: { data: data?.data || null }, // will be passed to the page component as props
  };
}
