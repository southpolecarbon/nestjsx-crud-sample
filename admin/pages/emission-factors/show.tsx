import React from 'react';
import { IResourceComponentsProps, useShow } from '@pankod/refine-core';
import {
  Show,
  Typography,
  TagField,
  TextField,
  UrlField,
} from '@pankod/refine-antd';

const { Title } = Typography;

export const EmissionFactorShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>activity_id</Title>
      <TextField value={record?.activity_id} code copyable />
      <Title level={5}>Id</Title>
      <TextField value={record?.id} code copyable />
      <Title level={5}>uuid</Title>
      <TextField value={record?.uuid} code copyable />
      <Title level={5}>name</Title>
      <TextField value={record?.name} />
      <Title level={5}>category</Title>
      <TextField value={record?.category} />
      <Title level={5}>sector</Title>
      <TextField value={record?.sector} />
      <Title level={5}>source</Title>
      <TextField value={record?.source} />
      <Title level={5}>source_link</Title>
      <UrlField value={record?.source_link} target="_blank" />
      <Title level={5}>uncertainty</Title>
      <TextField value={record?.uncertainty} />
      <Title level={5}>year</Title>
      <TextField value={record?.year} />
      <Title level={5}>region</Title>
      <TextField value={record?.region} />
      <Title level={5}>region_name</Title>
      <TextField value={record?.region_name} />
      <Title level={5}>description</Title>
      <TextField value={record?.description} />
      <Title level={5}>unit_type</Title>
      {record?.unit_type?.map((item: any) => (
        <TagField value={item} key={item} />
      ))}
      <Title level={5}>unit</Title>
      <TextField value={record?.unit} />
      <Title level={5}>lca_activity</Title>
      <TextField value={record?.lca_activity} />
      <Title level={5}>access_type</Title>
      <TextField value={record?.access_type} />
      <Title level={5}>supported_calculation_methods</Title>
      {record?.supported_calculation_methods?.map((item: any) => (
        <TagField value={item} key={item} />
      ))}
      <Title level={5}>factor</Title>
      <TextField value={record?.factor} />
      <Title level={5}>co2e_total</Title>
      <TextField value={record?.constituent_gases?.co2e_total || 0} />
      <Title level={5}>factor_calculation_method</Title>
      <TextField value={record?.factor_calculation_method} />
      <Title level={5}>factor_calculation_origin</Title>
      <TextField value={record?.factor_calculation_origin} />
    </Show>
  );
};
