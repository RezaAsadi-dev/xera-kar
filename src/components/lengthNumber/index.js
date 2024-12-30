import React from "react";
import { Divider } from "@nextui-org/react";
import { Kbd } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { MdOutlineFormatListNumberedRtl } from "react-icons/md";

function LengthNumber({ number, title }) {
  return (
    <div className="flex columns items-center ">
      <p className="m-2 text-[16px]">{title}</p>
      <Chip size="md" variant="flat" radius="sm" className="text-[#261f9a] px-2">
        Total count  :  {number}
      </Chip>
    </div>
  );
}

export default LengthNumber;
