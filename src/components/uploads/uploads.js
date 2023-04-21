import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import logo from "../../assets/logo.png";
import "../../style/uploads.css";
import ReactCrop from "react-image-crop";
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { postReceipt } from "../../utils/receiptUtils";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import InputGroup from "react-bootstrap/InputGroup";

import { NotificationManager } from "react-notifications";

import { getActiveBucket } from "../../utils/bucketUtils";
import { getVendors } from "../../utils/receiptUtils";
import { useFetch } from "../../hooks/index";
import ServerError from "../error/serverError";
import LoadingLogo from "../loading/loading";

import {
  SET_FIELDS_VENDOR,
  SET_FIELDS_TOTAL,
  SET_FIELDS_DATE,
  SET_FIELDS_DESCRIPTION,
  categories,
} from "../../constants/constants";

const rotateImage = (src, rotation, cb) => {
  const rotationIn90 = (rotation / 2) * Math.PI;
  console.log(rotationIn90);
  var img = new Image();
  img.src = src;
  img.onload = function () {
    var canvas = document.createElement("canvas");
    canvas.width = img.height;
    canvas.height = img.width;
    canvas.style.position = "absolute";
    var ctx = canvas.getContext("2d");
    ctx.translate(img.height, img.width / img.height);
    ctx.rotate(rotationIn90);
    ctx.drawImage(img, 0, 0);
    cb(canvas.toDataURL("image/jpeg", 1));
  };
};

const InputDropDown = (props) => {
  const { value, setValue, vendors } = props;
  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          aria-label="Text input with dropdown button"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />

        <DropdownButton
          variant="outline-secondary"
          title="Common Vendors"
          id="input-group-dropdown-1"
        >
          {vendors.map((v) => {
            return (
              <Dropdown.Item
                onClick={() => {
                  setValue(v.name);
                }}
              >
                {v.name}
              </Dropdown.Item>
            );
          })}

          <Dropdown.Divider />
          <Dropdown.Item href="/settings">Create new entries</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
    </>
  );
};

export const UploadsForm = () => {
  const {
    response: activeBucketResponse = [],
    error: activeBucketError = null,
    loading: activeBucketLoading = false,
  } = useFetch(getActiveBucket);

  const { response: vendors = [] } = useFetch(getVendors);

  const activeBucket = activeBucketResponse?.uid ?? null;
  const hasError =
    activeBucketError || (activeBucket === null && !activeBucketLoading);

  const [cropFactor, setCropFactor] = useState({ scaleX: 1, scaleY: 1 });

  const [rotation, setRotation] = useState(0);
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(logo);
  const [originalImage, setOriginalImage] = useState(null);

  const [fileName, setFileName] = useState("Select Receipt");
  const [crop, setCrop] = useState({ unit: "%", width: 100, height: 100 });
  const [resultImg, setResultImg] = useState(null);
  const [image, setImage] = useState(null);

  const [itemDate, setDate] = useState(new Date());
  const [itemTotal, setTotal] = useState(0);
  const [itemDescrip, setDescrip] = useState("");
  const [vendor, setVendor] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [dateChanged, setDateChanged] = useState(false);
  const [posting, setPosting] = useState(false);
  const [categorySelection, setCategorySelection] = useState(1);
  const clearForm = () => {
    NotificationManager.success("Receipt Successfully Uploaded!");
    //navigate("/upload?success=1");
  };
  const setCategory = (e) => {
    setCategorySelection(e.target.value);
  };
  const onSubmit = () => {
    const vendorDict =
      vendor !== null && vendor !== "" ? { [SET_FIELDS_VENDOR]: vendor } : {};
    const subTotalDict = {};
    const totalDict = itemTotal !== 0 ? { [SET_FIELDS_TOTAL]: itemTotal } : {};
    const dateDict = dateChanged ? { [SET_FIELDS_DATE]: itemDate } : {};
    const descripDict =
      itemDescrip !== null && itemDescrip !== ""
        ? { [SET_FIELDS_DESCRIPTION]: itemDescrip }
        : {};

    const setFieldsObj = {
      ...vendorDict,
      ...subTotalDict,
      ...totalDict,
      ...dateDict,
      ...descripDict,
    };

    const { scaleX, scaleY } = cropFactor;

    const realCrop = {
      ...crop,
      x: crop.x * scaleX,
      y: crop.y * scaleY,
      width: crop.width * scaleX,
      height: crop.height * scaleY,
      rotation: rotation % 4,
    };

    const postData = {
      image: picture,
      bucket: activeBucket,
      description: itemDescrip,
      vendor: vendor,
      subtotal: 0,
      total: itemTotal,
      category: categorySelection,
      setFields: JSON.stringify(setFieldsObj),
      JSONcrop: JSON.stringify(realCrop),
    };

    setPosting(true);
    postReceipt(postData)
      .then(() => {
        clearForm();
        setPosting(false);
      })
      .catch(() => {
        setPosting(false);
        NotificationManager.error(
          "Sorry, We couldn't upload that image. Please try again!"
        );
      });
  };

  const getCroppedImg = async () => {
    try {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      const base64Image = canvas.toDataURL("image/jpeg", 1);
      setCropFactor({ scaleX: scaleX, scaleY: scaleY });
      setResultImg(base64Image);
    } catch (e) {
      NotificationManager.error(
        "Sorry, We couldn't crop that image. Please try again!"
      );
    }
  };

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
        setResultImg(reader.result);
        setOriginalImage(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setCrop({});
    }
  };

  if (hasError) {
    return <ServerError />;
  }

  if (activeBucketLoading) {
    return <LoadingLogo />;
  }

  const EditModal = (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReactCrop
          className="receipt-image"
          src={imgData}
          crop={crop}
          onImageLoaded={setImage}
          onChange={(newCrop, _) => setCrop(newCrop)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          disabled={false}
          onClick={() => {
            setCrop({});
            setResultImg(originalImage);
            setImgData(originalImage);
            setShowModal(false);
            setRotation(0);
          }}
        >
          Reset Image
        </Button>
        <Button
          variant="danger"
          disabled={false}
          onClick={() => {
            rotateImage(imgData, 1, (r) => {
              setImgData(r);
              setCrop({});
              setResultImg(r);
              setRotation(rotation + 1);
            });
          }}
        >
          Rotate Image
        </Button>
        <Button
          variant="danger"
          disabled={false}
          onClick={() => {
            setShowModal(false);
            if (
              crop?.x === 0 &&
              crop?.y === 0 &&
              crop?.width === 0 &&
              crop?.height === 0
            ) {
              setCrop({});
              setResultImg(imgData);
              setShowModal(false);
              setCropFactor({ scaleX: 1, scaleY: 1 });
            } else {
              getCroppedImg();
            }
          }}
        >
          Crop Selection
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click on Me to Crop the Image!
    </Tooltip>
  );

  return (
    <>
      <Container>
        {EditModal}
        <Row>
          <Col xs={6}>
            <Form>
              <Form.Group className="mb-1 mt-5" controlId="fileGroup">
                <Form.Label>Select File</Form.Label>
                <Form.File
                  type="file"
                  id="receipt-input"
                  label={fileName}
                  onChange={(e) => onChangePicture(e)}
                  onClickCapture={() => {}}
                  accept=".png,.jpg,.pdf,.jpeg"
                  custom
                />
                <Form.Group className="mb-5 mt-3" controlId="imageGroup">
                  {picture ? (
                    <>
                      <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 100, hide: 300 }}
                        overlay={renderTooltip}
                      >
                        <img
                          src={resultImg}
                          className="receipt-image receipt-image-hover"
                          onClick={() => setShowModal(true)}
                          alt={"Opps, Loading Failed!"}
                        />
                      </OverlayTrigger>
                    </>
                  ) : (
                    <></>
                  )}
                </Form.Group>
              </Form.Group>
            </Form>
          </Col>
          <Col xs={6}>
            <Form>
              <Form.Group className="mb-3 mt-5" controlId="vendorGroup">
                <Form.Label>Receipt Vendor</Form.Label>
                <InputDropDown
                  vendors={vendors || []}
                  value={vendor ?? ""}
                  setValue={(e) => setVendor(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="totalGroup">
                <Form.Label>Total Amount ($)</Form.Label>
                <Form.Control
                  type="number"
                  min="0.00"
                  step="0.01"
                  value={itemTotal}
                  onChange={(e) => setTotal(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="dateGroup">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={itemDate}
                  placeholder={new Date()}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setDateChanged(true);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="descrGroup">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={itemDescrip}
                  placeholder={"Description"}
                  onChange={(e) => setDescrip(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="catGroup">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  style={{ width: "100%", margin: "auto" }}
                  value={categorySelection}
                  onChange={setCategory}
                >
                  {categories.map((param) => {
                    return (
                      <option
                        value={param.value}
                        key={`param-${param.value}`}
                      >{`${param.name}`}</option>
                    );
                  })}
                </Form.Control>
              </Form.Group>

              <Form.Text className="text-muted d-flex flex-row-reverse">
                <p>
                  Unfilled fields will be attempted to be automatically
                  populated.
                </p>
              </Form.Text>
              <Form.Group
                className="mb-3 mt-3 d-flex flex-row-reverse"
                controlId="submitGroup"
              >
                <Button
                  variant="danger"
                  disabled={
                    !Boolean(picture) ||
                    activeBucketLoading ||
                    hasError ||
                    posting
                  }
                  onClick={() => onSubmit()}
                >
                  {activeBucketLoading || posting ? (
                    <Spinner animation="border" size="sm" variant="light" />
                  ) : null}{" "}
                  {" Upload Image"}
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
