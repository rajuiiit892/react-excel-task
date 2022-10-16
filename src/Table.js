import { Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";

const { Column } = Table;

export default function TableData({tableData,searchData}) {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [batches, setbatches] = useState({});

  useEffect(()=>{
          if(tableData.length > 0){
            updateDataFormatForTable(tableData);
          }
  },[tableData])

  useEffect(()=>{
        if(data.length > 0){
        onFilteredTheData(searchData);
        }
},[searchData])

  

  const convertObjectToArrayOfObjects = (productionItem) => {
    const finalTableData = Object.keys(productionItem).map((itemKey, index) => {
      return { ...productionItem[itemKey], name: itemKey, key: index };
    });
    setData(finalTableData);
    setFilterData(finalTableData);
  };

  const updateObject = (item, production) => {
    for (let i of Object.keys(item)) {
      production[item.name][i].push(item[i]);
    }
  };

  const updateDataFormatForTable = (data) => {
    const production = {};
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (production[item.name]) {
        updateObject(item, production);
      } else {
        production[item.name] = {};
        for (let i of Object.keys(item)) {
          production[item.name][i] = [item[i]];
        }
      }
    }
    convertObjectToArrayOfObjects(production);
  };


  const onFilteredTheData = (value) => {
    const filterData = data.filter((post) => {
      if (value === "") {
        //if query is empty
        return post;
      } else if (post.name.toLowerCase().includes(value.toLowerCase())) {
        //returns filtered array
        return post;
      }
    });
    setFilterData(filterData);
  };

  const updateSelectBatch = (val, key) => {
    const batch = { ...batches };
    if (val === "0") {
      delete batch[key];
    } else {
      batch[key] = val;
    }
    setbatches(batch);
  };

  return (
    <div className="App">
      <Table dataSource={filterData}>
        <Column title="Name" dataIndex="name" />
        <Column
          title="Batch"
          dataIndex="batch"
          render={(batch, record) => (
            <select
              value={batches[record.key] || 0}
              onChange={(e) => updateSelectBatch(e.target.value, record.key)}
            >
              <option value={0}>All</option>
              {batch.map((val, index) => (
                <option value={index + 1}>{val}</option>
              ))}
            </select>
          )}
        />
        <Column
          title="Stock"
          dataIndex="stock"
          render={(val, record) => {
            if (!batches[record.key]) {
              return val.reduce((total, val) => total + val);
            }
            return val[batches[record.key] - 1];
          }}
        />
        <Column
          title="Deal"
          dataIndex="deal"
          render={(val, record) => {
            if (!batches[record.key]) {
              return Math.min.apply(null, val);
            }
            return val[batches[record.key] - 1];
          }}
        />
        <Column
          title="Free"
          dataIndex="free"
          render={(val, record) => {
            if (!batches[record.key]) {
              return Math.min.apply(null, val);
            }
            return val[batches[record.key] - 1];
          }}
        />
        <Column
          title="MRP"
          dataIndex="mrp"
          render={(val, record) => {
            if (!batches[record.key]) {
              return Math.max.apply(null, val);
            }
            return val[batches[record.key] - 1];
          }}
        />
        <Column
          title="Rate"
          dataIndex="rate"
          render={(val, record) => {
            if (!batches[record.key]) {
              return Math.max.apply(null, val);
            }
            return val[batches[record.key] - 1];
          }}
        />
        <Column
          title="Exp"
          dataIndex="exp"
          render={(val, record) => {
            if (!batches[record.key]) {
              const dates = val?.sort();
              return moment(dates[0]).format("DD/MM/YYYY");
            }
            return moment(val[batches[record.key] - 1]).format("DD/MM/YYYY");
          }}
        />
      </Table>
      ;
    </div>
  );
}