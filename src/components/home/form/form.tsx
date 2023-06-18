import { Button, Card, Form, Input, Skeleton } from "antd";

interface FProps {
 form?: any;
 onSearchUsers?: any;
 onChangeUsername?: any;
 ValueInput?: string;
 LoadingFirst?: boolean;
}

export function CardForm({
 form,
 onSearchUsers,
 onChangeUsername,
 ValueInput,
 LoadingFirst
}: FProps) {
 return (
  <Card
   hoverable
   title={LoadingFirst ? <Skeleton.Input active /> : "Search User on GitHub"}
   loading={LoadingFirst}
  >
   <Form
    layout="vertical"
    autoComplete="off"
    form={form}
    onFinish={onSearchUsers}
   >
    <Form.Item
     name={["home", "username"]}
     rules={[{ required: true, message: "Username is required" }]}
    >
     <Input
      placeholder="Enter username"
      size="large"
      allowClear
      onChange={onChangeUsername}
     />
    </Form.Item>
    <Button
     type="primary"
     htmlType="submit"
     block
     size="large"
     disabled={ValueInput === "" ? true : false}
    >
     Search
    </Button>
   </Form>
  </Card>
 );
}
