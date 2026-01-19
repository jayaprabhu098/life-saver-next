
'use client';
import { ChangeEvent } from "react";

interface IUser {
    user: number,
    setUser: (user: number) => void
}

export default function User(props: IUser) {

    const availableUsers = [
        { id: 0, name: 'Personal' },
        { id: 1, name: 'Home' },
    ]

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        props.setUser(Number(e.target.value))
    }

    return (<select
        onChange={onChange}
        value={props.user}
        className="mr-10 text-white bg-slate-500 rounded-xl p-2"
    >
        {availableUsers.map((user) => (
            <option key={user.id} value={user.id}>
                {user.name}
            </option>
        ))}
    </select>);
}

