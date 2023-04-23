import { Input } from "antd";
import React from "react";

type UserInfoInputProps = {
  title: string;
  value: string;
  isEditing?: boolean;
  setValue?: (val: string) => void;
  type?: string;
};

function UserInfoInput({
  title,
  value,
  setValue,
  isEditing = false,
  type = "text",
}: UserInfoInputProps) {
  const isInEditMode = !!(isEditing && setValue);

  return (
    <div className={"flex h-[2rem]"}>
      <p className={"my-auto w-[8.5rem] text-end"}>{title}:</p>
      {!isInEditMode ? (
        <p className={"my-auto ml-3"}>{value}</p>
      ) : (
        <div>
          <Input
            type={type}
            className={"ml-2 w-[13rem] fill-black"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default UserInfoInput;
