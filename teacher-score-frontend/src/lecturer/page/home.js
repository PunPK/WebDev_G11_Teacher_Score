import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth.context.js";
import ax from "../../conf/ax.js";
import { useNavigate } from "react-router";
import { useSearchParams } from 'react-router-dom';
import InfoCard from '../../components/Cards/InfoCard'
import RoundIcon from '../../components/RoundIcon'
import response from '../../utils/demo/tableData'
import { Badge, } from '@windmill/react-ui'
import dayjs from "dayjs";
import { Card, Typography } from "@material-tailwind/react";
import { Button, Spinner } from "flowbite-react";

const HomeLecturer = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state: ContextState, logout } = useContext(AuthContext);
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [totalTopic, setTotalTopic] = useState(0)
  const { user } = ContextState;
  const onLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const goToTopic = () => {
    navigate("/topic");
  };

  const fetchSubject = async () => {
    setLoading(true)
    try {
      const subjectUrl = "http://localhost:1337/api/subjects?populate=*"
      const response = await ax.get(subjectUrl)
      console.log(response.data.data)
      setSubjectData(response.data.data)

    } catch (e) {
      console.log(e);
    }
    finally {
      setLoading(false)
    }
  };

  const fetchTopic = async () => {
    try {
      const subjectUrl = "http://localhost:1337/api/subjects?populate=*"
      const response = await ax.get(subjectUrl)
      console.log(response.data.data)
      setSubjectData(response.data.data)
    } catch (e) {
      console.log(e);
    }
  }

  // pagination setup
  const resultsPerPage = 10
  const totalResults = subjectData.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  useEffect(() => {
    fetchSubject();
  })

  // on page change, load new sliced data
  // here you would make another server request for new data

  // useEffect(() => {
  //   setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  // }, [page])

  const TABLE_HEAD = ["รายชื่อวิชา", "จำนวนเรื่อง", "อาจารย์ผู้สอน", "วันที่สร้าง", "แก้ไขล่าสุด", "เข้ารายวิชา"]

  return (
    <div class="">
      <div className="col-sm-8 row-span-1">
        <h1>Hello lecturer {user.username}</h1>
      </div>


      <button href="/" onClick={onLogout} className="items-end justify-self-end">

        Logout

      </button>



      <Card className="col-sm-4 items-center justify-items-center mx-auto w-full h-auto shadow-xl">
        <Typography>
          <h1 class="mx-auto my-5 text-5xl font-sans">Score Anouncer</h1>
        </Typography>
      </Card>




      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Total Subjects" value={subjectData.length}>
          {/* <RoundIcon
              // icon={ }
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            /> */}
        </Card>
      </div>

      <div class="mx-12 ">
        <Card className="h-full w-auto drop-shadow-x1 ">
          <table className="w-auto min-w-8  text-left table-auto border-white-100 hover:drop-shadow-xl">
            <thead>
              <tr >
                {
                  TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className=" p-4"
                    >
                      <Typography
                        variant="small"
                        className="font-normal leading-none"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {
                subjectData.map((user, i) => (
                  <tr class="bg-white  dark:bg-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th sscope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">{user.title}</p>
                          <p className="text-xs text-gray-600">{user.description}</p>
                        </div>
                      </div>
                    </th>
                    <td class="px-6 py-4">
                      <span className="text-sm">{user.topics.length === 0 ? <Typography class="text-red-600">ไม่มีหัวข้อ</Typography> : user.topics.length}</span>
                    </td>
                    <td class="px-6 py-4">
                      <span className="text-sm"></span>
                    </td>
                    <td class="px-6 py-4">
                      <span className="text-sm">{dayjs(user.createdAt).format("DD/MM/YYYY - HH:mm")}</span>
                    </td>
                    <td class="px-6 py-4">
                      <p >{dayjs(user.updatedAt).format("DD / MM / YYYY เวลา HH:mm น.")}</p>
                      {/* <Badge type={user.status}>{user.status}</Badge> */}
                    </td>
                    <td class="px-6 py-4">
                      {/* <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span> */}
                      <button className="font-semibold bg-indigo-700 text-white-100 hover:bg-cyan-700 hover:text-cyan-50 w-14 h-8 justify-items-center">Open</button>
                    </td>
                  </tr>
                ))}

            </tbody>
          </table>
        </Card>
      </div>
      <div className="flex overflow-x-auto sm:justify-center">
        {/* <Pagination
            currentPage={page}
            totalPages={totalResults}
            onPageChange={onPageChange}
          /> */}
      </div>
    </div>


  );
};

export default HomeLecturer;
