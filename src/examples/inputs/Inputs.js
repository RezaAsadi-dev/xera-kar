import { Input } from "@nextui-org/react";

 
   
  
  const myInputs = ({name,onfocus,change}) => {
    return (
        <Input
        isClearable
        radius="lg"
        className={`${style.inputField} ${errors[field] && focus[field] ? style.uncompleted : ""
        }`}
       type="text"
       name={name}
       onFocus={onfocus}
       onChange={change}
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}/>
    );
  };
  export default myInputs;
  