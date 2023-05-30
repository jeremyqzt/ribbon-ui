import { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import logoPlaceholder from "../assets/quick.png";
import Spinner from "react-bootstrap/Spinner";
import { useFetch } from "../hooks/index";

import {
  deactivateReceipt,
  updateReceipts,
  getVendors,
} from "../utils/receiptUtils";
import { getLogoUrl } from "../utils/index";
import { NotificationManager } from "react-notifications";
import { BsInfoCircle } from "react-icons/bs";
import { categories } from "../constants/constants";
import { Pencil, CheckLg, Trash, StopCircle } from "react-bootstrap-icons";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";

const InputDropDown = (props) => {
  const { value, setValue, vendors, placeholder = "" } = props;
  return (
    <>
      <InputGroup style={{ width: "100%", margin: "auto" }}>
        <Form.Control
          aria-label="Text input with dropdown button"
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />

        <DropdownButton variant="outline-secondary" id="vendor-dropdown-1">
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

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    This field could not be read.
  </Tooltip>
);

const NotRead = (props) => {
  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 100, hide: 250 }}
      overlay={renderTooltip}
    >
      {props.children}
    </OverlayTrigger>
  );
};

export const ReceiptContainer = ({ receipts = [], deleteLocalReceipt }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [receiptDetailText, setReceiptDetailText] = useState("");
  const [pendingDel, setPendingDel] = useState();
  const setModalImageAndOpen = (img) => {
    setModalImg(img);
    setShowModal(true);
  };

  const setDetailsModalAndOpen = (text) => {
    setReceiptDetailText(text);
    setShowDetailsModal(true);
  };

  const deleteReceipt = (uid) => {
    setPendingDel(uid);
    setShowDeleteModal(true);
  };

  const { response: vendors = [] } = useFetch(getVendors);

  const DeleteModal = (
    <Modal
      show={showDeleteModal}
      onHide={() => {
        setShowDeleteModal(false);
        setPendingDel(-1);
      }}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confim Deletion
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={"receipt_modal"}>
        <p>Please confirm deletion of this entry.</p>
        <p>
          This action cannot be reversed. If you change your mind after
          performing this action, Please reach out to support.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setShowDeleteModal(false);
            setPendingDel(-1);
          }}
        >
          Close
        </Button>
        <Button
          variant="danger"
          disabled={false}
          onClick={() => {
            setShowDeleteModal(false);
            deactivateReceipt(pendingDel)
              .then(() => {
                NotificationManager.success("Receipt Successfully Deleted!");
                deleteLocalReceipt(pendingDel);
              })
              .catch((e) => {
                NotificationManager.error("Receipt Could Not Be Deleted");
              });
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const ViewModal = (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          View Receipt
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={"receipt_modal"}>
        <img
          className={"receipt_modal_img"}
          src={modalImg}
          alt={"Opps, Loading Failed!"}
        ></img>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          disabled={false}
          onClick={() => {
            setShowModal(false);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const ViewDetailsModal = (
    <Modal
      show={showDetailsModal}
      onHide={() => setShowDetailsModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Receipt Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={"receipt_modal"}>
        {receiptDetailText.length > 0 ? (
          <pre className={"receipt_modal_text"}>{receiptDetailText}</pre>
        ) : (
          <p className={"receipt_modal_text"}>
            {"🤒 Sorry, we couldn't load the text, please try again later!"}
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          disabled={false}
          onClick={() => {
            setShowDetailsModal(false);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      <Container
        fluid
        style={{
          paddingRight: 75,
          paddingLeft: 75,
          overflowX: "scroll",
        }}
      >
        {ViewModal}
        {ViewDetailsModal}
        {DeleteModal}
        <Table
          striped
          bordered
          hover
          className={"receipt_table table-responsive"}
        >
          <colgroup>
            <col span={"1"} style={{ width: "14%" }} />
            <col span={"1"} style={{ width: "11%" }} />
            <col span={"1"} style={{ width: "11%" }} />
            <col span={"1"} style={{ width: "11%" }} />
            <col span={"1"} style={{ width: "11%" }} />
            <col span={"1"} style={{ width: "17%" }} />
            <col span={"1"} style={{ width: "14%" }} />
            <col span={"1"} style={{ width: "11%" }} />
          </colgroup>
          <thead>
            <ReceiptHeaders />
          </thead>
          <tbody>
            {(receipts || []).map((item, idx) => {
              return (
                <ReceiptRow
                  key={`receipt-${idx}`}
                  vendors={vendors}
                  deleteReceipt={deleteReceipt}
                  lineInfo={item}
                  pendingDel={pendingDel}
                  setModalImageAndOpen={setModalImageAndOpen}
                  setDetailsModalAndOpen={setDetailsModalAndOpen}
                />
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

const ReceiptHeaders = () => {
  return (
    <>
      <tr>
        <th style={{ width: "15%" }}>Thumbnail</th>
        <th style={{ width: "14%" }}>Receipt Date</th>
        <th style={{ width: "14%" }}>Amount</th>
        <th style={{ width: "14%" }}>Vendor</th>
        <th style={{ width: "14%" }}>Category</th>
        <th style={{ width: "15%" }}>Description</th>
        <th style={{ width: "14%" }}>Edit</th>
      </tr>
    </>
  );
};

const ReceiptRow = ({
  lineInfo,
  setModalImageAndOpen,
  // setDetailsModalAndOpen,
  deleteReceipt,
  pendingDel,
  vendors,
}) => {
  const [edit, setEdit] = useState(false);
  const [totalAmount, setTotalAmount] = useState();
  const [vendor, setVendor] = useState();
  const [localUploadDate, setUploadDate] = useState();
  const [localDescrip, setLocalDescrip] = useState();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(false);
  const hiddenFileInput = useRef(null);

  const [categorySelection, setCategorySelection] = useState(
    lineInfo.category || 0
  );

  const setCategory = (e) => {
    setCategorySelection(e.target.value);
  };

  const amountComp =
    lineInfo.total_amount ||
    totalAmount ||
    typeof lineInfo.total_amount === "number" ? (
      `$${totalAmount ?? lineInfo.total_amount}`
    ) : (
      <NotRead>
        <div style={{ textDecoration: "underline" }}>
          <BsInfoCircle /> {"Not Available"}
        </div>
      </NotRead>
    );

  const vendorComp =
    lineInfo.vendor || vendor ? (
      vendor || lineInfo.vendor
    ) : (
      <NotRead>
        <div style={{ textDecoration: "underline" }}>
          {" "}
          <BsInfoCircle /> {"Not Available"}
        </div>
      </NotRead>
    );

  const dateComp = (
    <div className={"receipt_table_row__item"}>
      {localUploadDate || lineInfo.receipt_date || "Not Available"}
    </div>
  );

  const realCategory = categorySelection || lineInfo.category;

  const categoryComp = realCategory ? (
    categories.find((each) => `${realCategory}` === `${each.value}`)?.name
  ) : (
    <NotRead>
      <div style={{ textDecoration: "underline" }}>
        {" "}
        <BsInfoCircle /> {"Not Available"}
      </div>
    </NotRead>
  );

  const realDescrip = localDescrip || lineInfo.description;

  const descriptionComp = realDescrip ? (
    realDescrip
  ) : (
    <div>{"No Description"}</div>
  );

  const handleClick = (event) => {
    if (hiddenFileInput?.current) {
      hiddenFileInput.current.click();
    }
  };
  return (
    <tr
      className={`receipt_table_row ${
        pendingDel === lineInfo.pk ? "receipt_table_delete_row" : ""
      }`}
    >
      <td>
        {edit ? (
          <>
            <img
              alt={"wtf"}
              className="receipt_preview_small"
              src={
                lineInfo.thumbnail
                  ? getLogoUrl(lineInfo.thumbnail)
                  : logoPlaceholder
              }
              onClick={
                lineInfo.image_url
                  ? () => {
                      setModalImageAndOpen(getLogoUrl(lineInfo.image_url));
                    }
                  : () => {}
              }
            />
            <input
              type="file"
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
            <Button
              variant="link"
              onClick={() => {
                handleClick();
              }}
            >
              Update Image
            </Button>
          </>
        ) : (
          <img
            className="receipt_preview"
            alt={"Opps, Loading Failed!"}
            src={
              lineInfo.thumbnail
                ? getLogoUrl(lineInfo.thumbnail)
                : logoPlaceholder
            }
            onClick={
              lineInfo.image_url
                ? () => {
                    setModalImageAndOpen(getLogoUrl(lineInfo.image_url));
                  }
                : () => {}
            }
          />
        )}
      </td>
      <td>
        {edit ? (
          <Form.Control
            style={{ width: "100%", margin: "auto" }}
            type="date"
            placeholder={lineInfo.upload_date}
            value={localUploadDate}
            onChange={(e) => setUploadDate(e.target.value)}
          />
        ) : (
          dateComp
        )}
      </td>
      <td>
        {edit ? (
          <Form.Control
            style={{ width: "100%", margin: "auto" }}
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            placeholder={`$${totalAmount || lineInfo.total_amount || 0}`}
          />
        ) : (
          amountComp
        )}
      </td>
      <td>
        {edit ? (
          <InputDropDown
            vendors={vendors}
            placeholder={`${vendor || lineInfo.vendor || "Vendor"}`}
            value={vendor ?? ""}
            setValue={(e) => setVendor(e)}
          />
        ) : (
          vendorComp
        )}
      </td>

      <td>
        {edit ? (
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
        ) : (
          <div style={{ width: "100%", margin: "auto" }}>{categoryComp}</div>
        )}
      </td>
      <td style={{ width: 105 }}>
        {edit ? (
          <Form.Control
            style={{
              width: "100%",
              margin: "auto",
              overflowY: "scroll",
              height: 80,
            }}
            as="textarea"
            rows={2}
            value={localDescrip}
            onChange={(e) => setLocalDescrip(e.target.value)}
            placeholder={`${
              localDescrip || lineInfo.description || "Description"
            }`}
          />
        ) : (
          <div style={{ overflowY: "auto", height: 80 }}>{descriptionComp}</div>
        )}
      </td>
      <td style={{ width: 105 }}>
        <div style={{ width: 105 }}>
          <Button
            variant="danger"
            style={{ marginRight: 10 }}
            disabled={loading}
            loading={loading}
            onClick={() => {
              const postData = {
                update_data: {
                  category: categorySelection,
                  vendor,
                  total_amount: totalAmount,
                  receipt_date_datetime: localUploadDate,
                  receipt_date: localUploadDate,
                  description: localDescrip,
                },
                uid: lineInfo.pk,
              };
              if (edit) {
                setLoading(true);
                updateReceipts(postData)
                  .then(() => {
                    NotificationManager.success(
                      "Receipt Successfully Updated!"
                    );
                  })
                  .finally(() => setLoading(false));
              }

              setEdit(!edit);
            }}
          >
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : edit ? (
              <CheckLg />
            ) : (
              <Pencil />
            )}
          </Button>
          <Button
            style={{ marginRight: 10 }}
            variant="secondary"
            disabled={loading}
            loading={loading}
            onClick={() => {
              if (edit) {
                setEdit(false);
              } else {
                deleteReceipt(lineInfo.pk);
              }
            }}
          >
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : edit ? (
              <StopCircle />
            ) : (
              <Trash />
            )}
          </Button>
        </div>
      </td>
    </tr>
  );
};
