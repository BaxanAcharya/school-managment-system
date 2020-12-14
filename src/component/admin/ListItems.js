import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CheckoutIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import "./Listitem.css";
import { Tooltip } from "@material-ui/core";
import ClassIcon from "@material-ui/icons/Class";
import SchoolIcon from "@material-ui/icons/School";
export const mainListItems = (
  <div>
    <Link
      className="listItem"
      to="/admin"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Tooltip title="Home">
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Tooltip>
    </Link>

    <Link
      className="listItem"
      to="/admin/user/action"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Tooltip title="User Action">
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users " />
        </ListItem>
      </Tooltip>
    </Link>

    <Link
      className="listItem"
      to="/admin/news"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Tooltip title="News">
        <ListItem button>
          <ListItemIcon>
            <AnnouncementIcon />
          </ListItemIcon>
          <ListItemText primary="News" />
        </ListItem>
      </Tooltip>
    </Link>

    <Link
      className="listItem"
      to="/admin/classes"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Tooltip title="Classes">
        <ListItem className="listItem" button>
          <ListItemIcon>
            <ClassIcon />
          </ListItemIcon>
          <ListItemText primary="Classes" />
        </ListItem>
      </Tooltip>
    </Link>

    <Link
      to="/admin/enrolls"
      className="listItem"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Tooltip title="Enrolls">
        <ListItem className="listItem" button>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Enrolls" />
        </ListItem>
      </Tooltip>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>More</ListSubheader>
    <ListItem className="listItem" button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem className="listItem" button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>

    <ListItem
      className="listItem"
      button
      onClick={() => {
        localStorage.removeItem("user");
        window.location.reload();
      }}
    >
      <ListItemIcon>
        <CheckoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);
