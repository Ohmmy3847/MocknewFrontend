import React, { useState } from "react";
import "./style.css";

import MyChart, {
  
  LineChartProblem,
  BarSpecial,
  LineIntention,
  
  BarSpecialMod,
} from "../BarChar/chartPname";
import { BarChartInfo } from "../BarChar/chartPname";
// import lineChart from "../BarChar/chartPname";
import { Chart as ChartJS } from "chart.js/auto";
import image from "./Image_not_available.png";
// import { getData } from "../Home/index" JSON.parse(data_get
import { useEffect } from "react";
import { effect } from "vue";
export function MakeTable(data) {
  const [getindex, setgetindex] = useState(0);
  const [Column, setColumn] = useState(0);
  const [viewdata, setviewdata] = useState([]);
  const [viewdatamod, setviewdatamod] = useState([]);
  var objSpecialDes = [];
  var objSpecialline = [];
  var objSpecial = [];
  var objSpecialmod = [];
  var objSpecialmodline = [];
  var objProblem = [];
  var objProblemmod = [];
  var objCheckin = [];
  var objCommentDes = [];
  var participantMod = [];
  var CheckinMod = [];
  var SpecialModDes = [];
  var objCommentDesMod = [];

  if (data.name == "") {
    var s = data.data.filter(function (i, n) {
      return i;
    });
    var mod_s = data.datamod.filter(function (i, n) {
      return i;
    });
  } else {
    var s = data.data.filter(function (i, n) {
      return i.nick.includes(data.name);
    });
    var mod_s = data.datamod.filter(function (i, n) {
      return i.nick.includes(data.name);
    });
  }
  if (data.course == "") {
    var as = s.filter(function (i, n) {
      return i;
    });
    var mod_as = mod_s.filter(function (i, n) {
      return i;
    });
  } else {
    var as = s.filter(function (i, n) {
      return i.Course.includes(data.course);
    });
    var mod_as = mod_s.filter(function (i, n) {
      return i.Course.includes(data.course);
    });
  }

  useEffect(() => {
    setgetindex(0);

    setColumn(0);
    setviewdata(as);
    setviewdatamod(mod_as);
  }, [data.name, data.course]);
  for (let i = 0; i < viewdata.length; i++) {
    objSpecial[i] = {
      Algorithm:
        parseFloat(viewdata[i].Special.split("===\n")[1].split(",")[0]) || 0,
      Solveproblem:
        parseFloat(viewdata[i].Special.split("===\n")[1].split(",")[1]) || 0,
      Creative:
        parseFloat(viewdata[i].Special.split("===\n")[1].split(",")[2]) || 0,
      Confident:
        parseFloat(viewdata[i].Special.split("===\n")[1].split(",")[3]) || 0,
      Communication:
        parseFloat(viewdata[i].Special.split("===\n")[1].split(",")[4]) || 0,
      Problem: parseFloat(viewdata[i]["Serious"].split("===\n")[1]) || 0,
    };
    objProblem[i] = {
      P_rank: viewdata[i]["Serious"].split("\n===\n")[0].split("\n") || [],
      problem: viewdata[i].Problem.split("\n===\n")[0].split("\n") || [],
      cause: viewdata[i].Cause.split("\n===\n")[0].split("\n") || [],
      solution: viewdata[i].Solution.split("\n===\n")[0].split("\n") || [],
      effect: viewdata[i].Effect.split("\n===\n")[0].split("\n") || [],
    };

    objSpecialline[i] = viewdata[i].Special.split("\n===\n")[1]
      .split(",")
      .map((n, i) => {
        return parseFloat(n);
      });
    objSpecialline[i].push(
      parseFloat(viewdata[i]["Serious"].split("\n===\n")[1])
    );
    objCommentDes[i] = viewdata[i].Comment.split("\n===\n")[0].split("\n");
    objSpecialDes[i] = viewdata[i].Special.split("\n===\n")[0].split("\n");
    objCheckin[i] = viewdata[i].Power.split("\n===\n")[0]
      .split("\n")
      .map(Number);

    viewdata[i].maxSpecial = Object.entries(objSpecial[i]).sort(
      (x, y) => y[1] - x[1]
    )[0];
  }
  for (let i = 0; i < viewdatamod.length; i++) {
    objSpecialmod[i] = {
      Teaching:
        parseFloat(viewdatamod[i].Comment.split("\n===\n")[1].split(",")[0]) ||
        0,
      Attraction:
        parseFloat(viewdatamod[i].Comment.split("\n===\n")[1].split(",")[1]) ||
        0,
      Confident:
        parseFloat(viewdatamod[i].Comment.split("\n===\n")[1].split(",")[2]) ||
        0,
      "Course Quality":
        parseFloat(viewdatamod[i].Special.split("\n===\n")[1].split(",")[0]) ||
        0,
      "Student Quality":
        parseFloat(viewdatamod[i].Special.split("\n===\n")[1].split(",")[1]) ||
        0,
    };
    objProblemmod[i] = {
      P_rank: viewdatamod[i]["Serious"].split("\n===\n")[0].split("\n") || [],
      problem: viewdatamod[i].Problem.split("\n===\n")[0].split("\n") || [],
      cause: viewdatamod[i].Cause.split("\n===\n")[0].split("\n") || [],
      solution: viewdatamod[i].Solution.split("\n===\n")[0].split("\n") || [],
      effect: viewdatamod[i].Effect.split("\n===\n")[0].split("\n") || [],
    };
    CheckinMod[i] = viewdatamod[i].Power.split("\n===\n")[0].split("\n");
    participantMod[i] = viewdatamod[i].age
      .split("\n===\n")[0]
      .split("\n")
      .map(Number);
    objCommentDesMod[i] =
      viewdatamod[i].Comment.split("\n===\n")[0].split("\n");
    objSpecialmodline[i] = viewdatamod[i].Comment.split("\n===\n")[1]
      .split(",")
      .map(Number);
    objSpecialmodline[i].push(
      viewdatamod[i].Special.split("\n===\n")[1].split(",").map(Number)[0] || 0,
      viewdatamod[i].Special.split("\n===\n")[1].split(",").map(Number)[1] || 0,
      parseFloat(viewdatamod[i]["Serious"].split("\n===\n")[1] || 0)
    );
    SpecialModDes[i] = viewdatamod[i].Special.split("\n===\n")[0].split("\n");
    viewdatamod[i].maxSpecial = Object.entries(objSpecialmod[i]).sort(
      (x, y) => y[1] - x[1]
    )[0];
  }
  
  return (
    <>
      
      <div class="modtable">
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Problems</th>
            <th>Special</th>
          </tr>
          {viewdatamod.map((n, i) => {
            return (
              <>
                <tr>
                  <td className="FirstBar">
                    {n.id.split("-")[0] || "<No Data>"}
                  </td>
                  <td
                    key={"nick" + String(i)}
                    onClick={(event) => {
                      setgetindex(i);
                      setColumn(6);
                    }}
                  >
                    {n.nick || "<No Data>"}
                  </td>
                  <td
                    onClick={(event) => {
                      setColumn(7);

                      setgetindex(i);
                    }}
                  >
                    {n.Course || "<No Data>"}
                  </td>
                  <td
                    onClick={(event) => {
                      setgetindex(i);
                      setColumn(8);
                      // console.log(Column);
                    }}
                  >
                    {n["Serious"].split("\n===\n")[1] || "<No Data>"}
                  </td>
                  <td
                    onClick={(event) => {
                      setColumn(9);

                      setgetindex(i);
                    }}
                  >
                    {n.maxSpecial[0] || "<No Data>"}
                  </td>
                </tr>
              </>
            );
          })}
         
        </table>
      </div>
      <div class="maintable">
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Problems</th>
            <th>Special</th>

            <th>Project</th>
          </tr>
          {viewdata.map((daata, index) => {
            return (
              <>
                <tr>
                  <td className="FirstBar">{daata.id || "<No Data>"}</td>
                  <td
                    key={"nick" + String(index)}
                    onClick={(event) => {
                      setgetindex(index);
                      setColumn(1);
                    }}
                  >
                    {daata.nick || "<No Data>"}
                  </td>
                  <td
                    onClick={(event) => {
                      setColumn(2);

                      setgetindex(index);
                    }}
                  >
                    {daata.Course || "<No Data>"}
                  </td>
                  <td
                    onClick={(event) => {
                      setgetindex(index);
                      setColumn(3);
                      // console.log(Column);
                    }}
                  >
                    {daata["Serious"].split("===\n")[1] || "<No Data>"}
                  </td>
                  <td
                    onClick={(event) => {
                      setColumn(4);

                      setgetindex(index);
                    }}
                  >
                    {daata.maxSpecial[0] || "<No Data>"}
                  </td>

                  <td
                    onClick={(event) => {
                      setColumn(5);

                      setgetindex(index);
                    }}
                  >
                    {daata.ProjectName || "<No Data>"}
                  </td>
                </tr>
              </>
              
            );
          })}
          
          
          
        </table>
      </div>
      <div id="box_value" className="box_value">
        {(() => {
          if (Column == 1) {
            return (
              <>
                <h1 style={{ marginTop: "10px" }}>
                  {viewdata[getindex].nick}'s General Information
                </h1>
                <h3 style={{ marginTop: "-20px" }}>
                  Name : {viewdata[getindex].fullname || "<No Data>"}
                </h3>
                <h3 style={{ marginTop: "30px" }}>
                  Nick Name :{" "}
                  {JSON.stringify(
                    viewdata[getindex].nick || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
                <h3 style={{ marginTop: "80px" }}>
                  Age:{" "}
                  {JSON.stringify(
                    viewdata[getindex].age || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
                {/* </div> */}
                <h3 style={{ marginTop: "80px", marginLeft: "270px" }}>
                  Code :{" "}
                  {JSON.stringify(
                    viewdata[getindex].Code || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>

                <h3 style={{ marginTop: "-20px", marginLeft: "270px" }}>
                  Email :{" "}
                  <Mailto
                    email={JSON.stringify(
                      viewdata[getindex].Email || "<No Data>"
                    ).replace(/['"]+/g, "")}
                  ></Mailto>
                </h3>
                <h3 style={{ marginTop: "30px", marginLeft: "270px" }}>
                  Line :{" "}
                  {JSON.stringify(
                    viewdata[getindex].Line || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>

                <div style={{ marginTop: "180px", textAlign: "left" }}>
                  <h4 style={{ marginLeft: "20px" }}>
                    Interest :{viewdata[getindex].Interest || "<No Data>"}
                  </h4>
                  <h4 style={{ marginLeft: "20px" }}>
                    Goal :{viewdata[getindex].Goal || "<No Data>"}
                  </h4>
                  <h4 style={{ marginLeft: "20px" }}>
                    Experience :{viewdata[getindex].Experience || "<No Data>"}
                  </h4>

                  <h4 style={{ marginLeft: "20px" }}>
                    Impression :{viewdata[getindex].Impression || "<No Data>"}
                  </h4>
                  <h4 style={{ marginLeft: "20px" }}>Pros:</h4>
                  <h5 style={{ marginLeft: "40px" }}>
                    {viewdata[getindex].Pro || "<No Data>"}
                  </h5>
                  <h4 style={{ marginLeft: "20px" }}>Cons:</h4>
                  <h5 style={{ marginLeft: "40px" }}>
                    {viewdata[getindex].Cons || "<No Data>"}
                  </h5>
                  <h4 style={{ marginLeft: "20px" }}>Comment:</h4>
                  {objCommentDes[getindex].map((n, i) => {
                    return (
                      <>
                        <h4 style={{ marginLeft: "20px" }}>Day{i + 1}</h4>
                        <h5 style={{ marginLeft: "40px" }}>
                          {objCommentDes[getindex][i]}
                        </h5>
                      </>
                    );
                  })}
                </div>
              </>
            );
          } else if (Column == 2) {
            return (
              <>
                <h1>
                  {viewdata[getindex].nick || "<No Data>"}
                  's Course
                </h1>
                <h3 style={{ marginTop: "-20px" }}>
                  Course :{" "}
                  {viewdata[getindex].Course.split("/")[0] || "<No Data>"}
                </h3>
                <h3 style={{ marginTop: "-20px", marginLeft: "270px" }}>
                  Gen :{" "}
                  {viewdata[getindex].Course.split("/")[1].replace("gen", "") ||
                    "<No Data>"}
                </h3>
                <h3 style={{ marginTop: "30px" }}>
                  Level :{" "}
                  {viewdata[getindex].Course.split("/level")[1] || "<No Data>"}
                </h3>
                <h3 style={{ marginTop: "30px", marginLeft: "270px" }}>
                  Number : {viewdata[getindex].Number || "<No Data>"}
                </h3>
                <h3 style={{ marginTop: "80px" }}>
                  Group : {viewdata[getindex].Group || "<No Data>"}
                </h3>
                <h3 style={{ marginTop: "80px", marginLeft: "270px" }}>
                  CourseID : {viewdata[getindex].CourseID || "<No Data>"}
                </h3>
                <div style={{ marginTop: "180px" }}>
                  <LineIntention data={objCheckin[getindex]} />
                  <h2 style={{ textAlign: "left", marginLeft: "20px" }}>
                    Description:
                  </h2>
                  <h4 style={{ textAlign: "left", marginLeft: "20px" }}>
                    {" "}
                    {viewdata[getindex].Power.split("\n===\n")[1] ||
                      "<No Data>"}
                  </h4>
                  <h2 style={{ textAlign: "left", marginLeft: "20px" }}>
                    คอร์สที่แนะนำต่อ:
                  </h2>
                  <h4 style={{ textAlign: "left", marginLeft: "20px" }}>
                    {" "}
                    {viewdata[getindex]["คอร์สที่แนะนำต่อไปพร้อมเหตุผล"] ||
                      "<No Data>"}
                  </h4>
                </div>
              </>
            );
          } else if (Column == 3) {
            if (!viewdata[getindex] || viewdata[getindex].length <= 0) return;
            return (
              <>
                <h1>
                  {viewdata[getindex].nick || "<No Data>"}
                  's Problems
                </h1>
                <div class="Problem">
                  <LineChartProblem data={objProblem[getindex].P_rank} />
                </div>
                {objProblem[getindex].problem.map((n, i) => {
                  return (
                    <>
                      <h4 style={{ textAlign: "left", marginLeft: "20px" }}>
                        Day{i + 1}:{" "}
                      </h4>
                      <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                        Problem:{objProblem[getindex].problem[i]}
                      </h5>
                      <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                        Cause:{objProblem[getindex].cause[i]}
                      </h5>
                      <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                        Solution:{objProblem[getindex].cause[i]}
                      </h5>
                      <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                        Result:{objProblem[getindex].effect[i]}
                      </h5>
                    </>
                  );
                })}
                <h4 style={{ textAlign: "left", marginLeft: "20px" }}>
                  สรุป:{" "}
                </h4>
                <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                  Problem:{viewdata[getindex].Problem.split("===\n")[1]}
                </h5>
                <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                  Cause:{viewdata[getindex].Cause.split("===\n")[1]}
                </h5>
                <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                  Solution:{viewdata[getindex].Solution.split("===\n")[1]}
                </h5>
                <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                  Result:{viewdata[getindex].Effect.split("===\n")[1]}
                </h5>
              </>
            );
          } else if (Column == 4) {
            if (!viewdata[getindex] || viewdata[getindex].length <= 0) return;
            return (
              <>
                <h1>
                  {viewdata[getindex].nick || "<No Data>"}
                  's Special
                </h1>
                <BarSpecial data={objSpecialline[getindex]} />
                {objSpecialDes[getindex].map((n, i) => {
                  return (
                    <>
                      <h4 style={{ textAlign: "left", marginLeft: "20px" }}>
                        Day{i + 1}:{" "}
                      </h4>
                      <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                        {n}
                      </h5>
                    </>
                  );
                })}
              </>
            );
          } else if (Column == 5) {
            return (
              <>
                <h1>
                  {JSON.stringify(
                    viewdata[getindex].nick || "<No Data>"
                  ).replace(/['"]+/g, "")}
                  's Project
                </h1>
                <img
                  src={viewdata[getindex].ImgProject}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = image;
                  }}
                />{" "}
                <h4 style={{ textAlign: "left", marginLeft: "20px" }}>
                  Project Name :{" "}
                  {JSON.stringify(
                    viewdata[getindex].ProjectName || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h4>
                <h4 style={{ textAlign: "left", marginLeft: "20px" }}>Description : </h4>
                <h4 style={{ textAlign: "left", marginLeft: "20px" }}>
                  {JSON.stringify(
                    viewdata[getindex].ProjectDescription || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h4>
                {/* <h3 style={{ marginTop: +330 }}>
                  {JSON.stringify(viewdata[getindex].projectdescription).replace(
                    /['"]+/g,
                    ""
                  )}
                </h3> */}
              </>
            );
          } else if (Column == 0) {
            return (
              <>
              <div style={{ textAlign: "left", marginLeft: "20px" }}>
                <center>
                <h1>Description</h1></center>
                <h4 >
                  {" "}
                  1. พิมพ์ชื่อและเลือกข้อมูลและผู้สอนนักเรียนได้บนหัวตาราง
                </h4>
                <h4 >
                  {" "}
                  2.
                  คลิกที่ตารางแต่ละช่องเพื่อดูรายละเอียดข้อมูลนักเรียนและผู้สอนเพิ่มเติมได้
                  โดยตารางบนเป็นข้อมูลนักเรียน ตารางล่างเป็นข้อมูลผู้สอน
                </h4>
                <h4 >
                  {" "}
                  3. คลิกที่มุมขวาบนเพื่อไปหน้าอื่น กดที่ Hamster Hub
                  ที่มุมซ้ายบนเพื่อกลับหน้าแรก
                </h4>
                <h4 >
                  {" "}
                  4. ในหน้า Class เลือกคอร์สทางด้านขวาเพื่อเปรียบเทียบคอร์ส
                </h4>
                <h4
                  style={{

                    color: "red",
                  }}
                >
                  {" "}
                  ##ข้อมูลนี้เป็นข้อมูลที่ไม่มีอยู่จริง
                </h4>
                </div>
                
              </>
            );
          } else if (Column == 6) {
            return (
              <>
                <h1 style={{ marginTop: "10px", whiteSpace: "normal" }}>
                  {viewdatamod[getindex].nick}'s General Information
                </h1>
                <h3
                  style={{
                    marginTop: "-20px",
                    display: "inline-block",
                    whiteSpace: "normal",
                  }}
                >
                  Name : {viewdatamod[getindex].fullname || "<No Data>"}
                </h3>
                <h3 style={{ marginTop: "30px" }}>
                  ID :{" "}
                  {JSON.stringify(
                    viewdatamod[getindex].id.split("-")[0] || "<No Data>"
                  ).replace(/['"]+/g, "")}
                </h3>
                <h3 style={{ marginTop: "30px", marginLeft: "270px" }}>
                  Code : {viewdatamod[getindex].Code || "<No Data>"}
                </h3>

                <div style={{ marginTop: "120px" }}>
                  <h2 style={{ textAlign: "left", marginLeft: "20px" }}>
                    Pros
                  </h2>
                  <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                    {viewdatamod[getindex].Pro}
                  </h5>
                  <h2 style={{ textAlign: "left", marginLeft: "20px" }}>
                    Cons
                  </h2>
                  <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                    {viewdatamod[getindex].Cons}
                  </h5>
                </div>
                <h2
                  style={{
                    textAlign: "left",
                    marginLeft: "20px",
                    marginTop: "10px",
                  }}
                >
                  Comment:
                </h2>
                <div style={{ marginTop: "10px" }}>
                  {objCommentDesMod[getindex].map((n, i) => {
                    return (
                      <>
                        <h4 style={{ textAlign: "left", marginLeft: "20px" }}>
                          Day{i + 1}
                        </h4>
                        <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                          {n}
                        </h5>
                      </>
                    );
                  })}
                </div>
              </>
            );
          } else if (Column == 7) {
            return (
              <>
                <h1>
                  {viewdatamod[getindex].nick || "<No Data>"}
                  's Course
                </h1>
                <h3 style={{ marginTop: "-20px" }}>
                  Course :{" "}
                  {viewdatamod[getindex].Course.split("/")[0] || "<No Data>"}
                </h3>
                <h3 style={{ marginTop: "-20px", marginLeft: "270px" }}>
                  Gen :{" "}
                  {viewdatamod[getindex].Course.split("/")[1].replace(
                    "gen",
                    ""
                  ) || "<No Data>"}
                </h3>
                <h3 style={{ marginTop: "30px" }}>
                  Level :{" "}
                  {viewdatamod[getindex].Course.split("/level")[1] ||
                    "<No Data>"}
                </h3>
                {/* <h3 style={{ marginTop: "30px", marginLeft: "270px" }}>
                  Student :{" "}
                  {viewdatamod[getindex].age || "<No Data>"}
                </h3> */}
                <h3 style={{ marginTop: "80px" }}>
                  Group : {viewdatamod[getindex].Group || "<No Data>"}
                </h3>
                <h3 style={{ marginTop: "30px", marginLeft: "270px" }}>
                  CourseID : {viewdatamod[getindex].CourseID || "<No Data>"}
                </h3>
                <div style={{ marginTop: "180px" }}>
                  <h2 style={{ textAlign: "left", marginLeft: "20px" }}>การเข้าเรียน:</h2>
                  {CheckinMod[getindex].map((n, i) => {
                    return (
                      <>
                        <h4 style={{ textAlign: "left", marginLeft: "20px" }}>
                          Day{i + 1}
                        </h4>
                        <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                          {n}
                        </h5>
                      </>
                    );
                  })}
                </div>
              </>
            );
          } else if (Column == 8) {
            if (!viewdatamod[getindex] || viewdatamod[getindex].length <= 0)
              return;
            return (
              <>
                <h1>
                  {viewdatamod[getindex].nick || "<No Data>"}
                  's Problems
                </h1>
                <div class="Problem">
                  <LineChartProblem data={objProblemmod[getindex].P_rank} />
                </div>
                {objProblemmod[getindex].problem.map((n, i) => {
                  return (
                    <>
                      <h4 style={{ textAlign: "left", marginLeft: "20px" }}>
                        Day{i + 1}:{" "}
                      </h4>
                      <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                        Problem:{objProblemmod[getindex].problem[i]}
                      </h5>
                      <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                        Cause:{objProblemmod[getindex].cause[i]}
                      </h5>
                      <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                        Solution:{objProblemmod[getindex].cause[i]}
                      </h5>
                      <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                        Result:{objProblemmod[getindex].effect[i]}
                      </h5>
                    </>
                  );
                })}
                <h4 style={{ textAlign: "left", marginLeft: "20px" }}>
                  สรุป:{" "}
                </h4>
                <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                  Problem:{viewdatamod[getindex].Problem.split("===\n")[1]}
                </h5>
                <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                  Cause:{viewdatamod[getindex].Cause.split("===\n")[1]}
                </h5>
                <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                  Solution:{viewdatamod[getindex].Solution.split("===\n")[1]}
                </h5>
                <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                  Result:{viewdatamod[getindex].Effect.split("===\n")[1]}
                </h5>
              </>
            );
          } else if (Column == 9) {
            if (!viewdatamod[getindex] || viewdatamod[getindex].length <= 0)
              return;
            return (
              <>
                <h1>
                  {viewdatamod[getindex].nick || "<No Data>"}
                  's Special
                </h1>
                <BarSpecialMod data={objSpecialmodline[getindex]} />
                <div>
                  {SpecialModDes[getindex].map((n, i) => {
                    return (
                      <>
                        <h4 style={{ textAlign: "left", marginLeft: "20px" }}>
                          Day{i + 1}
                        </h4>
                        <h5 style={{ textAlign: "left", marginLeft: "30px" }}>
                          {n}
                        </h5>
                      </>
                    );
                  })}
                </div>
              </>
            );
          }
        })()}
      </div>
    </>
  );
} // )}}a
function Mailto(email) {
  return <a href={`mailto:${email.email}`}>{email.email}</a>;
}

