import React from 'react';
import {
  IResourceComponentsProps,
  BaseRecord,
  CrudFilters,
  HttpError,
} from '@pankod/refine-core';
import {
  useTable,
  List,
  Table,
  Space,
  EditButton,
  ShowButton,
  DeleteButton,
  Row,
  Col,
  Form,
  Input,
  Button,
  Icons,
} from '@pankod/refine-antd';

interface IEmissionFactor {
  name: string;
  activity_id: string;
}

export const EmissionFactorsList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, searchFormProps } = useTable<
    IEmissionFactor,
    HttpError,
    { q: string }
  >({
    syncWithLocation: true,
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { q } = params;

      filters.push(
        {
          field: 'name',
          operator: 'contains',
          value: q,
        },
        {
          field: 'activity_id',
          operator: 'contains',
          value: q,
        }
      );

      return filters;
    },
  });

  return (
    <Row gutter={[16, 16]}>
      <Col lg={6} xs={24}>
        <Form layout="vertical" {...searchFormProps}>
          <Form.Item label="Search" name="q">
            <Input
              placeholder="name, activity_id"
              prefix={<Icons.SearchOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Filter
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col lg={18} xs={24}>
        <List>
          <Table {...tableProps} rowKey="id">
            <Table.Column dataIndex="name" title="NAME" />
            <Table.Column dataIndex="source" title="SOURCE" />
            <Table.Column dataIndex="year" title="YEAR" />
            <Table.Column dataIndex="region_name" title="REGION" />
            <Table.Column dataIndex="sector" title="SECTOR" />
            <Table.Column dataIndex="category" title="CATEGORY" />
            <Table.Column
              title="Actions"
              dataIndex="actions"
              render={(_, record: BaseRecord) => (
                <Space>
                  <EditButton hideText size="small" recordItemId={record.id} />
                  <ShowButton hideText size="small" recordItemId={record.id} />
                  <DeleteButton
                    hideText
                    size="small"
                    recordItemId={record.id}
                  />
                </Space>
              )}
            />
          </Table>
        </List>
      </Col>
    </Row>
  );
};
