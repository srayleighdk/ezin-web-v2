import React from 'react';
import { DatePicker, Form, Input, Modal, Select, Tooltip } from 'antd';
import EzinDatePicker from 'components/EzinDatePicker';
// import CustomSelect from '../../../components/Select';
import slugify from 'slugify';
import { useMediaQuery } from 'react-responsive';
const { TextArea } = Input;

export default function Field({
    label,
    type,
    name,
    placeholder,
    title,
    desc,
    onFieldChange,
    ref,
    onChange,
    disabled,
    suffix,
    className,
    required,
    rules,
    autoFocus,
    handleOpenDate,
    groups,
    ...rest
}) {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const convertString = (input) => {
        return input ? slugify(input.toString(), {
            replacement: '-', // replace spaces with replacement character, defaults to `-`
            lower: true, // convert to lower case, defaults to `false`
            locale: 'vi', // language code of the locale to use
        }): '';
    };
    const isExist = (child, parent) => {
        return convertString(parent).indexOf(convertString(child)) >= 0;
    };
    let field = null;
    rules = rules || [];
    if (required) {
        rules = [
            ...rules,
            {
                required,
                message: `Vui lòng nhập ${title}`,
            },
        ]
    }
    if (type == 'text') {
        field = (
            <Form.Item
                name={name}
                initialValue={rest.initialValue}
                rules={rules}
                label={title}
            >
                <Input
                    placeholder={placeholder || title}
                    autoFocus={autoFocus}
                    onChange={onChange}
                    value={rest.value}
                    disabled={disabled}
                    suffix={suffix}
                    className={className}
                    onBlur={rest.onBlur}
          
                />
            </Form.Item>
        )
    }
    if (type == 'textarea') {
        field = (
            <Form.Item
                name={name}
                initialValue={rest.initialValue}
                rules={rules}
                label={title}
            >
                <TextArea
                    placeholder={placeholder || title}
                    autoFocus={autoFocus}
                />
            </Form.Item>
        )
    }
    if (type == 'number') {
        field = (
            <Form.Item
                name={name}
                initialValue={rest.initialValue}
                rules={rules}
                label={title}
            >
                <Input
                    placeholder={placeholder || title}
                    autoFocus={autoFocus}
                    type="number"
                    disabled={disabled}
                    min={rest.min}
                    max={rest.max}
                />
            </Form.Item>
        )
    }

    // if (type == 'date') {
    //     return <Form.Item name={name}>
    //         <EzinDatePicker
    //             placeholder={title}
    //             onChange={setFormValue}
    //         />
    //     </Form.Item>
    // }
    if (type == 'date') {
        field = (
            <Form.Item
                name={name}
                initialValue={rest.initialValue}
                rules={rules}
            >
                {isMobile ? (
                    <Input
                        placeholder={placeholder}
                        readOnly={true}
                        inputMode='none'
                        onFocus={handleOpenDate}
                    />
                ) : (
                    <EzinDatePicker
                        className="w-100"
                        placeholder={placeholder || title}
                        format={'DD/MM/YYYY'}
                        onChange={onFieldChange}
                        defaultValue={rest.defaultValue}
                        minDate={rest.minDate}
                        maxDate={rest.maxDate}
                        // withPortal={rest.withPortal}
                    />
                )}
            </Form.Item>
        )
    }
    // if (type == 'select') {
    //     field = (
    //         <Form.Item
    //             name={name}
    //             rules={rules}
    //         >
    //             <CustomSelect
    //                 virtual={false}
    //                 showSearch
    //                 label={title}
    //                 placeholder={placeholder || title}
    //                 optionFilterProp="value"
    //                 filterOption={(input, option) =>
    //                     isExist(input, option.children)
    //                 }
    //                 {...rest}
    //                 autoComplete={false}
    //                 groups={groups}
    //             />
    //         </Form.Item>
    //     )
    // }
    if (type == 'datepicker') {
        field = (
            <Form.Item
                name={name}
                initialValue={rest.value}
                rules={rules}
                // rules={() => Modal.error({
                //     title: 'This is an error message',
                //     content: 'some messages...some messages...',
                // })}
            >
                <DatePicker className='w-100' {...rest} defaultValue={rest.defaultValue} disabled={disabled}/>
            </Form.Item>
        )
    }
    // if (type == 'select') {
    //     return <Form.Item name={name}>
    //         <CustomSelect
    //             virtual={false}
    //             size="large"
    //             className="select-form"
    //             showSearch
    //             label={title}
    //             placeholder={title}
    //         >
    //             {props.getData().map((option) => (
    //                 <Select.Option value={option.value} key={option.value}>
    //                     {option.text}
    //                 </Select.Option>
    //             ))}
    //         </CustomSelect>
    //     </Form.Item>
    // }
    if (field) {
        field = (
            <>
                {label && (<p className="ml-0 mb-0">{label}</p>)}
                <Tooltip   
                    trigger={['focus']}
                    title={desc || placeholder || title}
                    placement="topLeft"
                    overlayClassName="numeric-input"
                >
                    {field}
                </Tooltip>
            </>
        )
    }
    return field;
}