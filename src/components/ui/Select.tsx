

interface Props {
  customTitle?:string;
  customDesc?: string;
  options: string[];
  label: string;
  onChange: (option:string) => void
}

export default function Select({ options, label, customTitle, customDesc, onChange}: Props) {
  return (
    <select className="bg-surface rounded-lg p-3 text-lg cursor-pointer" onChange={(e) => onChange(e.target.value)}>
      {customTitle && <option value="">{customTitle}</option>}
      {options.map((item, index) => (
        <option className="cursor-pointer" key={index} value={item} aria-label={label}>
          {customDesc}{item}
        </option>
      ))}
    </select>
  );
}
