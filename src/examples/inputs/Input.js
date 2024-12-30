import { Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import styles from "./input.module.scss"
import { IoEye, IoEyeOff } from 'react-icons/io5';

export default function Inputs({type,label,error}) {
    const [isVisible,setIsVisible]=useState(false);
    const [focus,setFocus]=useState(false);
     
    const [inputValue,setInputValue]=useState("");
    useEffect(() => {
       
      }, [inputValue, focus]);
      console.log(focus && error);
      
  return (
    <Input  
          type={(type==="password" && isVisible)?"text":type }
        //   className="p-2 text-[14px] outline-none "
           className={`p-2 text-[14px] border-none outline-none h-[50px] focus:ring-0 focus:outline-none ${styles.inoutContainer}`}
           variant="bordered"
           labelPlacement="outside"
           endContent={
            ( type==="password") &&
            <button className="focus:outline-none" type="button" onClick={()=>setIsVisible(!isVisible)} aria-label="toggle password visibility">
              {isVisible ? (
                <IoEyeOff  className="text-xl text-default-400 pointer-events-none" />
              ) : (
                <IoEye className="text-xl text-default-400 pointer-events-none"/>
              )}
            </button>
            }
            label={label}
            isInvalid={focus && error}
            onFocus={()=>setFocus(true)}
            value={inputValue}
            onValueChange={setInputValue}
            />
  )
}
