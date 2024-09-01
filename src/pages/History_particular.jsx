import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ParticularHistory = () => {
  const location = useLocation();
  const userEmail = location.state?.userEmail || "";
  console.log(userEmail);
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const columnDefs = [
    { headerName: "Invoice Number", field: "invoiceNumber", sortable: true, filter: true },
    { headerName: "Billed From", field: "billedFrom.sender", sortable: true, filter: true },
    { headerName: "Billed To", field: "billTo.name", sortable: true, filter: true },
    { headerName: "Amount", field: "amount", sortable: true, filter: true },
    { headerName: "Date", field: "createdAt", sortable: true, filter: true, valueFormatter: params => new Date(params.value).toLocaleDateString() },
  ];

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/invoice/by-sender-email', {
          params: { email: userEmail }
        });
        setRowData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching invoices.");
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchInvoices();
    } else {
      setError("No user email provided.");
      setLoading(false);
    }
  }, [userEmail]);

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  return (
    <Container>
      <h2>Invoice History for {userEmail}</h2>
      <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          defaultColDef={{
            flex: 1,
            minWidth: 150,
            resizable: true,
          }}
        />
      </div>
    </Container>
  );
};

export default ParticularHistory;
