import React, { useContext, useState } from "react";
import styles from "../styles/DateSelector.module.css";
import moment from "moment";
import { DatePicker, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { DateContext } from "../contexts/dateContext";

const DateSelector = ({ fethchData, data, setData, picker = "" }) => {
    const meta = useContext(DateContext);
    const [dates, setDates] = useState([]);

    const disabledDate = (current) => {
        return !current.isBetween(meta.minDate, meta.maxDate);
    };

    const onClickDeleteDate = (date) => {
        const index = dates.findIndex((d) => d === date);
        setData({
            ...data,
            datasets: data.datasets.filter((d) => d.label !== date),
        });
        setDates([...dates.slice(0, index), ...dates.slice(index + 1)]);
    };

    const onClickAddDate = (date) => {
        setDates([date, ...dates]);
        fethchData(date);
    };

    const onClickClearDates = () => {
        setData({ ...data, datasets: [] });
        setDates([]);
    };

    return (
        <div className={styles.datepickerwrapper}>
            <DatePicker
                className={styles.datepicker}
                defaultValue={moment(meta.maxDate)}
                disabledDate={disabledDate}
                onChange={(_, date) => onClickAddDate(date)}
                picker={picker}
                allowClear={false}
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
