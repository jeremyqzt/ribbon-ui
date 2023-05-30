import Header from "../components/header";
import { ReceiptContainer } from "../components/receiptContainer";
import { useState } from "react";
import EmptyLogo from "../components/empty/empty";
import LoadingLogo from "../components/loading/loading";
import ServerError from "../components/error/serverError";

import "../style/receiptContainer.css";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-dropzone-uploader/dist/styles.css";
import "react-image-crop/dist/ReactCrop.css";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useFetch } from "../hooks/index";
import { getActiveBucket } from "../utils/bucketUtils";
import { getReceipts } from "../utils/receiptUtils";

import { NotificationContainer } from "react-notifications";
import { SearchParams } from "../components/uploads/searchParams";
import { searchParams } from "../constants/constants";
import Paging from "../components/pagination/pagination";
import { Footer } from "../components/footer/footer";

export const MainPage = () => {
  const [pageMeta, setPageMeta] = useState({
    sort: searchParams[0].value,
    offset: 0,
  });

  const setPaging = (val) => {
    setPageMeta({ ...pageMeta, offset: val });
  };

  const {
    response: activeBucketResponse = [],
    error: activeBucketError = null,
    loading: activeBucketLoading = false,
  } = useFetch(getActiveBucket);

  const {
    response: receiptsResp,
    error: receiptsErr = null,
    loading: receiptsLoading = false,
  } = useFetch(getReceipts, false, pageMeta);

  const currentReceipts = receiptsResp?.receipts || [];
  const totalReceipts = receiptsResp?.total || 0;

  const [deletedReceipts, setDeletedReceipts] = useState([]);
  const [newlyCreatedReceipts, setNewlyCreatedReceipts] = useState([]);

  const realReceipts = ([...newlyCreatedReceipts, ...currentReceipts] ?? [...newlyCreatedReceipts,]).filter(
    (item) => !deletedReceipts.includes(item.pk)
  );

  const deleteReceipt = (uid) => {
    setDeletedReceipts([...deletedReceipts, uid]);
  };

  const createLocalReceipt = (newReceipt) => {
    setNewlyCreatedReceipts([{ ...newReceipt }, ...newlyCreatedReceipts]);
  };

  const isLoading = receiptsLoading || activeBucketLoading;
  const isError = !isLoading && (receiptsErr || activeBucketError);
  const noReceipts = (realReceipts || []).length === 0;

  return (
    <>
      <Header activeId={0} />
      <NotificationContainer />
      <SearchParams
        loading={isLoading}
        total_receipts={totalReceipts}

        activeBucketResponse={activeBucketResponse}
        onCreateReceipt={(receipt) => {
          createLocalReceipt(receipt)
        }}
        onChangeSearchTerm={(v) => {
          setPageMeta({
            ...pageMeta,
            searchTerm: v,
          });
        }}
        onChangeSearch={(v) => {
          setPageMeta({
            ...pageMeta,
            searchParam: v,
          });
        }}
      />
      <Container className={"receipt_container"} fluid>
        <Row>
          <Col>
            {isLoading ? (
              <LoadingLogo />
            ) : isError ? (
              <ServerError />
            ) : noReceipts ? (
              <EmptyLogo />
            ) : (
              <ReceiptContainer
                activeBucket={activeBucketResponse}
                receipts={realReceipts ?? []}
                isLoading={receiptsLoading || activeBucketLoading}
                deleteLocalReceipt={deleteReceipt}
              />
            )}
          </Col>
        </Row>
        {!isLoading && !isError ? (
          <Paging
            total_count={receiptsResp?.pages || 0}
            total_receipts={totalReceipts}
            cur_page={pageMeta.offset}
            setNewPage={setPaging}
          />
        ) : null}
      </Container>
      <Footer />
    </>
  );
};
