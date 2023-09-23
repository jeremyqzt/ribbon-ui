import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { NotificationManager } from "react-notifications";

import {
  getActiveBucket,
  listBuckets,
  setActiveBucket,
} from "../../utils/bucketUtils";

import { addVendors, getVendors, deleteVendor } from "../../utils/receiptUtils";
import { deleteAccount } from "../../utils/index";
import { getSettings } from "../../utils/settingUtils";
import { useFetch } from "../../hooks/index";
import { Pencil, CheckLg, Trash, PlusCircle } from "react-bootstrap-icons";

import { saveSettings } from "../../utils/settingUtils";
import { checkCookie } from "../../utils/index";
import ServerError from "../error/serverError";
import LoadingLogo from "../loading/loading";
import Badge from "react-bootstrap/Badge";

import {
  CHANGE_PASSWORD,
  CHANGE_CONTACT_EMAIL,
  CHANGE_CONTACT_PHONE,
  CHANGE_CONTACT_ADDRESS,
} from "../../constants/constants";

export const SettingsForm = () => {
  const {
    response: activeBucketResponse = [],
    error: activeBucketError = null,
    loading: activeBucketLoading = false,
    retryCall: retryActiveBuckets,
  } = useFetch(getActiveBucket);

  const {
    response: listBucketResponse = [],
    error: listBucketError,
    loading: listBucketLoading,
    retryCall: retryBuckets,
  } = useFetch(listBuckets);

  const {
    response: settingsResp = [],
    error: settingsErr,
    loading: settingsLoading,
    retryCall: retrySettings,
  } = useFetch(getSettings);

  const {
    response: vendors = [],
    error: vendorsErr,
    loading: vendorsLoading,
  } = useFetch(getVendors);

  const {
    contact_email = "",
    text_address = "",
    text_phone = "",
  } = settingsResp ?? {};

  const [loading, setLoading] = useState(false);

  const isBucketsLoading =
    listBucketLoading ||
    activeBucketLoading ||
    settingsLoading ||
    loading ||
    vendorsLoading;
  const hasBucketsErrored =
    activeBucketError || listBucketError || settingsErr || vendorsErr;

  const activeBucket = activeBucketResponse?.uid ?? null;
  const hasError =
    hasBucketsErrored || (activeBucket === null && !isBucketsLoading);

  const [vendorActionLoading, setVendorActionLoading] = useState(false);

  const [enabled, setEnabled] = useState({});
  const [username, setUsername] = useState("");
  const [vendor, setVendor] = useState("");
  const [commonVendors, setCommonVendors] = useState([]);

  const [confirmDelete, setConfirmDelete] = useState();

  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [bucketSelect, SetBucketSelect] = useState(-1);
  const [actualBucket, setActualBucketSelect] = useState(bucketSelect);

  const [address, setAddress] = useState("");
  const [locallyDeletedVendors, setLocallyDeletedVendors] = useState([]);

  const [passwordConfirm, setPasswordConfirm] = useState("");

  const updateBucket = () => {
    setLoading(true);
    setActiveBucket(bucketSelect)
      .then(() => {
        setActualBucketSelect(bucketSelect);
        retryBuckets();
        retryActiveBuckets();
        NotificationManager.success(`Active bucket updated!`);
      })
      .catch(() => {
        NotificationManager.error(
          `Failed set active bucket, please try again!`
        );
      })
      .finally(() => setLoading(false));
    return;
  };

  const changeSettings = (action) => {
    if (action === CHANGE_PASSWORD) {
      if (password.length < 8) {
        NotificationManager.error(
          "Passwords must be 8 characters long, please try again!"
        );
        return;
      }

      if (password !== passwordConfirm) {
        NotificationManager.error("Passwords do not match, please try again!");
        return;
      }
    }

    saveSettings({ username, password, address, phone }, action)
      .then(() => {
        setUsername("");
        setPasswordConfirm("");
        setPassword("");
        setPhone("");
        setAddress("");
        setEnabled({});
        retrySettings();
        NotificationManager.success("Update completed successfully!");
      })
      .catch(() => {
        NotificationManager.error(
          "Failed to update provided info, please try again!"
        );
      });
  };
  const active = actualBucket >= 0 ? actualBucket : activeBucketResponse?.uid;
  if (isBucketsLoading) {
    return <LoadingLogo />;
  }

  if (hasError) {
    return <ServerError />;
  }

  const NoEditToopTip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This Field Cannot be Edited!
    </Tooltip>
  );

  const EditToopTip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click Me to Edit This Field!
    </Tooltip>
  );

  const Vendor = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Create Common Vendor (10 Maximum)
    </Tooltip>
  );

  const toRender = [...(vendors || []), ...(commonVendors || [])].filter(
    (item) => !locallyDeletedVendors.includes(item?.id)
  );
  return (
    <>
      <Container>
        <Row>
          <Col xs={6}>
            <h3 className="mt-4 mb-3">Account Settings</h3>
            <Form>
              <Form.Group className="mb-3" controlId="vendorGroup">
                <Form.Label>Login Email</Form.Label>
                <Row>
                  <Col xs={10}>
                    <Form.Control
                      type="text"
                      value={checkCookie("username")}
                      disabled={true}
                      placeholder={checkCookie("username")}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Col>
                  <Col xs={2}>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={NoEditToopTip}
                    >
                      <Button
                        variant="danger"
                        disabled={true}
                        onClick={() => {
                          enabled.username === false
                            ? changeSettings()
                            : setEnabled({ ...enabled, username: false });
                        }}
                      >
                        {enabled.username === false ? <CheckLg /> : <Pencil />}
                      </Button>
                    </OverlayTrigger>
                  </Col>
                </Row>{" "}
              </Form.Group>
              <Form.Group className="mb-3 mt-5" controlId="vendorGroup">
                <Form.Label>Password</Form.Label>
                <Row>
                  <Col xs={10}>
                    <Form.Control
                      type="password"
                      value={password}
                      placeholder={"********"}
                      disabled={enabled.password1 ?? true}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                  <Col xs={2}>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={EditToopTip}
                    >
                      <Button
                        variant="danger"
                        disabled={false}
                        onClick={() => {
                          enabled.password1 === false
                            ? changeSettings(CHANGE_PASSWORD)
                            : setEnabled({ ...enabled, password1: false });
                        }}
                      >
                        {enabled.password1 === false ? <CheckLg /> : <Pencil />}
                      </Button>
                    </OverlayTrigger>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3" controlId="vendorGroup">
                <Form.Label>Password Confirm</Form.Label>
                <Row>
                  <Col xs={10}>
                    <Form.Control
                      type="password"
                      value={passwordConfirm}
                      placeholder={"********"}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      disabled={enabled.password1 ?? true}
                    />
                  </Col>
                  <Col xs={2}></Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-5 mb-3" controlId="bucketGroup">
                <Form.Label>Main Bucket</Form.Label>
                <Row>
                  <Col xs={10}>
                    <Form.Control
                      as="select"
                      defaultValue="State..."
                      disabled={enabled.activeBucket ?? true}
                      value={bucketSelect}
                      onChange={(e) => {
                        SetBucketSelect(e.target.value);
                      }}
                    >
                      {[
                        ...(listBucketResponse || [])
                          .filter((item) => {
                            return item.uid === active;
                          })
                          .map((bucket) => {
                            return (
                              <option
                                value={bucket.uid}
                                key={`opt-${bucket.uid}`}
                              >{`${bucket.name} (Active)`}</option>
                            );
                          }),
                        ...(listBucketResponse || [])
                          .filter((item) => item.bid !== active)
                          .map((bucket) => {
                            return (
                              <option
                                value={bucket.uid}
                                key={`opt-${bucket.uid}`}
                              >{`${bucket.name}`}</option>
                            );
                          }),
                      ]}
                    </Form.Control>
                  </Col>
                  <Col xs={2}>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={EditToopTip}
                    >
                      <Button
                        variant="danger"
                        disabled={false}
                        onClick={() => {
                          enabled.activeBucket === false && bucketSelect >= 0
                            ? updateBucket()
                            : setEnabled({ ...enabled, activeBucket: false });
                        }}
                      >
                        {enabled.activeBucket === false ? (
                          <CheckLg />
                        ) : (
                          <Pencil />
                        )}
                      </Button>
                    </OverlayTrigger>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} className={"ml-1"}>
                    <sub>
                      Click <a href="/buckets"> here </a> to create new buckets!
                    </sub>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-5 mb-3" controlId="bucketGroup">
                <Form.Label>Common Vendors</Form.Label>
                <Row>
                  <Col xs={10}>
                    <Form.Control
                      type="input"
                      value={vendor}
                      placeholder={"Enter a Vendor"}
                      onChange={(e) => setVendor(e.target.value)}
                    />
                  </Col>
                  <Col xs={2}>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={Vendor}
                    >
                      <Button
                        variant="danger"
                        disabled={vendor.length <= 0 || vendorActionLoading}
                        loading={vendorActionLoading}
                        onClick={() => {
                          setVendorActionLoading(true);

                          addVendors(vendor)
                            .then((r) => {
                              NotificationManager.success(
                                `Common Vendor: ${vendor} successfully created!`
                              );
                              setCommonVendors([...commonVendors, r]);
                            })
                            .finally(() => {
                              setVendorActionLoading(false);
                            });
                        }}
                      >
                        <PlusCircle />
                      </Button>
                    </OverlayTrigger>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <div style={{ height: 12, width: "100%" }} />
                  </Col>
                  <Col xs={12}>
                    {toRender.map((item) => {
                      return (
                        <div
                          style={{
                            marginRight: 8,
                            display: "inline-block",
                            marginTop: 12,
                          }}
                        >
                          <Badge pill variant="danger">
                            <span
                              style={{
                                marginRight: 8,
                                paddingLeft: 12,
                                paddingRight: 4,
                                marginTop: 80,
                              }}
                            >
                              {item?.name}{" "}
                              <Button
                                size={"sm"}
                                variant={"danger"}
                                loading={vendorActionLoading}
                                disabled={vendorActionLoading}
                                onClick={() => {
                                  setVendorActionLoading(true);
                                  deleteVendor(item?.id)
                                    .then((r) => {
                                      NotificationManager.success(
                                        "Vendor successfully deleted!"
                                      );
                                      setLocallyDeletedVendors(() => [
                                        item.id,
                                        ...locallyDeletedVendors,
                                      ]);
                                    })
                                    .catch((e) => {
                                      NotificationManager.error(
                                        "Failed to delete vendor, please try again later."
                                      );
                                    })
                                    .finally(() => {
                                      setVendorActionLoading(false);
                                    });
                                }}
                              >
                                <Trash />
                              </Button>
                            </span>
                          </Badge>
                        </div>
                      );
                    })}
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-5 mb-3" controlId="bucketGroup">
                <Form.Label>Delete Account</Form.Label>
                <Row>
                  <Col xs={10}>
                    <Form.Control
                      as="input"
                      placeholder="Enter Delete Account to Continue..."
                      value={confirmDelete}
                      onChange={(e) => {
                        setConfirmDelete(e.target.value);
                      }}
                    ></Form.Control>
                  </Col>
                  <Col xs={2}>
                    <Button
                      variant="danger"
                      disabled={
                        (confirmDelete ?? "").toLowerCase() !== "delete account"
                      }
                      onClick={() => {
                        deleteAccount();
                      }}
                    >
                      <Trash />
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} className={"ml-1"}>
                    <sub>
                      This action cascades to all user data, it is irreversible!
                    </sub>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-5 mb-3" controlId="bucketGroup">
                <Form.Label>Multi Factor Authentication</Form.Label>
                <Row>
                  <Col xs={8}>
                    MFA Status: Not Setup
                  </Col>
                  <Col xs={4}>
                    <Button
                      variant="danger"
                      onClick={() => {
                        window.location.href = "/mfa";
                      }}
                    >
                      Setup MFA Now!
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Col>
          <Col xs={6}>
            <h3 className="mt-4 mb-3">Contact Settings</h3>
            <Form>
              <Form.Group className="mb-3" controlId="vendorGroup">
                <Form.Label>Contact E-mail</Form.Label>
                <Row>
                  <Col xs={10}>
                    <Form.Control
                      type="text"
                      value={username}
                      disabled={enabled.email ?? true}
                      placeholder={contact_email ?? ""}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Col>
                  <Col xs={2}>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={EditToopTip}
                    >
                      <Button
                        variant="danger"
                        disabled={false}
                        onClick={() => {
                          enabled.email === false
                            ? changeSettings(CHANGE_CONTACT_EMAIL)
                            : setEnabled({ ...enabled, email: false });
                        }}
                      >
                        {enabled.email === false ? <CheckLg /> : <Pencil />}
                      </Button>
                    </OverlayTrigger>
                  </Col>
                </Row>{" "}
              </Form.Group>
              <Form.Group className="mt-5 mb-3" controlId="phone">
                <Form.Label>Contact Phone</Form.Label>
                <Row>
                  <Col xs={10}>
                    <Form.Control
                      type="text"
                      value={phone}
                      disabled={enabled.phone ?? true}
                      placeholder={text_phone ?? ""}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Col>
                  <Col xs={2}>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={EditToopTip}
                    >
                      <Button
                        variant="danger"
                        disabled={false}
                        onClick={() => {
                          enabled.phone === false
                            ? changeSettings(CHANGE_CONTACT_PHONE)
                            : setEnabled({ ...enabled, phone: false });
                        }}
                      >
                        {enabled.phone === false ? <CheckLg /> : <Pencil />}
                      </Button>
                    </OverlayTrigger>
                  </Col>
                </Row>{" "}
              </Form.Group>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Contact Address</Form.Label>
                <Row>
                  <Col xs={10}>
                    <Form.Control
                      rows={4}
                      as="textarea"
                      value={address}
                      disabled={enabled.address ?? true}
                      placeholder={text_address ?? ""}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Col>
                  <Col xs={2}>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={EditToopTip}
                    >
                      <Button
                        variant="danger"
                        disabled={false}
                        onClick={() => {
                          enabled.address === false
                            ? changeSettings(CHANGE_CONTACT_ADDRESS)
                            : setEnabled({ ...enabled, address: false });
                        }}
                      >
                        {enabled.address === false ? <CheckLg /> : <Pencil />}
                      </Button>
                    </OverlayTrigger>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
