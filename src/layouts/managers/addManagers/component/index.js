import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { AiFillStop } from "react-icons/ai";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { red, green } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { handler } from "../../../../redux/loaderSlice";
import { fetchApi } from "api";
import validate from "./validate";
import db from "./Permission.json";
import style from "./style.module.scss";
import { Input } from "@nextui-org/react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const AddManagersForm = () => {
  const operatorAddUrl = "v1/api/admin/operator/add";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    user: "",
    name: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [showPass, setShow] = useState({
    password: false,
    confirmpassword: false,
  });

  const [roles, setRoles] = useState(db.roles);

  const RedButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[800]),
    backgroundColor: red[800],
    width: 150,
    "&:hover": {
      backgroundColor: red[700],
    },
  }));

  const GreenButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[800]),
    width: 150,
    backgroundColor: green[800],
    "&:hover": {
      backgroundColor: green[700],
    },
  }));

  useEffect(() => {
    setErrors(validate(data));
  }, [data, focus]);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (e) => {
    setFocus({ ...focus, [e.target.name]: true });
  };

  const toggleRolePermission = (roleName, permissionType) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.name === roleName ? { ...role, [permissionType]: !role[permissionType] } : role
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(data);
    console.log(validationErrors)
    console.log(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(handler(true));
      const response = await fetchApi(
        operatorAddUrl,
        {
          user: data.user,
          email: data.email,
          pass: data.password,
          phone: data.phone,
          access: roles,
          cat: "Public",
        },
        "post"
      );
      dispatch(handler(false));
      if (response.status_code === 200) {
        navigate("/managers");
        toast.success(" Registered ! ");
      } else if (response.status_code === 401 && response.description === "unauthorized") {
        navigate("/login", { replace: true });
      } else {
        toast.error(" Something went wrong! ");
      }
    } else {
      setFocus({
        user: true,
        email: true,
        phone: true,
        password: true,
        confirmpassword: true,
      });
      toast.error(" Enter the required values ");
    }
  };

  return (
    <div className={`${style.addContainer}  px-2  md:px-20 `}>
      <form
        className="grid md:grid-cols-3 gap-3 !w-full !md:w-full sm:w-full px-0"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        {["user", "email", "phone", "password", "confirmpassword"].map((field) => (
          <div className=" my-[4px] nextuiInputs justify-items-start	" key={field}>
            <Input
              type={
                field.includes("password")
                  ? showPass[field]
                    ? "text"
                    : "password"
                  : field === "phone"
                  ? "number"
                  : "text"
              }
              classNames={{
                base: "p-2 h-[50px] !w-full !md:w-full sm:w-full",
                inputWrapper: "border-slate-300 border-2 rounded-[12px] ",
                input: ["text-[14px]"],
              }}
              variant="bordered"
              labelPlacement="outside"
              endContent={
                field.includes("password") && (
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => setShow({ ...showPass, [field]: !showPass[field] })}
                    aria-label="toggle password visibility"
                  >
                    {showPass[field] ? (
                      <IoEyeOff className="text-xl text-default-400 pointer-events-none" />
                    ) : (
                      <IoEye className="text-xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                )
              }
              label={
                field === "user"
                  ? " User Name "
                  : field === "email"
                  ? " Email "
                  : field === "phone"
                  ? "Phone number "
                  : field === "password"
                  ? "Password"
                  : "Confirm password "
              }
              name={field}
              isInvalid={errors[field] && focus[field]}
              onFocus={handleFocus}
              value={data[field]}
              onChange={handleInputChange}
            />
          </div>
        ))}
      </form>
      <div className={style.tableContainer}>
        <table className={style.table}>
          <thead>
            <tr>
              <th></th>
              <th> Accessibility </th>
      
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.name}>
                <td>{role.name}</td>
                {["view"].map((permission) => (
                  <td key={permission}>
                    <div className={style.optionCheckBox}>
                      {role[permission] !== 0 && (
                        <div
                          className={`${
                            role[permission] ? `${style.inner} ${style.active}` : style.inner
                          }`}
                          onClick={() => toggleRolePermission(role.name, permission)}
                        >
                          {role[permission] && <FaCheck />}
                        </div>
                      )}
                      {role[permission] === 0 && (
                        <div className={style.disableSelect}>
                          <AiFillStop className={style.disableIcon} />
                        </div>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} mb={4}>
        <GreenButton type="submit" variant="contained" onClick={handleSubmit}>
          Add
        </GreenButton>
        <RedButton variant="contained" onClick={() => navigate("/managers", { replace: true })}>
          Cancel
        </RedButton>
      </Stack>
    </div>
  );
};

export default AddManagersForm;
