import React, { useState, useRef } from "react";
import styled from "styled-components";
import InvoicePreview from './InvoicePreview';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from "axios";

const PageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 20px; /* Reduced gap for better spacing */
`;

const Section = styled.div`
  flex: 1;
  padding: 0 20px;
  min-width: 300px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
`;

const Container2 = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
`;

const LabelContainer = styled.div`
  width: 120px;
  text-align: right;
  margin-right: 10px;
`;

const Title = styled.h2`
  font-size: 14px;
`;

const InputContainer = styled.div`
  flex: 1;
  max-width: calc(100% - 120px);
`;

const InputField = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 10px 0 70px;
`;

const ItemContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const ItemRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

const ItemInput = styled(InputField)`
  flex: 1;
  min-width: 100px;
`;

const AddItemButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
`;

const DownloadButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
`;

const Adddetails = () => {
  const [sender, setSender] = useState("");
  const [slogan, setSlogan] = useState("");
  const [address, setAddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [zip, setzip] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");

  const [name, setName] = useState("");
  const [companyname, setcompanyName] = useState("");
  const [address2, setAddress2] = useState("");
  const [city2, setcity2] = useState("");
  const [state2, setstate2] = useState("");
  const [zip2, setzip2] = useState("");
  const [phone2, setphone2] = useState("");

  const [items, setItems] = useState([
    { item: "", description: "", amount: "", cost: "" },
  ]);
  const [currentInvoiceNumber, setCurrentInvoiceNumber] = useState('');
  const handleInvoiceNumberGenerated = (number) => {
    setCurrentInvoiceNumber(number);
  };
  const handleDownload = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice #${currentInvoiceNumber}.pdf`);
  };
  
  const handleConfirm = async () => {
    const invoiceData = {
      billedFrom: {
        sender,
        slogan,
        address,
        city,
        state,
        zip,
        phone,
        email,
      },
      billTo: {
        name,
        companyName: companyname,
        address: address2,
        city: city2,
        state: state2,
        zip: zip2,
        phone: phone2,
      },
      items,
      invoiceNumber: currentInvoiceNumber, // Ensure this is set properly
    };

    try {
      const response = await axios.post('http://localhost:8080/api/invoice/add', invoiceData);
      alert('Invoice saved successfully!');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error saving invoice:', error);
      alert('There was an error saving the invoice. Please try again.');
    }
  };


  const itemsEndRef = useRef(null);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { item: "", description: "", amount: "", cost: "" }]);
    window.scrollBy({
      top: 50, // Adjust this value for scrolling down
      left: 0,
      behavior: 'smooth' // Optional: makes the scroll smooth
  });
  };
  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
    window.scrollBy({
      top: -50, // Adjust this value for scrolling down
      left: 0,
      behavior: 'smooth' // Optional: makes the scroll smooth
  });
  };

  const invoiceRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  return (
    <PageWrapper>
      <Wrapper>
      <Container>
        <SectionTitle>INVOICE</SectionTitle>
        <SectionContainer>
          <Section>
            <SectionTitle>BILLED FROM:</SectionTitle>
            <Container2>
              <LabelContainer>
                <Title>Company Name</Title>
              </LabelContainer>
              <InputContainer>
                <InputField
                  type="text"
                  placeholder="Enter Company Name"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  required
                />
              </InputContainer>
            </Container2>
            <Container2>
              <LabelContainer>
                <Title>Company Slogan</Title>
              </LabelContainer>
              <InputContainer>
                <InputField
                  type="text"
                  placeholder="Enter Slogan (optional)"
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                />
              </InputContainer>
            </Container2>
            <Container2>
              <LabelContainer>
                <Title>Street Address</Title>
              </LabelContainer>
              <InputContainer>
                <InputField
                  type="text"
                  placeholder="Enter Street Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required      
                />
              </InputContainer>
            </Container2>
            <Container2>
              <LabelContainer>
                <Title>City</Title>
              </LabelContainer>
              <InputContainer>
                <InputField
                  type="text"
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                  required
                />
              </InputContainer>
            </Container2>
            <Container2>
              <LabelContainer>
                <Title>State</Title>
              </LabelContainer>
              <InputContainer>
                <InputField
                  type="text"
                  placeholder="Enter State"
                  value={state}
                  onChange={(e) => setstate(e.target.value)}
                  required
                />
              </InputContainer>
            </Container2>
            <Container2>
              <LabelContainer>
                <Title>Zip</Title>
              </LabelContainer>
              <InputContainer>
                <InputField
                  type="text"
                  placeholder="Enter Zip"
                  value={zip}
                  onChange={(e) => setzip(e.target.value)}
                  required
                />
              </InputContainer>
            </Container2>

            <Container2>
              <LabelContainer>
                <Title>Phone</Title>
              </LabelContainer>
              <InputContainer>
                <InputField
                  type="text"
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  required
                />
              </InputContainer>
            </Container2>
            <Container2>
              <LabelContainer>
                <Title>Email</Title>
              </LabelContainer>
              <InputContainer>
                <InputField
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </InputContainer>
            </Container2>
          </Section>
          <Section>
            <SectionTitle>BILL TO:</SectionTitle>
            <Container2>
              <LabelContainer>
                <Title>Name</Title>
              </LabelContainer>
              <InputContainer>
                <InputField
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </InputContainer>
            </Container2>
            <Container2>
              <LabelContainer>
                <Title>Company Name</Title>
              </LabelContainer>
              <InputContainer>
                <InputField
                  type="text"
                  placeholder="Enter Company Name"
                  value={companyname}
                  onChange={(e) => setcompanyName(e.target.value)}
                  required
                />
              </InputContainer>
            </Container2>
            <Container2>
              <LabelContainer>
                <Title>Street Address</Title>
              </LabelContainer>
              <InputContainer>
                <InputField
                  type="text"
                  placeholder="Enter Street Address"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  required
                />
              </InputContainer>
            </Container2>
            <Container2>
              <LabelContainer>
                <Title>City</Title>
              </LabelContainer>
              <InputContainer>
                <InputField
                  type="text"
                  placeholder="Enter City"
                  value={city2}
                  onChange={(e) => setcity2(e.target.value)}
                  required
                />
              </InputContainer>
            </Container2>
            <Container2>
              <LabelContainer>
                <Title>State</Title>
              </LabelContainer>
              <InputContainer>
                <InputField
                  type="text"
                  placeholder="Enter State"
                  value={state2}
                  onChange={(e) => setstate2(e.target.value)}
                  required
                />
              </InputContainer>
            </Container2>
            <Container2>
              <LabelContainer>
                <Title>Zip</Title>
              </LabelContainer>
              <InputContainer>
                <InputField
                  type="text"
                  placeholder="Enter Zip"
                  value={zip2}
                  onChange={(e) => setzip2(e.target.value)}
                  required
                />
              </InputContainer>
            </Container2>

            <Container2>
              <LabelContainer>
                <Title>Phone</Title>
              </LabelContainer>
              <InputContainer>
                <InputField
                  type="text"
                  placeholder="Enter Phone Number"
                  value={phone2}
                  onChange={(e) => setphone2(e.target.value)}
                  required
                />
              </InputContainer>
            </Container2>
          </Section>
        </SectionContainer>
      </Container>
      </Wrapper>

      <Wrapper>
        <Container>
      <ItemContainer>
        <SectionTitle>Item Details</SectionTitle>
        {items.map((item, index) => (
          <ItemRow key={index}>
            <ItemInput
              type="text"
              placeholder="Item"
              value={item.item}
              onChange={(e) => handleItemChange(index, 'item', e.target.value)}
              required
            />
            <ItemInput
              type="text"
              placeholder="Description"
              value={item.description}
              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              required
            />
            <ItemInput
              type="number"
              placeholder="Amount"
              value={item.amount}
              onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
              required
            />
            <ItemInput
              type="number"
              placeholder="Cost"
              value={item.cost}
              onChange={(e) => handleItemChange(index, 'cost', e.target.value)}
              required
            />
            <DeleteButton onClick={() => handleDeleteItem(index)}>Delete</DeleteButton>
          </ItemRow>
        ))}
        <div ref={itemsEndRef} />
        <AddItemButton onClick={handleAddItem}>Add Item</AddItemButton>
      </ItemContainer>
      </Container>
      </Wrapper>
      <Wrapper>
        <Container>
          <SectionTitle>Invoice Preview</SectionTitle>
          <div ref={invoiceRef}>
          <InvoicePreview
            billedFrom={{
              sender,
              slogan,
              address,
              city,
              state,
              zip,
              phone,
              email,
            }}
            billTo={{
              name,
              companyName: companyname,
              address: address2,
              city: city2,
              state: state2,
              zip: zip2,
              phone: phone2,
            }}
            items={items}
            onInvoiceNumberGenerated={handleInvoiceNumberGenerated}
          />
          </div>
          <DownloadButton onClick={handleDownload}>Download Invoice</DownloadButton>
          <DownloadButton onClick={handleConfirm}>Confirm and Save Invoice</DownloadButton>
        </Container>
      </Wrapper>
    </PageWrapper>
  );
};

export default Adddetails;
