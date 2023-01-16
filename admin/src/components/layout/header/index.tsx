import { useGetIdentity } from "@pankod/refine-core";
import { AntdLayout, Space, Avatar, Typography } from "@pankod/refine-antd";

const { Text } = Typography;

export const Header: React.FC = () => {
  const { data: user } = useGetIdentity();

  return (
    <AntdLayout.Header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
      }}
    >
      <Space style={{ marginLeft: "8px" }}>
        {user?.name && (
          <Text ellipsis strong>
            {user.name}
          </Text>
        )}
        {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
      </Space>
    </AntdLayout.Header>
  );
};
