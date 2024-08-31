import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PrintWrapper = styled.div`
  @media print {
    width: 210mm;
    height: 297mm;
    padding: 20mm;
    margin: 0 auto;
  }
`;
const PlaceholderText = styled.p`
  color: #999;
  font-style: italic;
`;
const PreviewContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  font-family: Arial, sans-serif;
  @media print {
    border: none;
    padding: 0;
    max-width: none;
  }
`;

const InvoiceHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CompanyInfo = styled.div`
  display: flex;
  justify-content: left;
  align-items: left;
  margin-bottom: 20px;
`;

const CompanySection = styled.div`
  width: 60%;
`;

const InvoiceTitle = styled.h1`
  font-size: 24px;
`;

const BillingInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const BillingSection = styled.div`
  width: 60%;
`;
const InvoiceInfoSection = styled.div`
  width: 40%;
  text-align: right;
`;

const ItemsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const TotalSection = styled.div`
  text-align: right;
`;

const InvoicePreview = ({ billedFrom, billTo, items,  onInvoiceNumberGenerated }) => {
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const isCompanyInfoEmpty = !billedFrom.sender && !billedFrom.address && !billedFrom.city;

  const isBillToInfoEmpty = !billTo.name && !billTo.companyName && !billTo.address;

  useEffect(() => {
    const generateInvoiceNumber = () => {
      return Math.floor(10000 + Math.random() * 90000).toString();
    };
    if (!invoiceNumber) {
      const newInvoiceNumber = generateInvoiceNumber();
      setInvoiceNumber(newInvoiceNumber);
      onInvoiceNumberGenerated(newInvoiceNumber);
    }
  }, [invoiceNumber, onInvoiceNumberGenerated]);
  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + Number(item.amount) * Number(item.cost),
      0
    );
  };

  return (
    <PrintWrapper>
      <PreviewContainer>
        <InvoiceHeader>
          <InvoiceTitle>INVOICE</InvoiceTitle>
        </InvoiceHeader>
        <CompanyInfo>
          {isCompanyInfoEmpty ? (
            <PlaceholderText>
              <h2>Company Name</h2>
              <p>Slogan</p>
              <p>Address</p>
              <p>Phone: </p>
              <p>Email: </p>
            </PlaceholderText>
          ) : (
            <CompanySection>
              <h3>{billedFrom.sender}</h3>
              <p>{billedFrom.slogan}</p>
              <p>{billedFrom.address}</p>
              <p>{`${billedFrom.city}, ${billedFrom.state} ${billedFrom.zip}`}</p>
              <p>Phone: {billedFrom.phone}</p>
              <p>Email: {billedFrom.email}</p>
            </CompanySection>
          )}
        </CompanyInfo>

        <BillingInfo>
            {isBillToInfoEmpty ? (
                <BillingSection>
                <h3>
                <i>BILL TO:</i>
            </h3>
                <PlaceholderText>
                    <p>Name</p>
                    <p>Company Name</p>
                    <p>Address</p>
                    <p>Phone: </p>
                    <p>Email: </p>
                </PlaceholderText>
                </BillingSection>
          ) : (
            <BillingSection>
            <p>{billTo.name}</p>
            <p>{billTo.companyName}</p>
            <p>{billTo.address}</p>
            <p>{`${billTo.city}, ${billTo.state} ${billTo.zip}`}</p>
            <p>Phone: {billTo.phone}</p>
          </BillingSection>
          )}
          <InvoiceInfoSection>
            <p>DATE: {new Date().toLocaleDateString()}</p>
            <p>INVOICE #: {invoiceNumber}</p>
          </InvoiceInfoSection>
        </BillingInfo>

        <ItemsTable>
          <thead>
            <tr>
              <TableHeader>S.No</TableHeader>
              <TableHeader>Item</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>Cost</TableHeader>
              <TableHeader>TOTAL</TableHeader>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.item}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>${item.cost}</TableCell>
                <TableCell>
                  ${Number(item.amount) * Number(item.cost)}
                </TableCell>
              </tr>
            ))}
          </tbody>
        </ItemsTable>

        <TotalSection>
          <p>Subtotal: ${calculateTotal().toFixed(2)}</p>
          <p>Tax Rate: 0.00%</p>
          <p>Tax: $0.00</p>
          <p>Other: $0.00</p>
          <h3>TOTAL: ${calculateTotal().toFixed(2)}</h3>
        </TotalSection>
      </PreviewContainer>
    </PrintWrapper>
  );
};

export default InvoicePreview;
