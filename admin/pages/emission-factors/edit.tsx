import React from 'react';
import { IResourceComponentsProps } from '@pankod/refine-core';
import {
  Edit,
  Form,
  useForm,
  Input,
  DatePicker,
  InputNumber,
  Select,
  SelectProps,
} from '@pankod/refine-antd';
import dayjs from 'dayjs';

export const EmissionFactorEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm({});

  const supportedCalculationMethods: SelectProps['options'] = [
    { label: 'AR4', value: 'ar4' },
    { label: 'AR5', value: 'ar5' },
  ];

  const unitTypeOptions: SelectProps['options'] = [];

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="activity_id"
          name={['activity_id']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="uuid"
          name={['uuid']}
          rules={[
            {
              required: true,
            },
            {
              pattern:
                /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
              message: 'invalid uuid',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="name"
          name={['name']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="category"
          name="category"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="sector"
          name={['sector']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="source"
          name={['source']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="source_link"
          name={['source_link']}
          rules={[
            {
              required: true,
              type: 'url',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="uncertainty"
          name={['uncertainty']}
          rules={[
            {
              required: false,
            },
          ]}
          getValueProps={(value) => ({
            value: value && Number.isInteger(value) ? Number(value) : null,
          })}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="year"
          name={['year']}
          getValueFromEvent={(value) => {
            return value ? dayjs(value).year().toString() : undefined;
          }}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker picker="year" />
        </Form.Item>
        <Form.Item
          label="region"
          name={['region']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="region_name"
          name={['region_name']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="description"
          name={['description']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item
          label="unit_type"
          name={['unit_type']}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => ({
            value: !value ? [] : value,
          })}
        >
          <Select
            mode="tags"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            tokenSeparators={[',']}
            options={unitTypeOptions}
          />
        </Form.Item>
        <Form.Item
          label="unit"
          name={['unit']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="lca_activity"
          name={['lca_activity']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="access_type"
          name={['access_type']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="factor"
          name={['factor']}
          rules={[
            {
              required: true,
              type: 'float',
            },
          ]}
          getValueProps={(value) => ({
            value:
              value && Number.isInteger(value)
                ? Number(value).toFixed(5)
                : value,
          })}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="co2e_total"
          name={['constituent_gases', 'co2e_total']}
          rules={[
            {
              required: true,
              type: 'float',
            },
          ]}
          getValueProps={(value) => ({
            value:
              value && Number.isInteger(value)
                ? Number(value).toFixed(5)
                : value,
          })}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="factor_calculation_method"
          name={['factor_calculation_method']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="factor_calculation_origin"
          name={['factor_calculation_origin']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="supported_calculation_methods"
          name={['supported_calculation_methods']}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => ({
            value:
              value && value.length > 0
                ? value.reduce(
                    (acc: { label: string; value: string }[], val: string) => {
                      return [...acc, { label: val.toUpperCase(), value: val }];
                    },
                    []
                  )
                : [],
          })}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            options={supportedCalculationMethods}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
