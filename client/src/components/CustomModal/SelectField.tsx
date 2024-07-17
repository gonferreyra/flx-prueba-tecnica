import { Col, Select, Typography } from 'antd';
const { Text } = Typography;

type SelectFieldProps = {
  label: string;
  value: string | undefined;
  placeholder: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
};

export default function SelectField({
  label,
  value,
  placeholder,
  onChange,
  options,
  disabled = false,
}: SelectFieldProps) {
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
      <Select
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        options={options}
        disabled={disabled}
      />
    </Col>
  );
}
