import React, { useEffect, useState } from "react";
import ax from "../conf/ax.js";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Nav_lec from "../components/navbar.js";
import { Tag } from "antd";
import defaultUserIcon from "../components/user-icon.webp";

const ContactLecturer = () => {
  const [Data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");


  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await ax.get(
        "users?filters[role][name][$eq]=Lecturer&populate=*"
      );
      // console.log(response.data);
      setData(response.data);
    } catch (e) {
      console.error("Error fetching subjects:", e);
      setError("Error fetching subjects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    setSearchTerm(query);
  };

  const filteredLecturer = query
    ? Data.filter(
      (Lecturer) =>
        Lecturer.first_name.toLowerCase().includes(query.toLowerCase()) ||
        Lecturer.last_name.toLowerCase().includes(query.toLowerCase())
    )
    : Data;

  return (
    <>
      <div class=" bg-gradient-to-tl from-blue-800 to-cyan-300 min-h-screen max-h-full top-0 mt-0 z-0">
        <Nav_lec className="z-50" />
        <Card className="mt-10 mx-auto w-72 h-24 shadow-xl bg-white mb-8">
          <Typography className="items-center justify-items-center w-fit mx-auto my-auto">
            <h1 class="mx-auto text-5xl font-sans">รายชื่อาจารย์</h1>
          </Typography>
        </Card>

        <div className="flex gap-10 mb-4 mx-28 ">
          <div>
            <Card className="bg-white">
              <CardBody>
                <Typography className="font-bold text-lg">
                  จำนวนอาจารย์ทั้งหมด
                </Typography>
                <Typography className="ml-4">{Data.length} คน</Typography>
              </CardBody>
            </Card>
          </div>
          <Card>
            <div>
              <Card className="flex flex-col items-start gap-2 p-4">
                <input
                  title="ค้นหา"
                  type="text"
                  placeholder="ค้นหาชื่ออาจารย์"
                  className="bg-white h-10 w-64 border-2 border-gray-300 rounded-lg px-2"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />

                {query && filteredLecturer.length > 0 && (
                  <ul className="absolute top-14 left-4 w-64 bg-white border border-gray-300 rounded-lg shadow-md max-h-48 overflow-y-auto z-10">
                    {filteredLecturer.map((lecturer) => (
                      <li
                        key={lecturer.id}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => setQuery(lecturer.first_name)}
                      >
                        {`${lecturer.first_name} ${lecturer.last_name}`}
                      </li>
                    ))}
                  </ul>
                )}
                <Card
                  onClick={handleSearch}
                  className="group shadow-md shadow-black items-center justify-items-center rounded-bl-lg hover:bg-gradient-to-tr bg-gradient-to-tr from-light-blue-700 to-blue-400 text-white hover:to-blue-800 hover:from-cyan-600 hover:translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer w-64 h-10 flex justify-center"
                >
                  <span className="font-semibold">ค้นหา</span>
                </Card>
              </Card>
            </div>
          </Card>
        </div>
        <Card className="mx-28 h-fit bg-white my-2">
          <div class=" grid grid-cols-2 gap-6 mx-6 my-6">
            {filteredLecturer.map((lecturer) => (
              <Card className="group h-full w-full  bg-gradient-to-tr from-blue-50 hover:-translate-y-2 transition-all duration-200 delay-75 hover:drop-shadow-5xl cursor-pointer  hover:bg-gradient-to-tr hover:from-blue-700 hover:to-blue-900  hover:shadow-blue-400 ">
                <div className="flex justify-center mt-4">
                  <img
                    src={
                      lecturer.profile_picture?.url
                        ? `http://localhost:1337${lecturer.profile_picture.url}`
                        : defaultUserIcon
                    }
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                  />
                </div>
                <CardBody>
                  <Typography
                    vatiant="h5"
                    className="mb-2 text-2xl font-bold group-hover:text-white"
                  >
                    {`${lecturer.first_name} ${lecturer.last_name}`}
                  </Typography>

                  <Typography className="group-hover:text-white">
                    {lecturer.email}
                  </Typography>

                  <Typography className="group-hover:text-white">
                    <Tag color={lecturer.confirmed ? "green" : "red"}>
                      {lecturer.confirmed ? "Confirmed" : "Not Confirmed"}
                    </Tag>
                  </Typography>
                </CardBody>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};

export default ContactLecturer;
