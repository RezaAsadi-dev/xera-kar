import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import style from "./style.module.css";
import { fetchApi } from "api";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function ScrollSelect({ title, state, data, setDatas, name, defaultValue, value }) {
  const agenturl = "v1/api/admin/agent/fetch";
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [agentData, setAgentData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const loading = open && options.length === 0;
  const ref0 = React.useRef();

  const fetchAgent = async (page) => {
    try {
      const res = await fetchApi(agenturl, { page }, "post");
      if (res.status_code === 200) {
        const updatedAgents = res.data.map((agent, index) => ({
          value: index,
          name: agent.username,
        }));

        setAgentData((prevAgents) => [...prevAgents, ...updatedAgents]);
        setHasMore(page < res.max_page); // Check if there are more pages
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  React.useEffect(() => {
    if (open) {
      fetchAgent(currentPage);
    }
  }, [open]);

  React.useEffect(() => {
    if (!loading) {
      return;
    }

    (async () => {
      await sleep(200);
      setOptions([...agentData]);
    })();
  }, [loading, agentData]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
      setAgentData([]);
      setCurrentPage(1);
      setHasMore(true);
    }
  }, [open]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setCurrentPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchAgent(nextPage);
        return nextPage;
      });
    }
  };

  const handleScroll = (event) => {
    const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;
    if (bottom) {
      loadMore();
    }
  };

  const changhandler = (event, value) => {
    if (name === "agentName") {
      setDatas({ ...data, agentName: value?.name });
    } else {
      setDatas({ ...data, representativeTitle: value?.name });
    }
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: "100%", border: "2px solid #f1f1f1", borderRadius: "10px" }}
      open={open}
      name={name}
      onChange={changhandler}
      ref={ref0}
      value={value ? { name: value } : null}
      defaultValue={defaultValue}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option?.name === value?.name}
      getOptionLabel={(option) => option?.name}
      options={options}
      loading={loading}
      noOptionsText={" No case found!"}
      loadingText={" Searching..."}
      className={`${style.dropDownSelect} mt-[6px] `}
      onScroll={handleScroll}
      renderInput={(params) => (
        <TextField
          className="inputCon placeholder:text-small"
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
