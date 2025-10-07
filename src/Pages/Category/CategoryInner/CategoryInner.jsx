import classNames from "classnames/bind";
import styles from "./CategoryInner.module.scss";
import Button from "../../../Component/Button/Button";
import CardManga from "../../../Component/CardManga/CardManga";

const cx = classNames.bind(styles);

function CategoryInner({ dataResult = {}, setSearchParams, headerKeyWord }) {
  const createCardList = () => {
    return dataResult?.bookResponses?.map((item) => (
      <CardManga
        key={item.id}
        id={item.id}
        slug={item.slug}
        title={item.title}
        coverImg={item.coverImg}
        newestChapter={item.newestChapter}
        updateTime={item.updateTime}
        createAt={item.createAt}
      />
    ));
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        {headerKeyWord && (
          <div style={{ marginBottom: "50px" }}>
            <h1>Result for {headerKeyWord}</h1>
          </div>
        )}

        <div className={cx("cardContainer")}>{createCardList()}</div>

        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <Button
            className={cx(
              "button-page-movement",
              dataResult.pageNumber === 1 && "disable"
            )}
            onClick={() =>
              setSearchParams((prev) => ({
                ...prev,
                pageNumber: `${dataResult.pageNumber - 1}`,
              }))
            }
          >
            Prev Page
          </Button>

          <Button
            className={cx(
              "button-page-movement",
              dataResult.pageNumber === dataResult.totalPage && "disable"
            )}
            onClick={() =>
              setSearchParams((prev) => ({
                ...prev,
                pageNumber: `${dataResult.pageNumber + 1}`,
              }))
            }
          >
            Next Page
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CategoryInner;
