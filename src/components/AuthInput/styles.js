import { StyleSheet } from "react-native";
import { Theme } from "../Theme/Theme";

const styles = StyleSheet.create({
  container: {

    marginHorizontal: 0,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25
  },
  input:{
    borderBottomColor: Theme.palette.fieldColor,
    borderBottomWidth: 1,
    width:"100%",
    height: 40,
    color:"#000",
    paddingLeft: 0,
    fontFamily: Theme.fontFamily.regular
  },
  iconStyle:{
      position:'absolute',
      right: 10,
      width: 20,
      height: 20
  }
});

export default styles;