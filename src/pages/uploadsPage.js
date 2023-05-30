import "../App.css";
import "react-image-crop/dist/ReactCrop.css";

import Header from "../components/header";
import { UploadsForm } from "../components/uploads/uploads";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-dropzone-uploader/dist/styles.css";

import { NotificationContainer } from "react-notifications";
import { Footer } from "../components/footer/footer";

export const ReceiptsPage = () => {
  return (
    <>
      <Header activeId={2} />
      <UploadsForm />
      <NotificationContainer />
      <Footer />
    </>
  );
};
