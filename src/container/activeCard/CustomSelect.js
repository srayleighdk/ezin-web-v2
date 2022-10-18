import React, { useEffect, useState, Children, useMemo } from 'react';
import { Divider, Select } from 'antd';
// import { Picker, List } from 'antd-mobile';
import { useMediaQuery } from 'react-responsive';
import { getDataFromCollection } from '../../../pages/api';

const CustomSelect = ({
    name,
    value,
    onSelect,
    label,
    children,
    onChange,
    placeholder,
    datasource,
    parent,
    onFieldChange,
    groups,
    ...rest
}) => {

    const handleChange = (value, option) => {
        onChange?.(Array.isArray(value) ? value[0] : value)
    }

    const isMobile = useMediaQuery({ maxWidth: 767 });
    datasource = datasource || []
    if (isMobile) {
        return (
            // <Picker
            //     value={[value]}
            //     cols={1}
            //     dismissText={'Đóng'}
            //     okText={'Hoàn tất'}
            //     extra={' '}
            //     title={label}
            //     data={datasource}
            //     onChange={handleChange}
            //     {...rest}
            //     autoComplete={false}
            // >
            //     <List.Item arrow="horizontal">
            //         {!(value != null && value != undefined) ? label || placeholder : undefined}
            //     </List.Item>
            // </Picker>
            <></>
        );
    }
    let options = null;
    if (groups) {
        options = Object.entries(groups).map(([key, value]) => (
            <Select.OptGroup label={value}>
                {
                    datasource.filter(e => e.group == key).map(option => (
                        <Select.Option value={option.value} key={option.value}>
                            {option.label}
                        </Select.Option>))
                }
            </Select.OptGroup>
        ))
    } else {
        options = datasource.map(option => (
            <Select.Option value={option.value} key={option.value}>
                {option.label}
            </Select.Option>
        ))
    }
    return (
        <Select
            {...rest}
            // onSelect={handleChange}
            value={value}
            onChange={handleChange}
            placeholder={placeholder || label}>
            {options}
        </Select>
    );
}

export default CustomSelect;