import Pagination from "react-bootstrap/Pagination";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Paging = ({ total_count, cur_page, setNewPage }) => {
  let pagination = [];

  // if 7, show first, last and 5 in between
  if (total_count > 7) {
    pagination = [1];
    const cur = cur_page + 1;

    if (cur - 1 >= 3) {
      pagination.push(-1);
      pagination.push(cur - 2);
    }

    if (cur - 1 >= 2) {
      pagination.push(cur - 1);
    }

    pagination.push(cur_page + 1);

    if (cur + 1 < total_count) {
      pagination.push(cur + 1);
    }

    if (cur + 2 < total_count) {
      pagination.push(cur + 2);
      pagination.push(-1);
    }

    pagination.push(total_count);
  } else {
    for (let i = 0; i < total_count; i++) {
      pagination.push(i + 1);
    }
  }

  if (total_count === 0) {
    return null;
  }

  const shouldDisableMove = (total_count <= 1);

  return (
    <Row className={"d-flex justify-content-center"}>
      <Col className={"d-flex justify-content-center"}>
        <Pagination>
          <Pagination.First onClick={() => setNewPage(0)} disabled={shouldDisableMove} />
          <Pagination.Prev onClick={() => setNewPage(Math.max(0, cur_page - 2))} disabled={shouldDisableMove} />
          {pagination.map((page_num) => {
            if (page_num === -1) {
              return <Pagination.Ellipsis />;
            }
            return (
              <Pagination.Item key={`paging-${page_num}`} active={cur_page + 1 === page_num} onClick={() => setNewPage(page_num - 1)}>
                {page_num}
              </Pagination.Item>
            );
          })}
          <Pagination.Next onClick={() => setNewPage(Math.min(total_count - 1, cur_page + 1))} disabled={shouldDisableMove} />
          <Pagination.Last onClick={() => setNewPage(total_count - 1)} disabled={shouldDisableMove}/>
        </Pagination>
      </Col>
    </Row>
  );
};

export default Paging;
