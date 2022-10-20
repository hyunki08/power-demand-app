import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  LineChartOutlined,
  BarChartOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import styles from "../styles/DefaultLayout.module.css";

const { Header, Footer, Content, Sider } = Layout;

const items = [
  { key: "/", label: "Dashboard", title: "Dashboard" },
  {
    key: "/hourly",
    label: "Hourly",
    title: "Hourly",
    icon: <LineChartOutlined />,
  },
  {
    key: "/daily",
    label: "Daily",
    icon: <MoreOutlined />,
    children: [
      { key: "/daily/total", label: "Daily Total", icon: <BarChartOutlined /> },
      {
        key: "/daily/stacked",
        label: "Daily Stacked",
        icon: <BarChartOutlined />,
      },
      { key: "/daily/avg", label: "Daily Average", icon: <BarChartOutlined /> },
    ],
  },
  {
    key: "/monthly",
    label: "Monthly",
    icon: <MoreOutlined />,
    children: [
      {
        key: "/monthly/total",
        label: "Monthly Total",
        icon: <BarChartOutlined />,
      },
      {
        key: "/monthly/avg",
        label: "Monthly Average",
        icon: <BarChartOutlined />,
      },
    ],
  },
  {
    key: "/yearly",
    label: "Yearly",
    icon: <MoreOutlined />,
    children: [
      {
        key: "/yearly/total",
        label: "Yearly Total",
        icon: <BarChartOutlined />,
      },
      {
        key: "/yearly/avg",
        label: "Yearly Average",
        icon: <BarChartOutlined />,
      },
    ],
  },
];

const DefaultLayout = ({ children }) => {
  const [headerTitle, setHeaderTitle] = useState("");
  const [selectedKey, setSelectedKey] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const onClickMenu = ({ key }) => {
    navigate(key);
    setSelected(key);
  };

  const setSelected = (key) => {
    setSelectedKey(key);
    let index = items.findIndex((item) => item.key === key);
    if (index !== -1) {
      setHeaderTitle(items[index].label);
    } else {
      index = items.findIndex(
        (item) => item.key !== "/" && key.includes(item.key)
      );
      if (index !== -1) {
        setHeaderTitle(
          items[index].children?.find((item) => item.key === key)?.label
        );
      }
    }
  };

  useEffect(() => {
    setSelected(location.pathname);
  }, [location]);

  return (
    <Layout hasSider>
      <Sider
        theme="light"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className={styles.logo}>제주 전력 수요량</div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={items}
          onClick={onClickMenu}
        />
      </Sider>
      <Layout
        className={styles.siteLayout}
        style={{
          marginLeft: 200,
        }}
      >
        <Header className={styles.siteLayoutHeader}>{headerTitle}</Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            className={styles.siteLayoutBackground}
            style={{
              padding: 24,
              textAlign: "center",
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          power demand app ©2022 Created by hyunki
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
