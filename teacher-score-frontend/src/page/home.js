import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/Auth.context.js";
import ax from "../conf/ax.js";
import { useNavigate } from "react-router";
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
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


const HomePage = () => {

  const navigate = useNavigate()
  const { state: ContextState, logout } = useContext(AuthContext);
  const { user } = ContextState;
  const onLogout = (e) => {
    e.preventDefault();
    logout();
  };
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page])

  return (
    <div className>
      <div className="col-sm-8">
        <h1>Hello {user.email}</h1>
      </div>

      <div className="col-sm-4">
        <h1>
          <a href="/login" onClick={onLogout}>
            Logout
          </a>
        </h1>
      </div>

      <div class="grid gap-4">
        <h1 class="my-5">Anounced Subjects</h1>


        {/* <!-- Cards --> */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard title="Total Subjects" value="6389">
            <RoundIcon
              icon={PeopleIcon}
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            />
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
                  Subjects
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold bg-cyan-900 text-white-100 uppercase tracking-wider"
                >
                  Total Topic
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold bg-cyan-900 text-white-100 uppercase tracking-wider"
                >
                  Updated_date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-semibold bg-cyan-900 text-white-100 uppercase tracking-wider"
                >
                  Open Topic
                </th>
              </tr>
            </thead>
            <TableBody>
              {data.map((user, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User image" />
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">$ {user.amount}</span>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.status}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </table>
          <TableFooter>
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

export default HomePage;
