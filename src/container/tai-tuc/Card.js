import { Button, Card, Checkbox, Typography } from "antd"
import FullImage from "../../../components/FullImage";
import moment from "moment";
import Image from "next/image";
import { formatNumber, getImageUrl } from "../../../utils/helpers";
import styles from './card.module.scss';
const { Text } = Typography;

export default function CardTaiTuc({ data, onPress }) {
    return (
        <div className={styles.card}>
            <FullImage src={getImageUrl(data?.package_id?.product_id?.image_card?.path)} />
            <div className={styles.PVIID}>
                <a href={data?.url} target="_blank">Số BH: {data?.PVIID}</a>
            </div>
            <div className={styles.productName}>
                {data?.product_name}
            </div>
            <div className={styles.fullName}>
                <Text className="text-white" ellipsis={{
                    tooltip: data?.full_name,
                }}>{data?.full_name}</Text>
            </div>
            <div className={styles.expired}>
                Hết hạn: {moment(data?.valid_to).format('DD/MM/YY')}
            </div>
            <div className={styles.license}>
               {data?.license_number && `BKS: ${data?.license_number}`}
               {data?.legal_id && `CMND: ${data?.legal_id}`}
            </div>
            {/* <div className={styles.button}>
            <Button type="primary" className="my-2" onClick={() => onPress(data)}>Tái tục ngay</Button>
            </div> */}
        </div>
    )
    // return (<Card
    //     cover={<img alt={data?.product_name} src={getImageUrl(data?.package_id?.product_id?.image_card?.path)} />}
    //     size="small">
    //     <div>
    //         {/* <b>Gói BH: {data?.product_name}</b> */}
    //         {/* <div className="mt-2">Người được BH: {data?.full_name}</div>
    //         <div>Số đơn BH: <a target="_blank" href={data?.url}>{data?.PVIID} (click để xem đơn BH)</a></div>
    //         <div>Ngày hết hạn: {moment(data?.valid_to).format('DD/MM/YYYY')}</div> */}
    //         <div className={`${diff < 0? 'text-danger': 'text-warning'}`}><b>{diff>0? 'Còn lại': 'Quá hạn'}: {formatNumber(Math.abs(diff))} ngày</b></div>
    //         {/* <div><a href="#">Xem thêm</a></div> */}
    //         <Button type="primary" className="my-2" onClick={() => onPress(data)}>Tái tục ngay</Button>
    //     </div>
    // </Card>)
}