export interface Option {
  label: string;
  value: string;
}

interface Props {
  customTitle?: string;
  customDesc?: string;
  options: Option[];
  onChange: (option: string) => void;
}

export default function Select({
  options,
  customTitle,
  customDesc,
  onChange,
}: Props) {
  return (
    <select
      className="bg-surface rounded-lg p-3 text-lg cursor-pointer"
      onChange={(e) => onChange(e.target.value)}
    >
      {customTitle && <option value="">{customTitle}</option>}
      {options.map((option, index) => (
        <option
          className="cursor-pointer"
          key={index}
          value={option.value}
          aria-label={option.label}
        >
          {customDesc}
          {option.label}
        </option>
      ))}
    </select>
  );
}
