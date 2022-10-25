import Link from "next/link";

export default function (props) {
    return (
        <button className={`bg-primary default-btn w-100 rounded-pill shadow ${props.className}`} onClick={props.onClick}>
            {props.children}
        </button>
    )
}