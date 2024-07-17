import { Row, Input } from 'antd';

type FieldGroupProps = {
  children: React.ReactNode;
};

export default function FieldGroup({ children }: FieldGroupProps) {
  return (
    <Input.Group style={{ marginTop: '2rem' }}>
      <Row gutter={8}>{children}</Row>
    </Input.Group>
  );
}
