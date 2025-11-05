import React, { useEffect, useRef, useState } from "react";
import ContextMain from "./ContextMain";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
  SERVER_URL,
} from "../api/server";
import EditFolder from "../component/EditFolder";
import Properties from "../component/Properties";
import Cookies from "js-cookie";
import EditProfile from "../component/EditProfile";
import AccessLink from "../component/AccessLink";
import { Navigate, useNavigate, useParams } from "react-router";
import NewFolder from "../component/NewFolder";
export default function ContextValue(props) {
  const history = useNavigate();
  const params = useParams();
  const [getAlert, setAlert] = useState({
    status: false,
    msg: "Server Error...",
    type: "error",
  });
  const [loading, setLoading] = useState(false);
  const [getEnable, setEnable] = useState(false);
  const [getShow, setShow] = useState(false);
  const [getCurrSpace, setCurrSpace] = useState(0);
  const [getRender, setRender] = useState(false);
  const [getShared, setShared] = useState(false);
  const [getCurrentDir, setCurrentDir] = useState([
    { folder_name: "root:", _id: null, status: 2 },
  ]);
  const [getUser, setUser] = useState({
    name: "",
    emailid: "",
    profile_pic: "",
  });
  const [getFolders, setFolders] = useState([]);
  const [getClickFolder, setClickFolder] = useState({
    folder_logo: "",
    _id: "",
    folder_name: "",
    folder_type: 1,
    folder_access_link: "",
    folder_extention: "",
    access_all: false,
    access_people: [],
    folder_add_date: "",
    space: "",
  });
  const [getAnchor, setAnchor] = useState({ x: 0, y: 0 });
  const [getCutFolder, setCutFolder] = useState({ _id: "", folder_name: "" });
  const [getCopyFolder, setCopyFolder] = useState({ _id: "", folder_name: "" });
  const [getMenuOption, setMenuOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [getForward, setForward] = useState([]);
  const [getKeyUpStatus, setKeyUpStatus] = useState({
    status: false,
    event: null,
  });
  const uploadFileRef = useRef();
  const uploadFolderLogo = useRef();
  const [getDialog, setDialog] = useState({ title: "", component: <></> });
  const currentValue = { value: -1 };
  const handleContextMenu = (e, value, reverse) => {
    if (currentValue["value"] !== reverse) {
      currentValue["value"] = value;
    }
    Run(e);
  };

  const handleKeyUp = (event) => {
    let key = String(event.key).toLowerCase();
    if (key === "Delete") {
      DeleteFolder();
    } else if (event.ctrlKey) {
      event.preventDefault();
      switch (key) {
        case "m":
          newFolder();
          break;
        case "x":
          MoveFolder();
          break;
        case "v":
          pasteFolder();
          break;
        case "r":
          window.location.reload();
          break;
        case "d":
          downloadFolder();
          break;
        case "b":
          MovePrev();
          break;
        case "u":
          uploadFile();
          break;
        case "e":
          if (getClickFolder._id !== "") {
            editFolder();
          } else {
            editProfile();
          }
          break;
        case "f":
          setEnable(true);
          break;
      }
    } else if (key === "enter") {
      OpenFolder();
    }
    setKeyUpStatus({ status: false, event: null });
  };
  useEffect(() => {
    window.document.addEventListener("mousedown", (e) => {
      console.log("Running....");
      setShow(false);
      setClickFolder({ ...getClickFolder, _id: "" });
      currentValue["value"] = -1;
    });
    window.document.addEventListener("keydown", (e) => {
      // e.preventDefault();
      console.log("key down");
      setKeyUpStatus({ status: true, event: e });
    });
  }, []);

  useEffect(() => {
    if (getKeyUpStatus.event) {
      handleKeyUp(getKeyUpStatus.event);
    }
  }, [getKeyUpStatus]);

  const Run = (e) => {
    e.preventDefault();
    var width = window.innerWidth;
    var height = window.innerHeight;
    var left = e.pageX;
    var top = e.pageY;
    if (left + 200 >= width) {
      left -= left + 200 - width;
    }
    if (top + 420 >= height) {
      top -= top + 425 - height;
    }
    // console.log(left,top)
    setAnchor({ x: left, y: top });
    SetMenuOptions(currentValue["value"]);
    setShow(true);
  };
  const OpenFolder = () => {
    if (getClickFolder.folder_type === 1 && getClickFolder._id !== "") {
      let curr = getCurrentDir;
      curr.push({
        folder_name: getClickFolder.folder_name,
        _id: getClickFolder._id,
      });
      history(`/${getClickFolder._id}`)
      setCurrentDir(curr);
      setRender(!getRender);
      setShow(false);
      fetchFolders();
    }
  };
  const editFolder = () => {
    try {
      if (getShared) {
        Alert("Not Allow In Shared Folder");
        return;
      }
      setOpen(true);
      setDialog({
        title: "Edit Folder",
        component: (
          <EditFolder
            folder_type={getClickFolder.folder_type}
            folder_logo={getClickFolder.folder_logo}
            folder_name={getClickFolder.folder_name}
            _id={getClickFolder._id}
          />
        ),
      });
    } catch (e) {
      Alert("Server Error...");
    }
  };
  const DeleteFolder = async () => {
    try {
      if (getShared) {
        setLoading(true);
        let res = await getRequest(
          `folder/r/access/${getClickFolder._id}?state=true`
        );
        if (res.status) {
          Alert("Folder Deleted Successfully", "success");
          fetchFolders();
        } else {
          Alert(res.error, "error");
        }
        setLoading(false);
        return;
      }
      setLoading(true);
      let res = await deleteRequest(`folder/${getClickFolder._id}`);
      setLoading(false);
      if (res.status) {
        Alert(
          `Folder ${getClickFolder.folder_name} Deleted SuccessFully`,
          "success"
        );
        fetchFolders();
      } else {
        Alert(res.error, "warning");
      }
    } catch (e) {
      Alert("Server Error....");
    }
  };
  const PropertiesFolder = () => {
    try {
      setOpen(true);
      setDialog({ title: "Properties", component: <Properties /> });
    } catch (e) {
      Alert("Server Error...");
    }
  };
  const MoveFolder = () => {
    try {
      if (getShared) {
        Alert("Not Allow In Shared Folder");
        return;
      }
      // ensure copy clipboard is cleared when user chooses Cut
      setCopyFolder({ _id: "", folder_name: "" });
      setCutFolder({
        _id: getClickFolder._id,
        folder_name: getClickFolder.folder_name,
      });
      setRender(!getRender);
    } catch (e) {
      Alert("Server Error....");
    }
  };

  const CopyFolder = () => {
    try {
      if (getShared) {
        Alert("Not Allow In Shared Folder");
        return;
      }
      // ensure cut clipboard is cleared when user chooses Copy
      setCutFolder({ _id: "", folder_name: "" });
      setCopyFolder({
        _id: getClickFolder._id,
        folder_name: getClickFolder.folder_name,
      });
      setRender(!getRender);
    } catch (e) {
      Alert("Server Error....");
    }
  };
  const newFolder = () => {
    setOpen(true);
    setDialog({ title: "New Folder", component: <NewFolder /> });
  };
  const newFolderCreate = async (name) => {
    try {
      if (getShared) {
        Alert("Not Allow In Shared Folder");
        return;
      }
      setLoading(true);
      let curr = getCurrentDir;
      let _id = curr[curr.length - 1]._id;
      let body = { folder_name: name };
      if (_id) {
        body["folder_parent"] = _id;
      }
      let res = await postRequest("folder/", body);
      setLoading(false);
      if (res.status) {
        Alert(`Folder Created With Default Name '${name}'`, "success");
        setRender(!getRender);
        fetchFolders();
      } else {
        Alert(res.error, "warning");
      }
    } catch (e) {
      Alert("Server Error...", "error");
    }
  };
  const uploadFile = () => {
    if (getShared) {
      Alert("Not Allow In Shared Folder");
      return;
    }
    uploadFileRef.current.click();
  };
  const openCmd = () => {};
  const MovePrev = () => {
    let curr = getCurrentDir;
    if (curr[curr.length - 1]._id !== null) {
      curr.pop();
      setCurrentDir(curr);
      if(!getShared){
        if(curr[curr.length-1]._id){
          history(curr[curr.length-1]._id);
        }
        else{
          history("/");
        }
      }
      setRender(!getRender);
      fetchFolders();
    }
  };
  const MoveToFolder = (folder_name) => {
    let curr = getCurrentDir;
    while (curr[curr.length - 1].folder_name !== folder_name) {
      curr.pop();
    }
    setCurrentDir(curr);
    if(!getShared){
      if(curr[curr.length-1]._id){
        history(`/${curr[curr.length-1]._id}`);
      }
      else{
        history("/");
      }
    }
    setRender(!getRender);
    fetchFolders();
  };
  const MoveNext = () => {
    let obj = getForward;
    if (obj.length !== 0) {
      setCurrentDir(obj[obj.length - 1]);
      obj.pop();
      setForward(obj);
      let path = obj[obj.length - 1];
      path = path.map((item) => item.folder_name).join("/");
      fetchFolders(path);
    }
  };
  const reloadPage = () => {
    fetchFolders();
  };
  const logout = async () => {
    try {
      setLoading(true);
      let res = await getRequest("user/logout");
      setLoading(false);
      if (res.status) {
        Cookies.remove("token");
        history("/login", { replace: true });
      } else {
        Alert(res.error);
      }
    } catch (e) {
      Alert("Server Error...");
    }
  };
  const getAccessLink = () => {
    try {
      if (getShared) {
        Alert("Not Allow In Shared Folder");
        return;
      }
      setOpen(true);
      setDialog({ title: "Share", component: <AccessLink /> });
    } catch (e) {
      Alert("Server Error....");
    }
  };
  const downloadFolder = () => {
    if (getClickFolder._id !== "")
      window.open(
        `${SERVER_URL}/download/${getClickFolder.folder_type}/${getClickFolder.folder_access_link}`,
        "_blank"
      );
  };
  const pasteFolder = async () => {
    try {
      if (getShared) {
        Alert("Not Allow In Shared Folder");
        return;
      }
      if (getCutFolder._id !== "") {
        let curr = getCurrentDir;
        let _id = curr[curr.length - 1]._id;
        let body = {};
        if (_id) {
          body["folder_parent"] = _id;
        } else {
          body["folder_parent"] = "null";
        }
        setLoading(true);
        let res = await putRequest(`folder/${getCutFolder._id}`, body);
        setLoading(false);
        if (res.status) {
          Alert(
            `Folder ${getCutFolder.folder_name} Move Successfully`,
            "success"
          );
          fetchFolders();
        } else {
          Alert(res.error, "warning");
        }
      }
    } catch (e) {
      Alert("Server Error...");
    }
    setCutFolder({ _id: "", folder_name: "" });
  };

  const pasteCopyFolder = async () => {
    try {
      if (getShared) {
        Alert("Not Allow In Shared Folder");
        return;
      }
      if (getCopyFolder._id !== "") {
        let curr = getCurrentDir;
        let _id = curr[curr.length - 1]._id;
        let body = {};
        if (_id) {
          body["folder_parent"] = _id;
        } else {
          body["folder_parent"] = "null";
        }
        setLoading(true);
        // Use server endpoint for copy. This will create a duplicate of the folder under target parent.
        let res = await postRequest(`folder/copy/${getCopyFolder._id}`, body);
        setLoading(false);
        if (res.status) {
          Alert(`Folder ${getCopyFolder.folder_name} Copied Successfully`, "success");
          fetchFolders();
        } else {
          Alert(res.error, "warning");
        }
      }
    } catch (e) {
      Alert("Server Error...");
    }
    setCopyFolder({ _id: "", folder_name: "" });
  };
  const SetMenuOptions = (status) => {
    if (status === 1) {
      let obj = [];
      if (!getShared) {
        obj = [
          { name: "Rename", action: editFolder },
          { name: "Cut", action: MoveFolder },
          { name: "Copy", action: CopyFolder },
          { name: "Share", action: getAccessLink },
          { name: "Edit Logo", action: EditFolderLogo },
        ];
      }
      var options = [
        { name: "Open", action: OpenFolder },
        ...obj,
        { name: "Delete", action: DeleteFolder },
        { name: "Download", action: downloadFolder },
        { name: "Properties", action: PropertiesFolder },
      ];
    } else {
      let obj = [];
      if (!getShared) {
        obj = [
          { name: "New Folder", action: newFolder },
          { name: "Upload File", action: uploadFile },
        ];
      }
      // show paste options depending on what is in clipboard (cut or copy)
      if (getCutFolder._id) {
        obj.push({ name: "Paste (Move)", action: pasteFolder });
      }
      if (getCopyFolder._id) {
        obj.push({ name: "Paste (Copy)", action: pasteCopyFolder });
      }
      var options = [
        ...obj,
        // {"name":"Cmd","action":openCmd},
        { name: "Previous", action: MovePrev },
        // {"name":"Next","action":MoveNext},
        { name: "Refresh", action: reloadPage },
        { name: "Edit Profile", action: editProfile },
        { name: "Logout", action: logout },
      ];
    }
    setMenuOptions(options);
    setRender(!getRender);
  };
  const editProfile = () => {
    try {
      setOpen(true);
      setDialog({ title: "Edit Profile", component: <EditProfile /> });
    } catch (e) {
      Alert("Server Error...");
    }
  };

  const EditFolderLogo = () => {
    if (getShared) {
      Alert("Not Allow In Shared Folder");
      return;
    }
    uploadFolderLogo.current.click();
  };
  const Alert = (msg, type = "error") => {
    setAlert({ msg, type, status: true });
    setTimeout(() => {
      setAlert({ msg, type, status: false });
    }, 3000);
  };

  const fetchFolders = async (path) => {
    try {
      let path_list = window.location.pathname.split("/");
      let id = path_list[path_list.length-1];
      
      if (getShared) {
        path = `folder/other/path?path=${(path ? path : getCurrentDir)
          .map((item) => item.folder_name)
          .join("/")}`;
        if (getCurrentDir.length !== 1) {
          path += `&id=${getCurrentDir[1]._id}`;
        }
      } else {
        if(id!="" && !path){
          path = `folder/path/${id}`
        }
        else{

          path = `folder/path?path=${(path ? path : getCurrentDir)
            .map((item) => item.folder_name)
            .join("/")}`;
          }
        }
      setLoading(true);
      let res = await getRequest(path);
      setLoading(false);
      if (!res.status && Cookies.get("token")) {
        Alert(res.error, "warning");
      }
      if (res.folders && res.dirs) {
        setFolders(res.folders);
        setCurrentDir(res.dirs);
        if(res.dirs[res.dirs.length-1]._id && !getShared){
          history(res.dirs[res.dirs.length-1]._id);
        }
        else{
          history("/");
        }
        let total_size = 0;
        for (let val of res.folders) {
          total_size += parseFloat(val.space);
        }
        setCurrSpace(total_size);
      }
    } catch (e) {
      console.log(e);
      Alert("Server Error...", "error");
    }
  };

  const getUserData = async () => {
    try {
      let res = await getRequest("user/");
      if (res.status) {
        let link = String(window.location.href);
        if (link.endsWith("login") || link.endsWith("signup")) {
          history("/", { replace: true });
        }
        setUser(res.user);
      } else {
        if (Cookies.get("token")) {
          Cookies.remove("token");
          Alert("Session Expire..", "error");
        }
        let link = String(window.location.href);
        if (!(link.endsWith("login") || link.endsWith("signup"))) {
          history("/login", { replace: true });
        }
      }
    } catch (e) {
      Alert("Server Error...");
    }
  };
  useEffect(() => {
    fetchFolders();
    // eslint-disable-next-line
  }, [getUser, getShared]);
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <ContextMain.Provider
      value={{
        getEnable,
        setEnable,
        newFolderCreate,
        MoveToFolder,
        getShared,
        getCurrSpace,
        setShared,
        editProfile,
        uploadFile,
        uploadFolderLogo,
  getCutFolder,
  getCopyFolder,
  setCopyFolder,
        uploadFileRef,
        open,
        setOpen,
        getDialog,
        setDialog,
        OpenFolder,
        getClickFolder,
        setClickFolder,
        logout,
        handleContextMenu,
        getAnchor,
        setAnchor,
        getMenuOption,
        SetMenuOptions,
        fetchFolders,
        getRender,
        setRender,
        setShow,
        getShow,
        getFolders,
        setFolders,
        getAlert,
        getCurrentDir,
        setCurrentDir,
        Alert,
        loading,
        setLoading,
        getUserData,
        getUser,
        MoveNext,
        MovePrev,
        reloadPage,
        newFolder,
  CopyFolder,
  pasteCopyFolder,
        editFolder,
        getForward,
        setForward,
      }}
    >
      {props.children}
    </ContextMain.Provider>
  );
}
