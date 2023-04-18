import Header from "../components/header";
import ServerError from "../components/error/serverError";

import "../style/receiptContainer.css";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import "../style/buckets.css";
import "react-placeholder/lib/reactPlaceholder.css";

import {
  ActiveBucketCard,
  InactiveBucketsRow,
  CreateBucketModal,
} from "../components/buckets/bucketCards";
import { useState } from "react";

import { useFetch } from "../hooks/index";
import { listBuckets, getActiveBucket } from "../utils/bucketUtils";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import {Footer} from '../components/footer/footer';

export const BucketsPage = () => {
  const { response, error, loading } = useFetch(listBuckets);

  const {
    response: activeBucketResponse = [],
    error: activeBucketError = null,
    loading: activeBucketLoading = false,
  } = useFetch(getActiveBucket);

  const isPageLoading = activeBucketLoading || loading;
  const hasPagedErrored = activeBucketError || error;

  const [activeBucket, setActiveBucketVal] = useState();

  const [locallyCreatedBuckets, setLocallyCreatedBuckets] = useState([]);
  const [locallyDeletedBuckets, setLocallyDeletedBuckets] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const realActiveBucket = activeBucket || activeBucketResponse || {};

  const deleteBucket = (bid, name) => {
    setLocallyDeletedBuckets([...locallyDeletedBuckets, bid]);
    NotificationManager.success(`${name} Successfully Deleted`);
  };

  const createBucket = (bucket) => {
    setLocallyCreatedBuckets([...locallyCreatedBuckets, bucket]);
    NotificationManager.success(`${bucket.name} Successfully Created`);
  };

  const serverBuckets = response || [];

  const buckets = [
    ...locallyCreatedBuckets.filter(
      (bucket) => !locallyDeletedBuckets.includes(bucket.uid)
    ),
    ...serverBuckets.filter(
      (bucket) => !locallyDeletedBuckets.includes(bucket.uid)
    ),
  ];

  const sliceIntoChunks = (arr, chunkSize) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  };

  const preSlicesOfThree = sliceIntoChunks(buckets, 3);
  const slicesOfThree =
    preSlicesOfThree[preSlicesOfThree.length - 1]?.length === 3
      ? [...preSlicesOfThree, []]
      : preSlicesOfThree;

  const setActiveBucket = (bucket) => {
    NotificationManager.info(`Active Bucket Set To: ${bucket.name}`);
    setActiveBucketVal(bucket);
  };

  return (
    <>
      <NotificationContainer />
      <Header activeId={1} />
      {hasPagedErrored ? (
        <ServerError />
      ) : (
        <Container className={"receipt_container"}>
          <CreateBucketModal
            createLocalBucket={createBucket}
            showModal={showModal}
            hideModal={() => {
              setShowModal(false);
            }}
          />
          <Row className={"mx-1 mt-5"}>
            <Col>
              <h3>Primary Destination</h3>
            </Col>
          </Row>
          <Row className={"mx-1"}>
            <Col>
              <p>
                Receipts you've uploaded will be associated with this bucket
                automatically.
              </p>
            </Col>
          </Row>
          <Row className={"mt-1"}>
            <Col>
              <ActiveBucketCard
                loading={isPageLoading}
                activeBucket={realActiveBucket}
              />
            </Col>
          </Row>
          <Row className={"mx-1 mt-5"}>
            <Col style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Other Destinations</h3>
              <Button variant="danger" onClick={() => setShowModal(true)}>
                Create New Bucket
              </Button>
            </Col>
          </Row>
          <Row className={"mx-1"}>
            <Col>
              <p>
                Change the active bucket to attribute future receipts uploads to
                the selected bucket.
              </p>
            </Col>
          </Row>
          {slicesOfThree.map((sliceOfFour, idx) => {
            return (
              <Row className={"mt-2"} key={`row-${idx}`}>
                <Col>
                  <InactiveBucketsRow
                    key={`bucket-row-${idx}`}
                    activeBucket={realActiveBucket}
                    loading={isPageLoading}
                    createBucket={createBucket}
                    deleteBucket={deleteBucket}
                    setActiveBucket={setActiveBucket}
                    buckets={sliceOfFour || []}
                  />
                </Col>
              </Row>
            );
          })}
        </Container>
      )}
      <Footer />
    </>
  );
};
