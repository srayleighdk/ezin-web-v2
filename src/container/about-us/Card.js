import { Typography } from "antd";
import React from "react";
// import { Typography, Button } from 'antd';
// import LinesEllipsis from 'react-lines-ellipsis';
import { createMarkup } from "../../../utils/auth.helper";
import FullImage from "../../../components/FullImage";
import { useMediaQuery } from "react-responsive";

export default function Card({
  img,
  description = "",
  metaTitle = "",
  metaDesc = "",
}) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div className={`d-flex ${isMobile && "flex-column"}`}>
      <div className="card-img flex-1">
        <FullImage src={img} alt={metaDesc} layout="fill" />
        <Typography.Title align="center" level={4}>
          {metaTitle}
        </Typography.Title>
        <p className="text-center">
          <i>{metaDesc}</i>
        </p>
      </div>
      <div className={`card card-content shadow`}>
        <div dangerouslySetInnerHTML={createMarkup(description)} />
      </div>
      {/* 
      <style jsx="true">
        {`
          .img {
            max-width: 100%;
            border-radius: 10px;
          }
          .card-img {
            max-width: 30%;
            margin-right: 1rem;
            transform: translateY(-10px);
          }
          .card-content {
            border-radius: 10px;
            background-color: white;
            width: 65%;
            padding: 2.5rem 2rem;
          }
          @media only screen and (max-width: 768px) {
            flex-direction: column;
            align-items: center;
            .card-content {
              width: 100%;
            }
            .card-img {
              margin-bottom: 1rem;
            }
          }
          @media only screen and (max-width: 426px) {
            .card-content {
              padding: 1.4rem 1rem;
            }
            .card-img {
              max-width: 72%;
            }
          }
        `}
      </style> */}
    </div>
  );
}
