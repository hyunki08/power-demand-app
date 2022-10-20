import React from "react";
import styles from "../styles/DateSelector.module.css";
import moment from "moment";
import { DatePicker, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const DateSelector = ({
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

export default DateSelector;
