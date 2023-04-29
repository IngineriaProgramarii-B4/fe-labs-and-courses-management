import React from "react"

type UserInfoProps = {
  title: string;
  value: string | string[] | number;
}
export default function UserInfoFields({ title, value }: UserInfoProps) {
  return (
    <div className={"flex h-[2rem]"}>
      <p className={"my-auto w-[8.5rem] text-end text-gray-500"}>{title}:</p>
      <p className={"my-auto ml-3"}>
        {Array.isArray(value)
          ? value.map(
            (course, index) =>
              course + (index !== value.length - 1 ? ", " : "")
          )
          : value}
      </p>
    </div>
  );
}

