import React from 'react';
import { Form, Input, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import CustomSelect from './CustomSelect';
import EzinDatePicker from '../../../components/EzinDatePicker';
import slugify from 'slugify';
import { useMediaQuery } from 'react-responsive';

const Field = ({
    label,
    type,
    name,
    placeholder,
    title,
    desc,
    onFieldChange,
    ref,
    required,
    rules,
    autoFocus,
    handleOpenDate,
    groups,
    ...rest
}) => {
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
            >
                <Input
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
            >
                <Input
                    placeholder={placeholder || title}
                    autoFocus={autoFocus}
                    type="number"
                />
            </Form.Item>
        )
    }
    if (type == 'select') {
        field = (
            <Form.Item
                name={name}
                rules={rules}
            >
                <CustomSelect
                    virtual={false}
                    showSearch
                    label={title}
                    placeholder={placeholder || title}
                    optionFilterProp="value"
                    filterOption={(input, option) =>
                        isExist(input, option.children)
                    }
                    {...rest}
                    autoComplete={false}
                    groups={groups}
                />
            </Form.Item>
        )
    }
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
    // if (field) {
    //     field = (
    //         <div className="flex flex-row align-items-center">
    //             <div className="flex-1">
    //                 {field}
    //             </div>
    //             {/* <div className="flex-auto ml-1 mr-1">
    //                 <QuestionCircleOutlined title={props.desc || props.title} />
    //             </div> */}
    //         </div>
    //     )
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

export default Field;
