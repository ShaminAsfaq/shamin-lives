import React from "react";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  iconButtonLabel: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default function IconButtonWithLabel(props) {
  const classes = useStyles();
  console.log(props);

  return (
    <IconButton onClick={props.onClick} classes={{ label: classes.iconButtonLabel }}>
      <SaveIcon />
      <div>{props.value}</div>
    </IconButton>
  );
}
