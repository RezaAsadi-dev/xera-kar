import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { red, green } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { handler } from "../../../../../redux/loaderSlice";
import { fetchApi } from "api";
import toast from "react-hot-toast";
import { Button, Checkbox, Divider, Input, Select, SelectItem } from "@nextui-org/react";
// import { Checkbox } from "@nextui-org/react";
import style from "./editModal.module.scss";
// import { Provinces } from "../../data/countries";
import Countries from "assets/countries/countries.json";
 

const EditModal = ({ closeModal, id, fetchData, info }) => {
  const dispatch = useDispatch();
  const updateurl = "v1/api/admin/user/update";

  const [editedData, setEditedData] = useState({ id: id });
  const [formData, setFormData] = useState([]);
  const [checkBox, setCheckBox] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [focus, setFocus] = useState({});
  
  const [errorNotMatch, setErrorNotMatch] = useState(false);
  const [errorOldPass, setErrorOldPass] = useState(false);
  const [errorNewPass, setErrorNewPass] = useState({
    newPass: false,
    reNewPass: false,
  });

  const inputs = [
    { label: " Name", name: "name", type: "text" },
    { label: "PhoneNumber ", name: "phoneNumber", type: "number" },
    { label: "Email Address", name: "email", type: "email" },
    {
      label: "Country",
      name: "country",
      type: "select",
      options: Countries.map((country) => ({ label: country.name, value: country.id })),
    },
    { label: "City", name: "city", type: "text" },
    { label: "Address", name: "address", type: "text" },
    // {
    //   label: "Gender",
    //   name: "gender",
    //   type: "select",
    //   options: [
    //     { key: "male", label: "Male" },
    //     { key: "female", label: "Female" },
    //   ],
    // },
    // {
    //   label: " Marital status",
    //   name: "martialStatus",
    //   type: "select",
    //   options: [
    //     { key: "married", label: "Married" },
    //     { key: "single", label: "Single" },
    //   ],
    // },
    
  
  ];
  const focusHandler = (event) => {
    setFocus({ ...focus, [event.target.name]: true });
  };

  const checkBoxHandler = (event) => {
    setCheckBox(event.target.checked);
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
        <div className={` grid md:grid-cols-3 gap-4 `}>
          {inputs.map((input, index) => renderInput(input, index))}
          <div className=" w-full  flex justify-start mt-4">
                  <Checkbox color="success" defaultSelected>
                    Status
                  </Checkbox>
                </div>
        </div>
       
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
