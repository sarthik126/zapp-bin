import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Loader from "./Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewFile({ id }) {
  const [val, setVal] = useState("");
  const [duplicate, setDuplicate] = useState(false);
  const [link1, setLink] = useState("");
  const [newurl, setNewurl] = useState(false);
  const [lines, setLines] = useState(0);
  const [loader, setLoader] = useState(true);
  const history = useHistory();

//   const baseLink = "http://localhost:3000/";
//   const serverURL = "http://localhost:5500/";

const baseLink = "https://zappbin.web.app/";
const serverURL = "https://zapp-bin-server.up.railway.app/";

  const api = axios.create({
    baseURL: serverURL,
  });

  async function saveText() {
    setLoader(true);
    if (val) {
      if (duplicate) {
        //save in new link
        console.log("DATA SAVED")
        const res = await api.post("/duplicate", { val1: val, link1: link1 });
        //set new link
        // console.log(res.data);
        setDuplicate(false);
      } else {
        //save the text in db in new or if exists then overwrite
        const res = await api.post("/new", { val1: val, link1: link1 });
        // console.log(res.data);
        console.log("UPDATED")
      }
    }
    setLoader(false);
  }

  async function getlink() {
    setLoader(true);
    const res = await api.get("/getlink");
    setLink(res.data.newLink);
    setLoader(false);
  }

  function duplicateText() {
    setDuplicate(true);
    //create new link to save
    getlink();
    setNewurl(true);
  }

  async function getData(newid) {
    setLoader(true);
    const res = await api.post("/load", { id: newid });
    if (res.data.valid) {
      setVal(res.data.context);
      setLink(res.data.link1);
    } else {
      history.push("/error");
    }
    setLoader(false);
  }

  function copyLink(e) {
    if (e.target.value === "Copy Text") {
      navigator.clipboard.writeText(val);
      toast("Text Copied!!");
    } else {
      navigator.clipboard.writeText(baseLink + link1);
      toast("Link Copied!!");
    }
    console.log("Copied");
  }

  useEffect(() => {
    if (id) {
      getData(id);
    } else {
      getlink();
      setNewurl(true);
    }
    setLoader(false);
    return () => {
      setLoader(false);
      setNewurl(false);
    };
  }, []);

  useEffect(() => {
    const lines1 = val.split("\n").length;
    setLines(lines1);
  }, [val]);

  return (
    <div>
        <ToastContainer position="top-center" />
      {loader ? <Loader /> : ""}
      <div className="btn-box">
        <div className="logo">
          <span>Zapp</span>Bin
        </div>
        <div className="btns">
          <button className="btn btn-save" disabled={!newurl} onClick={saveText}>
            Save
          </button>
          <button className="btn btn-clone" onClick={duplicateText}>
            Clone
          </button>
          <button
            className="btn btn-copy"
            title={"Copy Text"}
            value={"Copy Text"}
            onClick={copyLink}
          >
            <i className="fa-solid fa-copy"></i>
          </button>
          <button
            className="btn btn-copy"
            title={"Copy Link"}
            value={"Copy Link"}
            onClick={copyLink}
          >
            <i className="fa-solid fa-share-alt"></i>
          </button>
        </div>
      </div>
      <div className="lines">
        <div>Lines : {lines}</div>
        <div className="file-path">Link : {baseLink + link1}</div>
      </div>
      <div>
        <textarea
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            // setDuplicate(true);
          }}
        ></textarea>
      </div>
    </div>
  );
}
