import Header from "../components/header";
import { SettingsForm } from "../components/settings/settings";

import "../style/profile.css";

import Container from "react-bootstrap/Container";
import { NotificationContainer } from "react-notifications";
import {Footer} from '../components/footer/footer';

export const SettingsPage = () => {
  return (
    <>
      <Header activeId={3} />
      <NotificationContainer />
      <Container className={"receipt_container"}>
        <SettingsForm />
      </Container>
      <Footer />
    </>
  );
};
