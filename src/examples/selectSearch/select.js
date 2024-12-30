import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import style from "./style.module.css";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function SelectDropDown({ db, title, data, setDatas, name, value }) {
  console.log(data)
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(200);
      if (active) {
        setOptions([...db]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, db]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const changeHandler = (event, selectedValue) => {
    if (selectedValue) {
      setDatas({ ...data, [name]: selectedValue.name });
    } else {
      setDatas({ ...data, [name]: "" });
    }
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: "100%", border: "2px solid #f1f1f1 ", borderRadius: "10px" }}
      open={open}
      name={name}
      onChange={changeHandler}
      value={value ? { name: value } : null}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option?.name === value?.name}
      getOptionLabel={(option) => option?.name}
      options={options}
      loading={loading}
      noOptionsText={" No case hase been found! "}
      loadingText={" Searching..."}
      className={style.dropDownSelect2}
      renderInput={(params) => (
        <TextField
          className="inputCon"
          {...params}
          placeholder={title}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <div>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </div>
            ),
          }}
        />
      )}
    />
  );
}
