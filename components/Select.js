import { Select } from 'antd';
// import { Picker, List } from 'antd-mobile';
import React, { Children, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';

const CustomSelect = ({
  value,
  onSelect,
  label,
  children,
  onChange,
  placeholder,
  ...rest
}) => {
  const data = useMemo(
    () =>
      Children.map(children, (child) => {
        const { key, props } = child;
        return { value: key.toString(), label: props.children };
      }),
    [children],
  );
  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (isMobile) {
    return (
    //   <Picker
    //     value={[value]}
    //     cols={1}
    //     dismissText={'Đóng'}
    //     okText={'Hoàn tất'}
    //     extra={' '}
    //     title={label}
    //     data={data}
    //     onChange={(v) => {
    //       onChange?.(v[0], { key: v[0] });
    //     }}
    //     {...rest}
    //   >
    //     <List.Item arrow="horizontal">
    //       {!value ? label || placeholder : undefined}
    //     </List.Item>
    //   </Picker>
    <></>
    );
  }
  return (
    <Select
      {...rest}
      onSelect={onSelect}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    >
      {children}
    </Select>
  );
};

export default CustomSelect;
