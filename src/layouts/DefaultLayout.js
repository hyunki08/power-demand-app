import React, { Children } from "react";
import { Layout, Menu } from "antd";
import styles from "../styles/DefaultLayout.module.css";

const { Header, Footer, Content, Sider } = Layout;

const items = [
  { key: "dashboard", label: "Dashboard" },
  { key: "hourly", label: "hourly" },
  { key: "daily", label: "Daily" },
  { key: "monthly", label: "Monthly" },
  { key: "yearly", label: "Yearly" },
];

const DefaultLayout = ({ children }) => {
  return (
    <Layout hasSider>
      <Sider
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
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout
        className={styles.siteLayout}
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          className={styles.siteLayoutBackground}
          style={{
            padding: 0,
          }}
        />
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
          power-demand-app ©2018 Created by hyunki
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
