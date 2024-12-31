import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import validate from "./validate";
import { fetchApi } from "api";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import countriesData from "assets/countries/countries.json"
import FileUploader from "components/fileuploader/uploader";

export default function AddBusinessForm() {
  const addProUrl = "v1/api/admin/agent/add";
  const navigate = useNavigate();
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    coName: "",
    phone: "",
    email: "",
    country: "",
    coAddress: "",
    services_products: "",
    category: "",
    subcategory: "",
    yearOfExperience: "",
    coWebsite: "",
    description: "",
    status: "",
  });

  const deleteHandler = () => {
    navigate("/business", { replace: true });
  };

  useEffect(() => {
    setErrors(validate(data));
  }, [data, focus]);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const focusHandler = (event) => {
    setFocus({ ...focus, [event.target.name]: true });
  };

  // add data on the table from Api
  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      console.log(data);

      fetchApi(
        addProUrl,
        {
          coName: data.coName,
          phone: data.phone,
          email: data.email,
          country: data.country,
          address: data.address,
          services_products: data.address,
          category: data.category,
          subcategory: data.subcategory,
          yearOfExperience: data.yearOfExperience,
          coWebsite: data.coWebsite,
          description: data.description,
          status: data.status,
          dateTime: data.dateTime,

        },
        "post"
      ).then((res) => {
        //(res);
        if (res.status_code === 200) {
          toast.success(" Business added successfully! ");
          navigate("/busineess");
        } else if (res.status_code === 401) {
          if (res.description === "unauthorized") {
            navigate("/login", { replace: true });
          }
        } else if (res.status_code === 402) {
          toast.error(res.description_fa_user);
        }
      });
    } else {
      setFocus({
        coName: true,
        phone: true,
        email: true,
        country: true,
        coAddress: true,
        services_products: true,
        category: true,
        subcategory: true,
        yearOfExperience: true,
        coWebsite: true,
        description: true,
        status: true,
        dateTime: true,
      });
    }
  };
  const selectChange = (e) => {
    console.log(e.target.value);
  };
  useEffect(() => {
    console.log(data);

  }, [data])
  return (
    <>
      <div className={style.addContainer}>
        <form className={`${style.contantAddForm}  flex  justify-between sm:px-20`}>
          <div className="grid md:grid-cols-2 w-full md:w-1/2 ml-4">
            <div className={style.formItem}>
              <Input
                color="light"
                type="text"
                name="coName"
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label=" Company name "
                isInvalid={errors.coName && focus.coName}
              />
            </div>
            <div className={style.formItem}>
              <Input
                color="light"
                type="number"
                name="phone"
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label="  Company Phone  "
                isInvalid={errors.phone && focus.phone}
              />
            </div>

            <div className={style.formItem}>
              <Input
                color="light"
                type="email"
                name="email"
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                isInvalid={errors.email && focus.email}
                variant="bordered"
                labelPlacement="outside"
                label="Email"
              />
            </div>
            <div className={style.formItem}>
              <Select
                color="light"
                name="country"
                // onFocus={focusHandler}
                onChange={selectChange}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label="Country"
              isInvalid={errors.country && focus.country}
              >
                {countriesData.map((item) => (
                  <SelectItem key={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className={style.formItem}>
              <Input
                color="light"
                type="select"
                name="coAddress"
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label=" Company Address "
                isInvalid={errors.coAddress && focus.coAddress}
              />
            </div>
            <div className={style.formItem}>
              <Input
                color="light"
                type="text"
                name="services_products"
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label=" Services & Products "
                isInvalid={errors.services_products && focus.services_products}
              />
            </div>
            <div className={style.formItem}>
              <Select
                color="light"
                name="category"
                // onFocus={focusHandler}
                // onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label=" Category "
              isInvalid={errors.category && focus.category}
              >
                <SelectItem key="programming">Programming</SelectItem>
                <SelectItem key="programming">Programming</SelectItem>
                <SelectItem key="programming">Programming</SelectItem>
                <SelectItem key="programming">Programming</SelectItem>
                <SelectItem key="programming">Programming</SelectItem>
                <SelectItem key="programming">Programming</SelectItem>
              </Select>
            </div>
            <div className={style.formItem}>
              <Select
                color="light"
                name="subcategory"
                // onFocus={focusHandler}
                // onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label=" Subcategory "
              isInvalid={errors.subcategory && focus.subcategory}
              >
                <SelectItem key="frontend">frontend</SelectItem>
                <SelectItem key="backend">backend</SelectItem>
                <SelectItem key="ui-ux">ui-ux</SelectItem>
                <SelectItem key="devops">devops</SelectItem>
              </Select>
            </div>
            <div className={style.formItem}>
              <Input
                color="light"
                type="number"
                name="yearOfExperience"
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label=" Year Of Experience "
                isInvalid={errors.yearOfExperience && focus.yearOfExperience}
              />
            </div>
            <div className={style.formItem}>
              <Input
                color="light"
                type="link"
                name="coWebsite"
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label=" Company Website "
                isInvalid={errors.coWebsite && focus.coWebsite}
              />
            </div>
          </div>



          <div className="md:w-1/3 relative mr-6">
            <FileUploader datas={data} setDatas={setData} />
            {/* <h5 className="text-[12px] mt-[-20px]"> Choose image </h5> */}
          </div>
          <div className=" flex flex-col md:w-[51%]  w-full sm:justify-start lg:pr-8 ml-4 mt-4">
            <Textarea
              variant="bordered"
              label="About Company"
              labelPlacement="outside"
              placeholder="Enter your description"
              className="text-gray-700 "
              isInvalid={errors.description && focus.description}

            />
          </div>
        </form>


        <Stack direction="row" justifyContent="center" alignItems="center" spacing={3} mb={6} mt={6}>
          <Button variant="solid" className="w-[130px] h-[40px] bg-[#15a380] text-green-50 ml-3" onClick={submitHandler}>
            Add
          </Button>
          <Button variant="flat" className="w-[130px] bg-red-500 text-white " onClick={deleteHandler}> Cancel </Button>
        </Stack>
      </div>
    </>
  );
}
