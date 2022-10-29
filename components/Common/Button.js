import Link from "next/link";
import { Button } from "antd";

export default function (props) {
  if (props.type === "primary") {
    return (
      <button
        className={`default-btn rounded-pill shadow ${props.className}`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );
  } else if (props.type === "default") {
    return (
      <button
        className={`default-btn bg-default rounded-pill ${props.className}`}
        onClick={props.onClick}
        {...props}
      >
        {props.children}
      </button>
    );
  } 
  // else if (props.type === "antd") {
  //   return (
  //     <Button
  //       className={`${props.className}`}
  //       onClick={props.onClick}
  //       {...props}
  //     >
  //       {props.children}
  //     </Button>
  //   );
  // } 
  else {
    return (
      <button
        className={`default-btn rounded-pill shadow ${props.className}`}
        onClick={props.onClick}
        {...props}
      >
        {props.children}
      </button>
    );
  }
}
