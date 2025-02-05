import Select from "react-select";
import Image from 'next/image';
import { ICategorySchema, IFilesSchema } from "@/app/actions/type";

interface IIconSelect {
  value: string;
  onChange: (value: string | null) => void;
  onBlur: () => void;
  categories: ICategorySchema[];
  className?: string;
  files: IFilesSchema[]
}


export const IconDropDown = (props: IIconSelect) => {
  const findFile = (id: string) => {
    const fFile = props.files.find(file =>
      file.id === id
    );
    if (!fFile)
      return;
    return <Image src={fFile.file} alt="Loading" width={30} height={30} />;
  };
  const options = props.categories.map((category) => {
    return {
      value: String(category.id),
      label: <div className="flex">
        {findFile(category.icon)}
        <span className="ml-2">{category.name}</span>
      </div>
    };
  });
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