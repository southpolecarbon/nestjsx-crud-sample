import React from 'react';
import { IResourceComponentsProps, BaseRecord } from '@pankod/refine-core';
import {
  useTable,
  List,
  Table,
  Space,
  EditButton,
  ShowButton,
  DeleteButton,
} from '@pankod/refine-antd';

export const EmissionFactorsList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title="NAME" />
        <Table.Column dataIndex="source" title="SOURCE" />
        <Table.Column dataIndex="year" title="YEAR" />
        <Table.Column dataIndex="region" title="REGION" />
        <Table.Column dataIndex="sector" title="SECTOR" />
        <Table.Column dataIndex="category" title="CATEGORY" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
