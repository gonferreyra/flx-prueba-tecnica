import { Col, Input, Typography } from 'antd';
const { Text } = Typography;

type UserFieldProps = {
  label: string;
  placeholder: string;
  name: string;
  value: string | undefined | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
};

export default function UserField({
  label,
  placeholder,
  name,
  value,
  onChange,
  type = 'text',
  disabled = false,
}: UserFieldProps) {
  return (
    <Col
      span={12}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '.5rem',
      }}
    >
      <Text>{label}</Text>
      <Input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </Col>
  );
}
