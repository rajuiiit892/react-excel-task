import './App.css';
import { Input } from 'antd';
import readXlsxFile from "read-excel-file";
import TableData from './Table';
import Charts from './Charts';
import { useState } from "react";
import { Button } from 'antd';

const { Search } =Input;

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [mode,setMode]=useState("table");


  const onUploadFile = (e) => {
    readXlsxFile(e.target.files[0]).then((rows) => {
      const heading = rows?.splice(0, 1)[0];
      const data = rows.map((value, i) => {
        const result = {};
        value.map((h, index) => {
          result[heading[index]] = h;
        });
        return result;
      });
     setData(data)
    });
  };

 const onSearch=(val)=>{
  setInput(val)
 }

  return (
    <div className="App">
      <div className='flex-box'>
      <Button onClick={()=>setMode("table")} >Table</Button>
      <Button onClick={()=>setMode("charts")}>charts</Button>
      </div>
      <div className="flex-container">
      <div style={{ textAlign: "left", margin: 10 }}>
        <input type="file" accept=".xls,.xlsx" onChange={onUploadFile} />
      </div>
      {mode ==='table' &&
      <div style={{ margin: 10 }}>
      <Search
      placeholder="Search by name"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
      </div>
}
      </div>
      {mode ==='table' ?
      <TableData searchData={input} tableData={data} /> : <Charts tableData={data} />}
    </div>
  );
}

export default App;
