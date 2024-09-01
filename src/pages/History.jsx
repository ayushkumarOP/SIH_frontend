import React, { useState } from 'react';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

const Container = styled.div`
  margin-top: 6%;
  margin-left: 18%;
`;

const statusOptions = ['Pending', 'Paid', 'Overdue'];
const StatusSelect = styled.select`
  color: ${({ value }) => {
    switch (value) {
      case 'Paid':
        return 'green';
      case 'Pending':
        return 'goldenrod';
      case 'Overdue':
        return 'red';
      default:
        return 'inherit';
    }
  }};
  border-color: ${({ value }) => {
    switch (value) {
      case 'Paid':
        return 'green';
      case 'Pending':
        return 'goldenrod';
      case 'Overdue':
        return 'red';
      default:
        return 'inherit';
    }
  }};
  border-radius: 5px;
  padding: 2px;
`;

const StatusCellRenderer = (params) => {
  const selectedValue = params.value || 'Pending';
  const handleChange = (event) => {
    params.setValue(event.target.value);
  };

  return (
    <StatusSelect value={selectedValue} onChange={handleChange}>
      {statusOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </StatusSelect>
  );
};



const History = () => {
  const [rowData, setRowData] = useState([]);

  const [colDefs] = useState([
    { headerName: "Invoice Number", field: "invoiceNumber", flex: 2 },
    { headerName: "Sender", field: "billedFrom.sender", flex: 2 },
    { headerName: "Receiver", field: "billTo.name", flex: 2 },
    { headerName: "Amount", field: "amount", flex: 2, },
    { headerName: "Status", field: "status", cellRenderer: StatusCellRenderer, flex: 2 },
  ]);

  const onGridReady = (params) => {
    fetch("http://localhost:8080/api/invoice/all") // Adjust API endpoint as necessary
      .then(resp => resp.json())
      .then(data => {
        setRowData(data);
        params.api.applyTransaction({ add: data });
      })
      .catch(error => {
        console.error("Error fetching invoices:", error);
      });
  }

  const defaultColDef = {
    sortable: true,
    flex: 2,
    filter: true,
    floatingFilter: true,
    editable: true
  };

  return (
    <Container>
      <div className="ag-theme-material" style={{ height: 570 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={10}
          paginationAutoPageSize={true}
        />
      </div>
    </Container>
  );
}

export default History;
