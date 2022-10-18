import { Input, Select, Form } from 'antd';
import React from 'react';
import { numberInputCallback } from '../utils/helpers.js';

export default function PhoneNumber({
  value = {},
  size = 'middle',
  prefixName = 'prefix',
  phoneName = 'phoneNumber',
  errorMessage = 'SĐT không được trống',
  ...props
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <Form.Item
        style={{ flexBasis: 100, flexShrink: 0 }}
        name={prefixName}
        initialValue={0}
      >
        <Select
          style={{ flexBasis: 100, flexShrink: 0 }}
          size={size}
          defaultActiveFirstOption
          suffixIcon={
            <img src="/images/down.svg" alt="down-icon" style={{ width: 10 }} />
          }
        >
          <Select.Option value={0}>
            <img
              style={{ width: 21, height: 14 }}
              src="data:image/png;base64,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"
            />
            <span>&nbsp; +84</span>
          </Select.Option>
          {/* {phoneWithFlag.map((item, index) => (
            <Select.Option value={item.prefix} key={index}>
              {item.flag} &nbsp; {item.prefix}
            </Select.Option>
          ))} */}
        </Select>
      </Form.Item>
      <Form.Item
        className="w-100 ml-1 wrap-explain"
        name={phoneName}
        rules={[{ required: true, message: errorMessage }]}
        initialValue={value[phoneName]}
        getValueFromEvent={numberInputCallback}
      >
        <Input type="number" pattern="[0-9]*" inputMode="numeric" {...props} size={size} autoFocus={true} />
      </Form.Item>
    </div>
  );
}
