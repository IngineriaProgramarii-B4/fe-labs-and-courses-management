import React from "react";
import { Link } from "react-router-dom";

type UserInfoProps = {
  id: string;
  title: string;
  value: string | string[] | number;
}
export default function UserInfoFields({ id, title, value }: UserInfoProps) {
  return (
    <div className={"flex h-[2rem]"}>

      <p className={"my-auto w-[8.5rem] text-end text-gray-500"}>{
        title === "taughtSubjects" ?
          <Link to={`/teachers/${id}`}>
            {title}
          </Link> :
          <>
            {title}
          </>
      }:</p>
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

