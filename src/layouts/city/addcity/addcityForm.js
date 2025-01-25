import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import Stack from "@mui/material/Stack";
import { Button, Input, SelectItem } from "@nextui-org/react";
import { Select } from "@nextui-org/react";
import countriesData from "../countries/countries.json";
import animationData from "assets/animation/Animation.json";
import Lottie from "react-lottie-player";
import { fetchApi } from "api";

export default function AddCityForm() {
  const addCityUrl = "api/admin/add";
  const [selectedCountry, setSelectedCountry] = useState("");
  const [newCity, setNewCity] = useState("");
  const [focus, setFocus] = useState({});
  const [data, setData] = useState({
    country: "",
    city: "",
  });
  const navigate = useNavigate();
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setData({ ...data, country: e.target.value });
  };

  const handleCityInput = (e) => {
    setNewCity(e.target.value);
    setData({ ...data, city: e.target.value });
  };

  const submitHandler = (event) => {
    console.log(data);

    event.preventDefault();
    if (data.country && data.city) {
      fetchApi(
        addCityUrl,
        {
          country: data.country,
          city: data.city,
          collaction: "city",
        },
        "post"
      ).then((res) => {
        if (res.status_code === 200) {
          toast.success(" city registered successfully! ");
          navigate("/city");
        } else if (res.status_code === 401) {
          if (res.description === "unauthorized") {
            navigate("/login", { replace: true });
          }
        } else if (res.status_code === 402) {
          toast.error(res.description_fa_user);
        }
      });
      // const countryExists = countriesData.some(
      //   (country) => country.country === data.country
      // );

      // if (countryExists) {
      //   toast.success("City added successfully!");
      //   navigate("/city");
      // } else {
      //   // Add new country if it doesn't exist
      //   countriesData.push({
      //     country: data.country,
      //   });
      //   toast.success("City added successfully!");
      //   navigate("/city");
      // }
    } else {
      toast.error("Please fill in both the country and city fields.");
    }
  };

  const deleteHandler = () => {
    navigate("/city", { replace: true });
  };

  const focusHandler = (event) => {
    setFocus({ ...focus, [event.target.name]: true });
  };

  return (
    <>
      <div className={style.addContainer}>
        <form className={`${style.contantAddForm} justify-center gap-4`}>
          <div className="w-[45%] flex flex-col !gap-y-4 md:flex md:justify-center">
            <div className={style.formItem}>
              <Select
                color="light"
                name="country"
                onChange={handleCountryChange}
                value={selectedCountry}
                className="text-[14px]"
                variant="bordered"
                labelPlacement="outside"
                label="Country"
              >
                {countriesData.map((country) => (
                  <SelectItem key={country.name} value={country.name}>
                    {country.name}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className={style.formItem}>
              <Input
                color="light"
                type="text"
                name="city"
                value={newCity}
                onFocus={focusHandler}
                onChange={handleCityInput}
                classNames={{
                  input: ["text-[14px] mt-2"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label="City"
              />
            </div>
          </div>

          <Lottie loop animationData={animationData} play className="w-[45%] max-sm:hidden" />
        </form>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          mb={10}
          mt={10}
        >
          <Button
            variant="solid"
            className="w-[130px] h-[40px] bg-[#15a380] text-green-50 ml-3"
            onClick={submitHandler}
          >
            ADD
          </Button>
          <Button
            variant="flat"
            className="w-[130px] bg-red-500 text-white "
            onClick={deleteHandler}
          >
            Cancel
          </Button>
        </Stack>
      </div>
    </>
  );
}
