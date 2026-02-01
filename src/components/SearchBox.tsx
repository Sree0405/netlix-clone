import { useState, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MAIN_PATH } from "src/constant";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  transition: "width 0.3s ease",
  border: "1px solid transparent",
  padding: "2px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  cursor: "pointer",
  padding: theme.spacing(0, 1),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .NetflixInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create("width"),
    width: "0px",
    "&:focus": {
      width: "200px",
      [theme.breakpoints.down("sm")]: {
        width: "140px",
      },
    },
  },
}));

export default function SearchBox() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchValue(query);
      setIsFocused(true);
    }
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const currentQuery = searchParams.get("q") || "";
      if (searchValue.trim() !== currentQuery) {
        if (searchValue.trim()) {
          navigate(`/${MAIN_PATH.search}?q=${encodeURIComponent(searchValue.trim())}`);
        } else if (currentQuery) {
          navigate(`/${MAIN_PATH.browse}`);
        }
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue, navigate, searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue("");
    navigate(`/${MAIN_PATH.browse}`);
    setIsFocused(false);
  };

  return (
    <Search
      sx={{
        ...(isFocused || searchValue
          ? {
            border: "1px solid white",
            backgroundColor: "rgba(0,0,0,0.85)",
            width: { xs: "180px", sm: "240px" },
          }
          : { width: "35px" }),
      }}
    >
      <SearchIconWrapper onClick={() => searchInputRef.current?.focus()}>
        <SearchIcon sx={{ fontSize: 22 }} />
      </SearchIconWrapper>
      <StyledInputBase
        inputRef={searchInputRef}
        placeholder="Titles, people, genres"
        value={searchValue}
        onChange={handleSearchChange}
        autoFocus={!!searchValue}
        sx={{
          "& .NetflixInputBase-input": {
            width: isFocused || searchValue ? "100%" : "0px",
          },
        }}
        inputProps={{
          onFocus: () => setIsFocused(true),
          onBlur: () => {
            if (!searchValue) setIsFocused(false);
          },
        }}
      />
      {(isFocused || searchValue) && searchValue && (
        <ClearIcon
          onClick={handleClear}
          sx={{ fontSize: 18, cursor: "pointer", mr: 1 }}
        />
      )}
    </Search>
  );
}
