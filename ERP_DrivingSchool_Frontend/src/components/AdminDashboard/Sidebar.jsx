import React from "react";
import "../AdminDashboard/Sidebar.css";
import logo from '../../assets/logo.png'
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src="https://w7.pngwing.com/pngs/684/686/png-transparent-car-speedometer-dashboard-cars-speedometer-tachometer-illustration-driving-text-orange-thumbnail.png" alt="Ecommerce" />
      </Link>
      <Link to="/adminDashboard">
        <p>
          <DashboardIcon /> Panel
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Programi">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="Svi programi" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Kreiraj program" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Porudžbine
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Korisnici
        </p>
      </Link>
      
    </div>
  );
};

export default Sidebar;