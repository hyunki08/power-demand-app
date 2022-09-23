import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import styles from "../styles/DefaultLayout.module.css";

const { Header, Footer, Content, Sider } = Layout;

const items = [
  { key: "/", label: "Dashboard" },
  { key: "/hourly", label: "Hourly" },
  { key: "/daily", label: "Daily" },
  { key: "/monthly", label: "Monthly" },
  { key: "/yearly", label: "Yearly" },
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
    setHeaderTitle(items.find((item) => item.key === key)?.label);
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
        <div className={styles.logo}>Power Demand App</div>
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
