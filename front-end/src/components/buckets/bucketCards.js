import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactPlaceholder from "react-placeholder";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import logoPlaceholder from "../../assets/logo-placeholder.png";
import CardGroup from "react-bootstrap/CardGroup";
import { useState } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import {
  createBucket,
  deactivateBucket,
  setActiveBucket,
} from "../../utils/bucketUtils";

import { NotificationManager } from "react-notifications";

export const InactiveBucketsRow = (props) => {
  const {
    buckets = [],
    setActiveBucket,
    deleteBucket,
    loading = false,
    activeBucket,
  } = props;

  return (
    <CardGroup>
      {buckets.map((thisBucket, idx) => {
        return (
          <Col xs={6} md={4} key={`${thisBucket.name}-${idx}`}>
            <InactiveBucketsCard
              key={`${thisBucket.name}-${idx}`}
              bucket={thisBucket}
              deleteBucket={deleteBucket}
              setActiveBucket={setActiveBucket}
              loading={loading}
              activeBucket={activeBucket}
            />
          </Col>
        );
      })}
    </CardGroup>
  );
};

export const InactiveBucketsCard = (props) => {
  const {
    bucket = {},
    setActiveBucket: setActiveBucketFE,
    deleteBucket,
    loading,
    activeBucket,
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActiveLoading, setActiveIsLoading] = useState(false);

  const isActive = bucket.uid || false;
  const bucketName = bucket.name || "Unused Bucket";
  const description = bucket.description || "";
  const logo = bucket.image_url || undefined;

  const createDate = bucket.create_date;

  const isCurrentlyActive = bucket.uid === activeBucket.uid;

  const since = createDate
    ? new Date(createDate).getFullYear()
    : new Date().getFullYear();

  const setActive = () => {
    setActiveIsLoading(true);
    setActiveBucket(bucket.uid)
      .then((resp) => {
        setActiveBucketFE(resp);
      })
      .catch(() => {
        NotificationManager.error(
          `Failed set ${bucketName} as active, please try again!`
        );
      })
      .finally(() => setActiveIsLoading(false));
  };

  const ready = !loading;
  const shouldDisable = !isActive || loading || isCurrentlyActive;

  const DeleteModal = (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confim Deletion
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please confirm deletion of {bucketName}.</p>
        <p>
          This action cannot be reversed. If you change your mind after
          performing this action, Please reach out to support.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          disabled={isLoading}
          onClick={() => setShowModal(false)}
        >
          Close
        </Button>
        <Button
          disabled={isLoading}
          variant="danger"
          onClick={() => {
            setIsLoading(true);
            deactivateBucket(bucket.uid)
              .then((resp) => resp.json())

              .then(() => {
                deleteBucket(bucket.uid, bucketName);
                setShowModal(false);
              })
              .catch(() => {
                NotificationManager.error(
                  `Failed deactivate ${bucketName}, please try again!`
                );
              })
              .finally(() => setIsLoading(false));
          }}
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" variant="light" />
          ) : null}
          Delete Bucket
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <Card>
      {!shouldDisable ? (
        <div className="bucket-delete">
          <CloseButton onClick={() => setShowModal(true)} />
        </div>
      ) : null}
      {DeleteModal}
      <ReactPlaceholder
        type="rect"
        style={{ width: 340, height: 340 }}
        ready={ready}
      >
        {logo ? (
          <Card.Img variant="top" src={logo} className={"bucket-card"} />
        ) : (
          <Card.Img
            variant="top"
            src={logoPlaceholder}
            className={"bucket-card"}
          />
        )}
      </ReactPlaceholder>
      <Card.Body>
        <Card.Title>
          <ReactPlaceholder rows={1} ready={ready}>
            {bucketName}
          </ReactPlaceholder>
        </Card.Title>
        <ReactPlaceholder rows={3} ready={ready} className={"nl"}>
          {description}
        </ReactPlaceholder>
        <div className={"d-flex justify-content-start mt-3"}>
          {isActiveLoading ? (
            <Spinner animation="border" size="sm" variant="light" />
          ) : null}
          <Button
            disabled={shouldDisable || isActiveLoading}
            variant="danger"
            onClick={setActive}
          >
            {!shouldDisable ? "Set As Primary" : "Currently Primary"}
          </Button>
        </div>
      </Card.Body>
      <Card.Footer className={"d-flex justify-content-end"}>
        <small className="text-muted">{`Operating Since ${since}`}</small>
      </Card.Footer>
    </Card>
  );
};

export const ActiveBucketCard = (props) => {
  const { activeBucket = {}, loading = false } = props;
  const bucketName = activeBucket.name || "Missing Bucket Name";
  const description = activeBucket.description || "";
  const createDate = activeBucket.create_date;
  const logo = activeBucket?.image_url;
  const ready = !loading;

  const since = createDate
    ? new Date(createDate).getFullYear()
    : new Date().getFullYear();

  return (
    <Col xs={12} md={8}>
      <Card>
        <Card.Body>
          <Row>
            <Col xs={4} className={"d-flex justify-content-center"}>
              <ReactPlaceholder
                type="rect"
                style={{ width: 175, height: 175 }}
                ready={ready}
              >
                <img
                  className={"bucket_placeholder_logo"}
                  src={logo ? logo : logoPlaceholder}
                  alt="logo"
                />
              </ReactPlaceholder>
            </Col>
            <Col xs={8}>
              <Card.Title>
                <ReactPlaceholder rows={1} ready={ready}>
                  {bucketName}
                </ReactPlaceholder>
              </Card.Title>
              <ReactPlaceholder rows={3} ready={ready} className={"nl"}>
                {description}
              </ReactPlaceholder>
            </Col>
          </Row>
        </Card.Body>

        <Card.Footer className={"d-flex justify-content-between"}>
          <small>Primary Upload Destination</small>
          <small className="text-muted">{`Operating Since ${since}`}</small>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export const CreateBucketModal = (props) => {
  const { createLocalBucket, showModal = false, hideModal } = props;

  const [picture, setPicture] = useState(null);
  const [, setImgData] = useState(null);
  const [fileName, setFileName] = useState("Select Logo");

  const [name, setName] = useState("");
  const [misc, setMisc] = useState("");
  const [since, setSince] = useState(new Date().toISOString().slice(0, 10));
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const createBucketFE = () => {
    if (!misc || !since) {
      NotificationManager.error(
        `Description and creation date are required, please try again!`
      );
      return;
    }

    setIsCreateLoading(true);
    createBucket(name, misc, since, picture)
      .then((res) => {
        createLocalBucket(res);
        hideModal();
      })
      .catch(() => {
        NotificationManager.error(`Failed create ${name}, please try again!`);
      })
      .finally(() => {
        setIsCreateLoading(false);
      });
  };

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={isCreateLoading ? undefined : hideModal}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Bucket
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Bucket Logo</Form.Label>
            <Form.File
              type="file"
              id="receipt-input"
              label={fileName}
              onChange={(e) => onChangePicture(e)}
              custom
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="bucketForm.BucketName">
            <Form.Label>Bucket Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="bucketForm.BucketAddress">
            <Form.Label>Description or Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={misc}
              onChange={(e) => setMisc(e.target.value)}
              placeholder="123 bucket Way
              Toronto, Ontario
              Canada"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="bucketForm.BucketSince">
            <Form.Label>Since</Form.Label> <br />
            <input
              type="date"
              id="start"
              name="bucket-start"
              value={since}
              onChange={(e) => setSince(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={isCreateLoading}
          variant="secondary"
          onClick={props.hideModal}
        >
          Close
        </Button>
        <Button
          disabled={isCreateLoading}
          variant="danger"
          onClick={createBucketFE}
        >
          {isCreateLoading ? (
            <Spinner animation="border" size="sm" variant="light" />
          ) : null}
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
