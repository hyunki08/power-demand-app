import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, DatePicker } from "antd";
import styles from "../styles/DateSelector.module.css";
import moment from "moment";

const MonthSelector = ({
  meta,
  dates,
  disabledDate,
  onClickAddDate,
  onClickClearDates,
  onClickDeleteDate,
}) => {
  return (
    <div className={styles.datepickerwrapper}>
      <DatePicker
        picker="month"
        className={styles.datepicker}
        defaultValue={moment(meta.maxDate)}
        disabledDate={disabledDate}
        onChange={(_, date) => onClickAddDate(date)}
      />
      <div className={styles.dates}>
        {!!dates && dates.length > 0 && (
          <Button type="primary" onClick={onClickClearDates}>
            Clear
          </Button>
        )}
        {!!dates &&
          dates.length > 0 &&
          dates.map((date, i) => (
            <div
              key={i}
              className={styles.date}
              onClick={() => onClickDeleteDate(date)}
            >
              {date}
              <CloseOutlined className={styles.datedelete} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MonthSelector;
