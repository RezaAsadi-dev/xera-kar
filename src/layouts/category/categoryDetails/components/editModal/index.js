import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { handler } from "../../../../../redux/loaderSlice";
import { fetchApi } from "api";
import toast from "react-hot-toast";
import { Button, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import style from "./editModal.module.scss";
 
const EditModal = ({ closeModal, id, fetchData, info }) => {
  const dispatch = useDispatch();
  const updateurl = "v1/api/admin/user/update";

  const [editedData, setEditedData] = useState({ id: id });
  const [formData, setFormData] = useState([]);
  const [checkBox, setCheckBox] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [focus, setFocus] = useState({});

  const [errorNotMatch, setErrorNotMatch] = useState(false);
  const [errorNewPass, setErrorNewPass] = useState({
    newPass: false,
    reNewPass: false,
  });

  const inputs = [
    { label: "First Name", name: "fName", type: "text" },
    { label: "Last Name ", name: "lName", type: "text" },
    { label: "Phone ", name: "phoneNumber", type: "number" },
    { label: "Email", name: "email", type: "email" },
    { label: "Birtday (year) ", name: "birthday", type: "number" },

  
    {
      label: "Gender",
      name: "gender",
      type: "select",
      options: [
        { key: "male", label: "Male" },
        { key: "female", label: "Female" },
      ],
    },
    { label: "Weight", name: "weight", type: "number" },
    { label: "Height", name: "height", type: "number" },
    {
      label: " Marital status",
      name: "martialStatus",
      type: "select",
      options: [
        { key: "married", label: "Married" },
        { key: "single", label: "Single" },
      ],
    },
    { label: "Field of study ", name: "major", type: "text" },
    {
      label: "Profession  ",
      name: "profession",
      type: "text",
   
    },
    {
      label: "Certificate ",
      name: "certificate",
      type: "select",
      options: [
        { key: " Bachelors ", label: " Bachelors " },
        { key: " Certification", label: "Certification" },
        { key: "Masters", label: "Masters" },
        { key: "PHD", label: "PHD" },
        { key: " Research", label: " Research " },
      ],
    },

  
  ];
  const focusHandler = (event) => {
    setFocus({ ...focus, [event.target.name]: true });
  };

  const checkBoxHandler = (event) => {
    setCheckBox(event.target.checked);
  };

  const changeHandler = (e) => {
    setPassInputs({
      ...passInputs,
      [e.target.name]: e.target.value,
    });
    setErrorNewPass({ newPass: false, reNewPass: false });
    setErrorOldPass(false);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newData = [...formData];
    newData[index] = { ...newData[index], [name]: value };
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
    setFormData(newData);
  };

  useEffect(() => {
    if (info) {
      setFormData(info);
    }
  }, [info]);

  const handleEdit = () => {
    if (checkBox) {
      if (!passInputs.password) {
        setErrorOldPass(true);
        return;
      }
      if (!passInputs.new_password) {
        setErrorNewPass((prev) => ({ ...prev, newPass: true }));
        return;
      } if (!passInputs.repeat_new_password) {
        setErrorNewPass((prev) => ({ ...prev, reNewPass: true }));
        return;
      }
      if (passInputs.new_password !== passInputs.repeat_new_password) {
        setErrorNotMatch(true);
        return;
      }
      dispatch(handler(true));
      fetchApi(updateurl, [...editedData, ...passInputs], "put").then((res) => {
        if (res.status_code === 200) {
          closeModal(false);
          fetchData();
          setTimeout(() => {
            toast.success("User edited successfully");
          }, 1000);
        } else {
          dispatch(handler(false));
          closeModal(false);
          toast.error(" Something went wrong!");
        }
      });
    }
    dispatch(handler(true));
      fetchApi(updateurl, editedData, "put").then((res) => {
        if (res.status_code === 200) {
          closeModal(false);
          fetchData();
          setTimeout(() => {
            toast.success("User edited successfully");
          }, 1000);
        } else {
          dispatch(handler(false));
          closeModal(false);
          toast.error(" Something went wrong!!");
        }
      });
  };


  const renderInput = (input, index) => {
    if (input.type === "text" || input.type === "email" || input.type === "number") {
      return (
        <div className={`${style.userInfosInput} mx-2 !ml-3`} key={index}>
            <Input
            color="light"
            type={input.type}
            name={input.name}
            value={formData[0]?.[input.name] || ""}
            onChange={(e) => handleChange(e, 0)}
              classNames={{
                input: [
                 "text-[14px]"
                ]
              }}
              variant="bordered"
              labelPlacement="outside"
              label={input.label}
            />
        </div>
      );
    } else if (input.type === "select") {
      return (
        <div className={`${style.userInfosInput} flex gap-2 mx-2 !ml-3` } key={index}>
           <Select
            variant="bordered"
            label={input.label} 
            labelPlacement="outside"
            className="max-w-xs" 
            selectedKeys={[formData[0]?.[input.name]]}
            defaultSelectedKeys= {[formData[0]?.[input.name]]}
            onSelectionChange={(selected) =>
              handleChange({ target: { name: input.name, value: selected.currentKey } }, 0)
            }
          >
           {input.options.map((option) => (
              <SelectItem key={option.key}>
               {option.label || option}
              </SelectItem>
            ))}
          </Select>
        </div>
      );
    }
  };

 useEffect(()=>{
 console.log(formData);
 },[formData])

  return (
    <div
      className={style.modal}
      onClick={() => {
        closeModal(false);
      }}
    >
      <div className={style.formContainer} onClick={(e) => e.stopPropagation()}>
        <div className={style.header}>
          <span
            onClick={() => {
              closeModal(false);
            }}
            className={style.closeIcon}
          >
            <IoClose size={20} />
          </span>
          <h3 className={style.headerText}> Edit User </h3>
          <Divider className="bg-indigo-200 mt-3 p-[1px]"/>
        </div>
        <div className={style.userInfosContainer}>
          {inputs.map((input, index) => renderInput(input, index))}
        </div>
        <div className=" w-full flex justify-start px-4  ">
          <Checkbox  onChange={checkBoxHandler}> Change password </Checkbox>
        </div>
        {checkBox && (
          <div className="flex flex-col sm:flex-row w-full px-4 *:mb-6 gap-3	">
            {errorNotMatch && (
              <p className="text-red-600 text-sm"> The new password does not match the password.</p>
            )}
             <div className={`${style.userInfosInput} justify-center !ml-3`}>
            <Input
            color="light"
            type={isVisible ? "text" : "password"}
            className="outline-none focus:!bg-[#e6e6e6]"
            name="new_password"
            label=" New password "
            onFocus={focusHandler}
            onChange={changeHandler}
              classNames={{
                input: [
                 "text-[14px]"
                ]
              }}
              variant="bordered"
              labelPlacement="outside"
            />
              {errorNewPass.newPass && (
                <p className="text-red-600 text-sm"> New password is rquired! </p>
              )}
            </div>
            <div className={style.userInfosInput}>
            <Input
            color="light"
            type={isVisible ? "text" : "password"}
            className="  outline-none focus:!bg-[#e6e6e6]"
            name="repeat_new_password"
            label=" Confirm new password "
            onFocus={focusHandler}
            onChange={changeHandler}
              classNames={{
                input: [
                 "text-[14px]"
                ]
              }}
              variant="bordered"
              labelPlacement="outside"
            />
              {errorNewPass.reNewPass && (
                <p className="text-red-600 text-sm"> Confirm new password is rquired!  </p>
              )}
             </div>
          </div>
        )}
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} marginTop={6} marginBottom={2}>
           
            <Button  variant="solid" className="w-[130px] h-[40px] bg-[#15a380] text-green-100 ml-3"   onClick={handleEdit}>
            Edit
            </Button>
            <Button variant="flat" className="w-[130px]  bg-red-500 text-white" onClick={() => closeModal(false)}>
              Cancel
            </Button>
        </Stack>
      </div>
    </div>
  );
};

export default EditModal;
