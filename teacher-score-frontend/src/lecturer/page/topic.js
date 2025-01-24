import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/Auth.context.js";
import ax from "../../conf/ax.js";
import { useNavigate } from "react-router";
import InfoCard from '../../components/Cards/InfoCard'
import RoundIcon from '../../components/RoundIcon'
import response from '../../utils/demo/tableData'
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from '@windmill/react-ui'
import axios from "axios";
import { BugAntIcon } from "@heroicons/react/16/solid";

const TopicLecturer = () => {
  const [topicData, setTopicData] = useState([]);
  const navigate = useNavigate()
  const { state: ContextState, logout } = useContext(AuthContext);
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const { user } = ContextState;
  const onLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/")
  };

  const fetchTopic = async () => {
    try {
      const topicUrl = "http://localhost:1337/api/topics?populate=*"
      const response = await ax.get(topicUrl)
      console.log(response.data.data)
      setTopicData(response.data.data)
    } catch (e) {
      console.log(e);
    }
  };

  // pagination setup
  const resultsPerPage = 20
  const totalResults = response.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  useEffect(() => {
    fetchTopic()
  })

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page])

  return (
    <div className>
      <div className="col-sm-8 row-span-1">
        <h1>Hello {user.email}</h1>
      </div>

      <div className="col-sm-4">
        <h1>
          <button  onClick={onLogout}>
            Logout
          </button>
        </h1>
      </div>

      <div class="grid gap-4">
        <h1 class="mx-auto my-5 text-5xl font-sans">Topic that announces the score</h1>


        {/* <!-- Cards --> */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard title="Total Topics" value="1">
            {/* <RoundIcon
              // icon={ }
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            /> */}
          </InfoCard>
        </div>
        <TableContainer className="bg-cyan-900">
          <table >
            <thead >
              <tr >
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold bg-cyan-900 text-white-100 uppercase tracking-wider"
                >
                  Topic Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold bg-cyan-900 text-white-100 uppercase tracking-wider"
                >
                  Upload time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold bg-cyan-900 text-white-100 uppercase tracking-wider"
                >
                  Score
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold bg-cyan-900 text-white-100 uppercase tracking-wider"
                >
                  Edit
                </th>
              </tr>
            </thead>
            <TableBody>
              {topicData.map((user) => (
                <TableRow >
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">{user.topic_title}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user.upload_time}</span>
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold">{user.topic_id.id}</p>
                    {/* <Badge type={user.status}>{user.status}</Badge> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </table>
          <TableFooter >
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              label="Table navigation"
              onChange={onPageChange}

            />
          </TableFooter>
        </TableContainer>
      </div>
    </div>

  );
};

export default TopicLecturer;