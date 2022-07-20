import {
  Container,
  Detail,
  DetailIcons,
  ContactLinkImage,
  DetailDescription,
  DetailTitle,
  LeftSection,
  RightSection,
  Span,
  Contact,
  ContactDetails,
  Title,
  TitleContact,
  MailIcon,
  ContactForm,
  LocationIcon,
  EmailInput,
  NameInput,
  ServiceInput,
  GetaQuote,
  Form,
  ScheduleP,
  TermsCheckbox,
  SubmitForm,
  CheckboxTitle,
  Checkbox,
  UpperSection,
  BottomSection,
  Dropdowns,
} from "./ContactUs.styled";

import "react-dropdown/style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import {send} from 'emailjs-com'
// import DropdownInput from 'react-dropdown-input'
const ContactUs = () => {
  const [sender_email, set_sender_email] = useState("");
  const [sender_name, set_sender_name] = useState("");
  const Newdate = new Date();
  const date = Newdate.getDate();
  const month = Newdate.getMonth();
  const CurrentMonth = month + 1;
  const year = Newdate.getFullYear();
  const hour = Newdate.getHours();
  const minute = Newdate.getMinutes();
  const [sender_service, set_sender_service] = useState("");
  const [senderDate, setSenderDate] = useState(
    date + "-" + CurrentMonth + "-" + year
  );
  const[check,setCheck]= useState(false)
  const [senderTime, setSenderTime] = useState(hour + ":" + minute);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");

  const sendMail = (e) => {
    e.preventDefault();
    send(
      "service_p2zntyf",
      "template_f4vbnzh",
      { sender_name, sender_email, sender_service, senderDate, senderTime },
      "HiwseFxtuDnSuFCo_"
    )
      .then((response) => {
        console.log("message sent succesfully", response.status, response.text);
      })
      .catch((err) => {
        console.log("Failed", err);
      });
    set_sender_name("");
    set_sender_email("");
    set_sender_service("");
    setSenderDate("");
    setSenderTime("");
    setService("");
    setEmail("");
    setName("");
    setCheck(false);
  };

  const SheetSubmit = (e) => {
    e.preventDefault();
    // console.log(name,email,message)
    const data = {
      Name: sender_name,
      Email: sender_email,
      Service: sender_service,
      Date: senderDate,
      Time: senderTime,
    };
    axios.post("https://sheet.best/api/sheets/69f079ba-8f87-4135-a184-a6709080c738", data).then((response) => {
      console.log(response);
      setName("");
      setEmail("");
      set_sender_name("");
      set_sender_email("");
      set_sender_service("");
      setService("");
      set_sender_service("");
      setSenderTime("");
      setSenderDate("");
      setCheck(false);
    });
  };
  const submit = (e) => {
    SheetSubmit(e);
    sendMail(e);
  };
  var Services = [
    "App Development",
    "Web Development",
    "UI/UX Desgin",
    "Web Hosting",
    "SEO ",
  ];
  const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'ember', text: 'Ember', value: 'ember' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
  { key: 'meteor', text: 'Meteor', value: 'meteor' },
  { key: 'node', text: 'NodeJS', value: 'node' },
  { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'rails', text: 'Rails', value: 'rails' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
  { key: 'ruby', text: 'Ruby', value: 'ruby' },
  { key: 'ui', text: 'UI Design', value: 'ui' },
  { key: 'ux', text: 'User Experience', value: 'ux' },
]
  const defaultOption = "Select Service";
  return (
    <>
      <Container>
        <UpperSection>
          <TitleContact>Lets Discus Your Project</TitleContact>
        </UpperSection>
        <BottomSection>
          <LeftSection>
            <ContactDetails>
              <Contact>
                <DetailIcons>
                  <MailIcon />
                </DetailIcons>
                <Detail>
                  <DetailTitle>Email</DetailTitle>
                  <DetailDescription>admin@intelpik.com</DetailDescription>
                </Detail>
              </Contact>
              <Contact>
                <DetailIcons>
                  <LocationIcon />
                </DetailIcons>
                <Detail>
                  <DetailTitle>Location</DetailTitle>
                  <DetailDescription>Kerala, India</DetailDescription>
                </Detail>
              </Contact>
            </ContactDetails>
          </LeftSection>
          <RightSection>
            <Form onSubmit={submit}>
              <GetaQuote>Get a quote</GetaQuote>
              <ScheduleP>Schedule an Appointment</ScheduleP>
              <ContactForm>
                Hey, my name is{" "}
                <NameInput
                  type="text"
                  value={sender_name}
                  placeholder="Type Here"
                  onChange={(e) => {
                    set_sender_name(e.target.value);
                    setName(e.target.value);
                  }}
                />
                and I'm looking for{" "}
                <Dropdowns type="text" value={sender_service} placeholder="Search Services" onChange={(e)=>{
                  set_sender_service(e.target.value);
                }}/>
              
                ; Ping me up at{" "}
                <EmailInput
                  type="email"
                  value={sender_email}
                  placeholder="Your Email Address"
                  onChange={(e) => {
                    set_sender_email(e.target.value);
                    setEmail(e.target.value);
                  }}
                />
                !
              </ContactForm>
              <TermsCheckbox>
                <Checkbox type="checkbox" required onchange={(e)=>{
                  setCheck(e.target.checked);
                }}/>
                <CheckboxTitle>
                  I have accepted all the terms and conditions
                </CheckboxTitle>
              </TermsCheckbox>
              <SubmitForm type="Submit">Send Enquiry</SubmitForm>
            </Form>
          </RightSection>
        </BottomSection>
      </Container>
    </>
  );
};

export default ContactUs;
