import React, { Component, useState } from "react";
import {assetsListAll, assetCreate} from "./assetsApi";
import "./App.css";
import "antd/dist/antd.css";
import { Form, Input, Button, Modal, Table, Space } from "antd";

const columns = [
  {
    title: "Ativo",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "ID Sensor",
    dataIndex: "sensor_id",
    key: "sensor_id",
  },
  {
    title: "Modelo",
    dataIndex: "model",
    key: "model",
  },
  {
    title: "Nível de saúde",
    dataIndex: "health_level",
    key: "health_level",
  },
  {
    title: "Descrição",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Responsável",
    dataIndex: "responsible",
    key: "responsible",
  },
  {
    title: "Unidade",
    dataIndex: "unity",
    key: "unity",
  },
  {
    title: "Ação",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Button type="primary" onClick ={() => {
          
        }}>Deletar</Button>
      </Space>
    ),
  },
];

const Demo = () => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onFinish = (values) => {
    assetCreate(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Nome do ativo"
        name="name"
        rules={[
          {
            required: true,
            message: "Favor preencher o nome do ativo!",
          },
        ]}
      >
        <Input placeholder="ex.: Máquina elétrica" />
      </Form.Item>
      <Form.Item
        label="ID Sensor"
        name="sensor_id"
        rules={[
          {
            required: true,
            message: "Favor preencher o ID do Sensor!",
          },
        ]}
      >
        <Input placeholder="ex.: ABC123" />
      </Form.Item>
      <Form.Item
        label="Modelo"
        name="model"
        rules={[
          {
            required: true,
            message: "Favor preencher o modelo do ativo!",
          },
        ]}
      >
        <Input placeholder="ex.: m3000" />
      </Form.Item>
      <Form.Item
        label="Nível de saúde"
        name="health_level"
        rules={[
          {
            required: true,
            message: "Favor preencher o nível de saúde do ativo!",
          },
        ]}
      >
        <Input placeholder="ex.: 95" />
      </Form.Item>
      <Form.Item
        label="Descrição"
        name="description"
        rules={[
          {
            required: true,
            message: "Favor preencher a descrição do ativo!",
          },
        ]}
      >
        <Input placeholder="ex.:Gerar energia elétrica" />
      </Form.Item>
      <Form.Item
        label="Status"
        name="status"
        rules={[
          {
            required: true,
            message: "Favor preencher o status do ativo!",
          },
        ]}
      >
        <Input placeholder="0 - Em parada / 1 - Em alerta / 2 - Em operação" />
      </Form.Item>
      <Form.Item
        label="Unidade"
        name="unity"
        rules={[
          {
            required: true,
            message: "Favor preencher a unidade!",
          },
        ]}
      >
        <Input placeholder="ex.: Unidade Centro" />
      </Form.Item>
      
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" >
          Cadastrar
        </Button>
      </Form.Item>
    </Form>
  );
};

function formatData(rawData) {
  let vect = [];

  for (let i = 0; i < rawData.length; i++) {
    let asset = rawData[i];
    //console.log(asset)

    let dic = {};

    dic.key = (i + 1).toString();

    dic.name = asset.name;

    dic.sensor_id = asset.sensor_id;

    dic.model = asset.model;

    dic.health_level = asset.health_level;

    dic.description = asset.description;

    dic.status = asset.status;

    dic.responsible = asset.responsible.name;

    dic.unity = asset.unity.name;

    vect.push(dic);
  }
  return vect;
}

class App extends Component {
  state = {
    assetsData: [],
    formattedData: [],
    isModalVisible: false,
  };

  async componentDidMount() {
    const response = await assetsListAll("");

    let rawData = response.data.assets;

    let dataAfterFormat = formatData(rawData);

    this.setState({ formattedData: dataAfterFormat });
  }

  handleOk() {
    this.setState({ isModalVisible: false });
  }

  handleCancel() {
    this.setState({ isModalVisible: false });
  }

  render() {
    const { formattedData } = this.state;

    return (
      <div>
        <Table columns={columns} dataSource={formattedData} />

        <Button
          type="primary"
          onClick={() => this.setState({ isModalVisible: true })}
        >
          Cadastrar Ativo
        </Button>

        <Modal
          title="Cadastro Ativo"
          visible={this.state.isModalVisible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          footer={[]}
        >
          <Demo />

        </Modal>
      </div>
    );
  }
}

export default App;
