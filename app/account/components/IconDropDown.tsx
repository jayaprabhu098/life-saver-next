import Select from "react-select";
import { ICategorySchema, IFilesSchema } from "@/app/actions/type";
import { File } from "@/app/components/File";

interface IIconSelect {
  value: string;
  onChange: (value: string | null) => void;
  onBlur: () => void;
  categories: ICategorySchema[];
  className?: string;
  files: IFilesSchema[]
}


export const IconDropDown = (props: IIconSelect) => {

  const options = props.categories.map((category) => {
    return {
      value: String(category.id),
      label: <div className="flex items-center">
        <File files={props.files} id={category.icon} />
        <span className="ml-2 font-medium">{category.name}</span>
      </div>
    };
  });

  const selectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: 'var(--card-bg)',
      borderColor: state.isFocused ? 'var(--primary)' : 'var(--card-border)',
      borderRadius: '0.75rem',
      minHeight: '38px',
      color: 'var(--foreground)',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(99, 102, 241, 0.2)' : 'none',
      transition: 'all 0.15s ease',
      '&:hover': {
        borderColor: 'var(--primary)',
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'var(--card-bg)',
      borderColor: 'var(--card-border)',
      borderWidth: '1px',
      borderRadius: '0.75rem',
      overflow: 'hidden',
      zIndex: 50,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? 'var(--primary)' 
        : state.isFocused 
          ? 'rgba(99, 102, 241, 0.1)' 
          : 'transparent',
      color: state.isSelected ? '#ffffff' : 'var(--foreground)',
      cursor: 'pointer',
      ':active': {
        backgroundColor: 'var(--primary)',
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'var(--foreground)',
    }),
    input: (provided: any) => ({
      ...provided,
      color: 'var(--foreground)',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: 'var(--text-muted)',
    }),
  };

  return (
    <Select
      className={props.className}
      styles={selectStyles}
      onBlur={props.onBlur}
      value={
        options.find(option => option.value == props.value)
      }
      options={options}
      onChange={e => props.onChange(e?.value ?? null)} />
  );
};