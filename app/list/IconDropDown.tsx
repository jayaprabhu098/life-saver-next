import Select from "react-select";
import { useMemo } from 'react';
import { Category, FileAPIData } from "../actions/api";
import Image from 'next/image';

interface IIconSelect {
  value: string;
  onChange: (value: string | null) => void;
  onBlur: () => void;
  options: Category[];
  className?: string;
  fileData: FileAPIData;
}


export const IconDropDown = (props: IIconSelect) => {
  const findFile = (id: number) => {
    const fFile = props.fileData.files.find(file =>
      file.id === id
    );
    if (!fFile)
      return;
    return <Image src={fFile.file} className="h-5" alt="Loading" />;
  };
  const options = useMemo(() => {
    
    return props.options.map((option) => {
      return {
        value: String(option.id),
        label: <div className="flex">
          {findFile(option.icon)}
          <span className="ml-2">{option.name}</span>
        </div>
      };
    });
  }, [props.options]);
  return (
    <Select
      className={props.className}
      onBlur={props.onBlur}
      value={
        options.find(option => option.value == props.value)
      }
      options={options}
      onChange={e => props.onChange(e?.value ?? null)} />
  );
};