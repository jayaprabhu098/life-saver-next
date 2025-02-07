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
      label: <div className="flex">
        <File files={props.files} id={category.icon} />
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