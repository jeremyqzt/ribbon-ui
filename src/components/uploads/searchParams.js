import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { postReceipt } from "../../utils/receiptUtils";
import { NotificationManager } from "react-notifications";
import { searchParams } from "../../constants/constants";
import { useRef } from "react";

export const SearchParams = ({
  onChangeSearch,
  onChangeSearchTerm,
  activeBucketResponse,
  loading,
  onCreateReceipt,
}) => {
  const searchRef = useRef();
  const changeSelection = (e) => {
    onChangeSearch(e.target.value);
  };

  const searchTerm = (e) => {
    onChangeSearchTerm(e.target.value);
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={12}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                searchRef.current.blur();
              }}
            >
              <Form.Group className="mt-5 mb-3" controlId="searchParam">
                <Row style={{ disply: "flex", justifyContent: "right" }}>
                  <Col xs={3}>
                    <Form.Label>Search Receipts</Form.Label>
                    <Form.Control
                      ref={searchRef}
                      type="input"
                      disabled={loading}
                      placeholder="Search..."
                      onBlur={(e) => {
                        searchTerm(e);
                      }}
                    />
                  </Col>
                  <Col xs={3}>
                    <Form.Label>Sort Receipts</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue="Select..."
                      onChange={changeSelection}
                      disabled={loading}
                    >
                      {searchParams.map((param) => {
                        return (
                          <option
                            value={param.value}
                            key={`param-${param.value}`}
                          >{`${param.name}`}</option>
                        );
                      })}
                    </Form.Control>
                  </Col>
                  <Col
                    xs={3}
                    style={{ display: "flex", flexDirection: "column-reverse" }}
                  >
                    <Button
                      variant="danger"
                      style={{ height: 38 }}
                      disabled={!activeBucketResponse}
                      onClick={() => {
                        const postData = {
                          bucket: activeBucketResponse.id,
                          description: "Quick Entry",
                          vendor: "Edit Me!",
                          subtotal: 0,
                          total: 0,
                          category: 1,
                          setFields: JSON.stringify({}),
                          JSONcrop: JSON.stringify({}),
                        };

                        postReceipt(postData)
                          .then((res) => {
                            onCreateReceipt(res?.receipt);

                            NotificationManager.success("Quick Entry Created!");
                          })
                          .catch(() => {
                            NotificationManager.error(
                              "Sorry, We couldn't create that entry. Please try again!"
                            );
                          })
                          .finally(() => {});
                      }}
                    >
                      Create Quick Entry
                    </Button>
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
