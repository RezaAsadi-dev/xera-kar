import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
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
import { Input, Checkbox } from "@nextui-org/react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const EditManagersForm = () => {
  const operatorFetchUrl = "v1/api/admin/operator/fetch_one";
  const operatorUpdateUrl = "v1/api/admin/operator/update";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [showPass, setShowPass] = useState({
    pass: false,
    newPassword: false,
    repeatNewPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPass((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const [data, setData] = useState({
    user: "",
    name: "",
    phone: "",
    newPassword: "",
    repeatNewPassword: "",
    password: "",
  });

  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [roles, setRoles] = useState(db.roles);
  const [checkBox, setCheckBox] = useState(false);

  useEffect(() => {
    const fetchOperator = async () => {
      const response = await fetchApi(operatorFetchUrl, { id: id }, "post");
      if (response.status_code === 200) {
        const operator = response.data.find((op) => op._id === id);
        if (operator) {
          setData({
            user: operator.user,
            name: operator.name,
            phone: operator.phone,
          });
          // setRoles(operator.access);
        }
      } else if (response.status_code === 401) {
        navigate("/login", { replace: true });
      } else {
        toast.error("Error fetching operator data");
      }
    };
    fetchOperator();
  }, [id, navigate]);

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

  const prepareDataToSend = () => {
    let dataToSend = { ...data };

    if (checkBox) {
      if (data.newPassword !== data.repeatNewPassword) {
        toast.error(" Repeating the new password does not match the new password! ");
        return null;
      }
    } else {
      delete dataToSend.newPassword;
      delete dataToSend.repeatNewPassword;
      delete dataToSend.password;
    }

    return {
      ...dataToSend,
      access: roles,
    };
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const dataToSend = prepareDataToSend();
    if (!dataToSend) return;

    dispatch(handler(true));
    const response = await fetchApi(operatorUpdateUrl, dataToSend, "put");
    dispatch(handler(false));

    if (response.status_code === 200) {
      navigate("/managers");
      toast.success("User edited successfully! ");
    } else if (response.status_code === 401 && response.description === "unauthorized") {
      navigate("/login", { replace: true });
    } else {
      toast.error(" Something went wrong !");
    }
  };

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

  return (
    <div className={style.addContainer}>
      <form className={style.contantAddForm} onSubmit={handleEdit}>
        <div className="grid md:grid-cols-3 grid-cols-1  w-[80%] gap-4 ml-5">
          <div className={style.formItem}>
            <Input
              color="light"
              type="text"
              name="name"
              onFocus={handleFocus}
              onChange={handleInputChange}
              classNames={{ input: ["text-[14px] "] }}
              variant="bordered"
              labelPlacement="outside"
              label="User name "
              value={data.name}
              isInvalid={errors.name && focus.name}
            />
          </div>
          <div className={style.formItem}>
            <Input
              color="light"
              type="text"
              name="user"
              onFocus={handleFocus}
              onChange={handleInputChange}
              classNames={{ input: ["text-[14px]"] }}
              variant="bordered"
              labelPlacement="outside"
              label="Email"
              value={data.user}
              isInvalid={errors.user && focus.user}
            />
          </div>
          <div className={style.formItem}>
            <Input
              color="light"
              type="text"
              name="phone"
              onFocus={handleFocus}
              onChange={handleInputChange}
              classNames={{ input: ["text-[14px]"] }}
              variant="bordered"
              labelPlacement="outside"
              label="Phone number "
              value={data.phone}
              isInvalid={errors.phone && focus.phone}
            />
          </div>
          <div className="flex justify-start w-full  text-[12px] sm:flex flex-col">
            <Checkbox onChange={() => setCheckBox(!checkBox)}>Change password</Checkbox>
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 w-[80%] gap-4 ml-5">
          {checkBox && (
            <>
              <div className={style.formItem}>
                <Input
                  color="light"
                  type={showPass.newPassword ? "text" : "password"} // Use state for type
                  name="newPassword"
                  onFocus={handleFocus}
                  onChange={handleInputChange}
                  classNames={{ input: ["text-[14px]"] }}
                  variant="bordered"
                  labelPlacement="outside"
                  label="New password "
                  isInvalid={errors.newPassword && focus.newPassword}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => togglePasswordVisibility("newPassword")}
                      aria-label="toggle new password visibility"
                    >
                      {showPass.newPassword ? (
                        <IoEyeOff className="text-xl text-default-400 pointer-events-none" />
                      ) : (
                        <IoEye className="text-xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
              </div>
              <div className={style.formItem}>
                <Input
                  color="light"
                  type={showPass.repeatNewPassword ? "text" : "password"} // Use state for type
                  name="repeatNewPassword"
                  onFocus={handleFocus}
                  onChange={handleInputChange}
                  classNames={{ input: ["text-[14px]"] }}
                  variant="bordered"
                  labelPlacement="outside"
                  label="Confirm new password"
                  isInvalid={checkBox && data.newPassword !== data.repeatNewPassword}
                  errorMessage={
                    checkBox && data.newPassword !== data.repeatNewPassword
                      ? " Password repetition does not match "
                      : undefined
                  }
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() =>
                        setShowPass({ ...showPass, repeatNewPassword: !showPass.repeatNewPassword })
                      }
                      aria-label="toggle password visibility"
                    >
                      {showPass.repeatNewPassword ? (
                        <IoEyeOff className="text-xl text-default-400 pointer-events-none" />
                      ) : (
                        <IoEye className="text-xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
              </div>
            </>
          )}
        </div>
      </form>

      <div className={style.tableContainer}>
        <table className={style.table}>
          <thead>
            <tr>
              <th> </th>
              <th>Accrssibility</th>
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

      <Stack
        className=" my-10"
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <GreenButton onClick={handleEdit} variant="contained">
          Edit Manager
        </GreenButton>
        <RedButton onClick={() => navigate(-1)} variant="contained">
          Cancel
        </RedButton>
      </Stack>
    </div>
  );
};

export default EditManagersForm;
