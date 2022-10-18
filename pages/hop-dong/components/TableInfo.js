import React from 'react';

export default function TableInfo(props) {
   return <table className={`table-info ${props.className}`} >
       {props?.tableData?.map((row,index) => (<tr key={index}>
           {row.map((col,index1) => (<td key={index1} className="border-b pt-1 pb-1">{col}</td>))}
       </tr>))}
   </table>
}