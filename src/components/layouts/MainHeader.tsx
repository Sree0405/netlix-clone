import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import useOffSetTop from "src/hooks/useOffSetTop";
import { APP_BAR_HEIGHT, MAIN_PATH } from "src/constant";
import Logo from "../Logo";
import SearchBox from "../SearchBox";
import NetflixNavigationLink from "../NetflixNavigationLink";

const navItems = [
  { name: "Home", path: `/${MAIN_PATH.browse}` },
  { name: "TV Shows", path: `/${MAIN_PATH.tvShows}` },
  { name: "Movies", path: `/${MAIN_PATH.movies}` },
  { name: "New & Popular", path: `/${MAIN_PATH.browse}` },
  { name: "My List", path: `/${MAIN_PATH.myList}` },
];

const MainHeader = () => {
  const isOffset = useOffSetTop(APP_BAR_HEIGHT);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      sx={{
        px: { xs: "4%", md: "60px" },
        height: APP_BAR_HEIGHT,
        backgroundImage: isOffset ? "none" : "linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0))",
        backgroundColor: isOffset ? "#141414" : "transparent",
        boxShadow: "none",
        transition: "background-color 0.3s ease",
      }}
    >
      <Toolbar disableGutters sx={{ height: "100%" }}>
        <Logo sx={{ mr: { xs: 2, sm: 4 }, width: { xs: 80, sm: 100 } }} />

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="menu"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
              "& .NetflixPaper-root": {
                bgcolor: "rgba(0,0,0,0.9)",
                color: "white",
              }
            }}
          >
            {navItems.map((item) => (
              <MenuItem key={item.name} onClick={handleCloseNavMenu}>
                <NetflixNavigationLink to={item.path}>
                  <Typography textAlign="center">{item.name}</Typography>
                </NetflixNavigationLink>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Stack
          direction="row"
          spacing={2.5}
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, alignItems: "center" }}
        >
          {navItems.map((item) => (
            <NetflixNavigationLink
              to={item.path}
              key={item.name}
              sx={{
                fontSize: "0.85rem",
                color: "#e5e5e5",
                transition: "color 0.3s",
                "&:hover": { color: "#b3b3b3" }
              }}
            >
              {item.name}
            </NetflixNavigationLink>
          ))}
        </Stack>

        <Box sx={{ flexGrow: 0, display: "flex", gap: { xs: 1, sm: 3 }, alignItems: "center" }}>
          <SearchBox />
          <IconButton sx={{ color: "white", p: 0 }}>
            {/* Bell icon could go here */}
          </IconButton>
          <Box
            onClick={handleOpenUserMenu}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              "&:hover .MuiAvatar-root": { border: "1px solid white" }
            }}
          >
            <Avatar
              alt="user_avatar"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              variant="rounded"
              sx={{ width: 32, height: 32, borderRadius: 1 }}
            />
            <span style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid white", marginTop: "5px" }}></span>
          </Box>
          <Menu
            sx={{ mt: "45px" }}
            id="avatar-menu"
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {["Account", "Logout"].map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default MainHeader;
