import React, { useState } from "react";
import SoftBox from "components/SoftBox";
import styles from "./inputsStyles.module.scss";
import { GrPowerReset } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";

export default function FilterFields({ title, filterFetch, resetHandler, haveFilter, children }) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleAccordionChange = (isOpen) => {
    setIsAccordionOpen(isOpen);
  };

  return (
    <SoftBox my={2}>
      <div className={styles.con}>
        <Accordion selectionMode="multiple" className="z-[10000]">
          <AccordionItem
            key="1"
            
            aria-label="Accordion 1"
            title={
              <div className="flex justify-between items-center">
                <span className="!text-[15px] sm:text-[18px] w-[100%] text-indigo-700">
                  {title}
                </span>
                <div className="flex justify-end w-[100%] ">
                  {isAccordionOpen ? (
                    <>
                      {haveFilter && (
                        <Button
                          className="w-[95px] sm:w-[125px] h-[28px] sm:h-[32px] ml-2"
                          color="danger"
                          variant="flat"
                          onClick={resetHandler}
                        >
                          <span className="text-[11px] sm:text-[12px]"> Remove filter</span>
                          <GrPowerReset />
                        </Button>
                      )}
                      <Button
                        className="w-[92px] sm:w-[125px] h-[28px] sm:h-[32px]"
                        color="success"
                        variant="flat"
                        onClick={filterFetch}
                      >
                        <span className="text-[11px] sm:text-[12px]"> Search</span>
                        <IoSearch />
                      </Button>
                    </>
                  ) : (
                    <p className="text-[14px] text-green-500">View filters form</p>
                  )}
                </div>
              </div>
            }
            className="px-4 text-[16px] sm:text-[18px]"
            onClick={() => handleAccordionChange(!isAccordionOpen)}
          >
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px={3}
            ></SoftBox>
            <SoftBox>{children}</SoftBox>
          </AccordionItem>
        </Accordion>
      </div>
    </SoftBox>
  );
}
