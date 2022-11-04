import Link from "next/link";
import { Button } from "antd";

export default function ButtonEzin(props) {
  if (props.types === "primary") {
    return (
      <button
        className={`default-btn w-auto rounded-pill padding-btn shadow ${props.className}`}
        style={props.style}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );
  } else if (props.types === "default") {
    return (
      <button
        className={`default-btn bg-default padding-btn rounded-pill ${props.className}`}
        style={props.style}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );
  } else if (props.types === "secondary") {
    return (
      <button
        className={`default-btn w-auto background-secondary padding-btn rounded-pill shadow ${props.className}`}
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
