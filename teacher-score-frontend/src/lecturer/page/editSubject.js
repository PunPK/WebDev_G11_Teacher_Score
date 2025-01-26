import React, { useState, useEffect } from "react";
import { Spin, Typography, Divider, Button } from "antd";
// import AddItem from "../components/AddItem";
// import EditDataList from "../tables/editDataList";
// import Modal from "../components/EditItem";
import ax from "../../conf/ax.js";
import dayjs from "dayjs";
import Navbar from "../../components/navbar";
import { useParams } from "react-router-dom";
import editDataList from "../table/editList.js";

const URL_TXACTIONS = "/api/txactions";

function EditSubject() {
  const [summaryAmount, setSummaryAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [subjectData, setSubjectData] = useState([]);
  const [isModalShow, setIsModalShow] = useState(false);
  const [editData, setEditData] = useState(null);
  const { subject } = useParams();
  const openModal = (record) => {
    setEditData(record);
    setIsModalShow(true);
  };

  const closeModal = () => {
    setIsModalShow(false);
    setEditData(null);
  };

  const fetchSubject = async () => {
    try {
      const response = await ax.get(
        `http://localhost:1337/api/subjects/${subject}`,
        {
          params: {
            populate: "*",
          },
        }
      );
      console.log(response.data.data);
      setSubjectData(response.data.data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  //   const handleNoteChanged = (id, note) => {
  //     setTransactionData(
  //       transactionData.map((transaction) => {
  //         transaction.note = transaction.id === id ? note : transaction.note;
  //         return transaction;
  //       })
  //     );
  //   };
  //   const handleAddItem = async (item) => {
  //     try {
  //       setIsLoading(true);
  //       const params = { ...item, action_datetime: dayjs() };
  //       const response = await axios.post(URL_TXACTIONS, { data: params });
  //       const { id, attributes } = response.data.data;
  //       setTransactionData([
  //         ...transactionData,
  //         { id: id, key: id, ...attributes },
  //       ]);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   const handleRowDeleted = async (itemId) => {
  //     try {
  //       setIsLoading(true);
  //       await axios.delete(`${URL_TXACTIONS}/${itemId}`);
  //       fetchItems();
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   const handleRowEdited = async (item) => {
  //     try {
  //       setIsLoading(true);
  //       const response = await axios.put(`${URL_TXACTIONS}/${item.id}`, {
  //         data: item,
  //       });
  //       fetchItems();
  //       const { id, attributes } = response.data.data;

  //       setTransactionData([
  //         ...transactionData,
  //         { id: id, key: id, ...attributes },
  //       ]);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  useEffect(() => {
    fetchSubject();
  }, [subject]);

  //   useEffect(() => {
  //     setSummaryAmount(
  //       transactionData.reduce(
  //         (sum, transaction) =>
  //           transaction.type === "income"
  //             ? sum + transaction.amount
  //             : sum - transaction.amount,
  //         0
  //       )
  //     );
  //   }, [transactionData]);

  return (
    <div className="App">
      <Navbar></Navbar>
      <body className="App-finance-body">
        <Spin spinning={isLoading}>
          <Typography.Title>
            จำนวนเงินปัจจุบัน {summaryAmount} บาท
          </Typography.Title>

          <Divider>บันทึก รายรับ - รายจ่าย</Divider>
          <editDataList data={subjectData} />
          {/* <AddItem onItemAdded={handleAddItem} /> */}
          {/* <EditDataList
            data={transactionData}
            onRowEdited={openModal}
            onNoteChanged={handleNoteChanged}
            onRowDeleted={handleRowDeleted}
          />
          {isModalShow && (
            <Modal
              //   defaultValue={editData}
              closeModal={closeModal}
              onSubmit={handleRowEdited}
            />
          )} */}
        </Spin>
      </body>
    </div>
  );
}

export default EditSubject;
