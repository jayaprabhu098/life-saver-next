import Image from 'next/image';
import { IFilesSchema } from '@/app/actions/type';

interface IFile {
    id: string;
     files: IFilesSchema[];
}
export function File(props: IFile) {
    const fFile = props.files.find(file =>
        file.id === props.id
    );
    if (!fFile)
        return <span>No File</span>;
    return <Image src={fFile.file} alt="Loading" width={30} height={30} />;
}