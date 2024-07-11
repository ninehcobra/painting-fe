"use client";

import {
  Avatar,
  Button,
  Dropdown,
  Input,
  InputNumber,
  Layout,
  List,
  Menu,
  Modal,
  Select,
  Skeleton,
  theme,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./dash-board.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  FormatPainterOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import {
  useDeletePaintingMutation,
  useGetAllPaintingColorsQuery,
} from "@/redux/services/painting.service";

interface IPaintingResponse {
  PaintingId: string;
  PaintingName: string;
  PaintingDescription: string;
  PaintingAuthor: string;
  Price: number;
  PublishYear: number;
  CreatedDate: string;
  StyleId: string;
}

export default function DashBoard() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const accessToken = localStorage.getItem("accessToken");
  const fullname = localStorage.getItem("fullname");
  const role = localStorage.getItem("role");
  if (!accessToken || !fullname || !role) {
    router.push("/login");
  }

  const { data, isError, error } = useGetAllPaintingColorsQuery();

  const [
    deletePainting,
    { isError: isDeleteError, isSuccess: isDeleteSuccess },
  ] = useDeletePaintingMutation();

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success("Deleted successfully");
    }
    if (isDeleteError) {
      toast.error("Error occurred");
    }
  }, [isDeleteError, isDeleteSuccess]);

  useEffect(() => {
    if (isError) {
      localStorage.clear();

      router.push("/login");

      toast.error("Session expired. Please log in again.");
    }
  }, [isError]);

  const handleMenuClick = (e: any) => {
    switch (e.key) {
      case "1":
        toast.warning("This is in process!!!");

        break;
      case "2":
        localStorage.removeItem("accessToken");
        localStorage.removeItem("fullname");
        localStorage.removeItem("role");
        toast.success("Logged out successfully");
        router.push("/login");
        break;
      default:
        break;
    }
  };

  const items = [
    {
      key: "1",
      label: "Profile",
    },
    {
      key: "2",
      label: "Logout",
    },
  ];

  const datafake = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];

  return (
    <Layout className="vh-100 dash-board-container">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <FormatPainterOutlined />,
              label: "Painting",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between align-items-center pe-3"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Dropdown menu={{ items, onClick: handleMenuClick }}>
            <div className="user-info d-flex align-items-center pe-2 ps-2">
              <img
                className="avatar-img me-2"
                alt="logo"
                src="https://cdn.popsww.com/blog/sites/2/2023/06/phong-tru-sanemi.jpg"
              />
              <div className="user-name">{fullname}</div>
            </div>
          </Dropdown>
        </Header>
        <Content
          className="content-detail"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#fff",
            borderRadius: "4px",
          }}
        >
          {loading ? (
            <>
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </>
          ) : // Your actual content here
          data && data.value.length > 0 ? (
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <div style={{ fontWeight: "500" }} className="mt-2 mb-2">
                  We have a total{" "}
                  <span style={{ color: "green" }}>{data.value.length}</span> of
                  paintings.
                </div>
                <div
                  onClick={showModal}
                  className="btn-add d-flex align-items-center justify-content-center"
                >
                  Add
                </div>
              </div>
              <List
                itemLayout="horizontal"
                dataSource={data.value}
                renderItem={(item: IPaintingResponse, index) => (
                  <List.Item
                    actions={[
                      <a style={{ color: "blue" }} key="list-loadmore-edit">
                        edit
                      </a>,
                      <a
                        onClick={() => deletePainting(item.PaintingId)}
                        style={{ color: "red" }}
                        key="list-loadmore-more"
                      >
                        delete
                      </a>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={`./images/painting.png`} />}
                      title={
                        <a
                          style={{ textDecoration: "none" }}
                          href="https://ant.design"
                        >{`${item.PaintingName} - ${item.PaintingAuthor} - ${item.PublishYear}`}</a>
                      }
                      description={item.PaintingDescription}
                    />
                    <div>
                      {item.Price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </div>
                  </List.Item>
                )}
              />
            </div>
          ) : (
            <div>There are 0 painting in database.</div>
          )}
        </Content>
      </Layout>
      <Modal
        title="Create Painting"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label>Painting id:</label>
        <Input className="mb-2" placeholder="Painting id" />
        <label>Painting name:</label>
        <Input className="mb-2" placeholder="Painting name" />
        <label>Painting description:</label>
        <Input className="mb-2" placeholder="Painting description" />
        <label>Painting author:</label>
        <Input className="mb-2" placeholder="Painting author" />
        <label>Painting Price (VNĐ):</label>
        <InputNumber className="ms-2" min={0} defaultValue={100000} />
        <label className="ms-3">Published Year:</label>
        <InputNumber
          className="ms-2"
          min={1000}
          max={2024}
          defaultValue={2024}
        />
        <label>Style Id:</label>
        <Select
          className="ms-2"
          showSearch
          placeholder="Select a person"
          optionFilterProp="label"
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "tom",
              label: "Tom",
            },
          ]}
        />
      </Modal>
    </Layout>
  );
}
