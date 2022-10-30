import Link from "next/link";
import { Button } from "antd";

export default function (props) {
  if (props.types === "primary") {
    return (
      <button
        className={`default-btn w-auto rounded-pill shadow ${props.className}`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );
  } else if (props.types === "default") {
    return (
      <button
        className={`default-btn bg-default rounded-pill ${props.className}`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );
  } else if (props.types === "secondary") {
    return (
      <button
        className={`default-btn w-auto background-secondary rounded-pill shadow ${props.className}`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );
  } else {
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
