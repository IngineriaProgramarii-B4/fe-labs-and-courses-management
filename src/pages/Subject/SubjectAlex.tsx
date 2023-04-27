import React, { useEffect, useState, useRef } from "react";
import { Card, Button, Modal, Form, Input } from "antd";
import "./SubjectAlex.css";
import { PlusOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled } from '@ant-design/icons';
import {
  Cascader,
  Checkbox,
  DatePicker,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import axios from "axios";
import { Row, Col } from "antd";


const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};




const { Meta } = Card;

interface Subject {
  id: number;
  title: string;
  description: string;
  year: number;
  semester: number;
  credits: number;
}

function SubjectAlex() {
  const [showList, setShowList] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const [form] = Form.useForm()

  const { confirm } = Modal;

  const showDeleteConfirm = (title: string) => {
    confirm({
      title: 'Are you sure you wish to delete this subject?',
      icon: <ExclamationCircleFilled />,
      content: "You can't revert your actions",
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        axios.delete(`http://localhost:8090/api/v1/subjects/subjectTitle=${title}`);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const [cards, setCards] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get<Subject[]>(
        `http://localhost:8090/api/v1/subjects`
      );
      setCards(result.data);
    };
    fetchData();
  }, [cards]);

  const [SubjectModal, setSubjectModal] = useState(false);
  const [AddModal, setAddModal] =  useState(false);

  const handleClick = async (title: string) => {
    window.location.href = `http://localhost:3000/subjectana?subject=${title}`;
  };

  const handleAddNewSubjectClick = (card: Subject) => {
    editSubjectModal(card);
  }

  const handleEditClick = (event: any, card: Subject) => {
    event.stopPropagation();
    editSubjectModal(card);
  }

  const handleDeleteClick = (event: any, title: string) => {
    event.stopPropagation();
    showDeleteConfirm(title);
  }

  const handleAddCard = () => {
    const newCard = {
      id: cards.length + 1,
      title: `Materie ${cards.length + 1}`,
      image:
        "https://asterdio.com/wp-content/uploads/2021/02/Blog-Object-Oriented-Programming.jpg",
      description: "Descriere materie noua",
      year: 0,
      semester: 0,
      credits: 0
    };
    setCards([...cards, newCard]);
    handleSubjectModal(true);
  };
  
  const handleSubjectModal = (visible: boolean) => {
    setSubjectModal(visible);
  };
  const handleAddModal = (visible: boolean) => {
    setAddModal(visible);
  };

  const editSubjectModal = (subject: Subject) => {
    setSelectedSubject(subject);
    setSubjectModal(true);
  };

  useEffect(() => {
    if (selectedSubject) {
      form.setFieldsValue(selectedSubject);
    }
  }, [form, selectedSubject])

  const initializeSubjecEditProperties = (title: string) => {
    const currentSubject = cards.filter((card: Subject) => card.title === title);
    console.log(currentSubject[0]);
    setTitleEdit(currentSubject[0].title);
    setYearEdit(currentSubject[0].year);
    setSemesterEdit(currentSubject[0].semester);
    setCreditsEdit(currentSubject[0].credits);
    setDescriptionEdit(currentSubject[0].description);
  }

  const [titleEdit, setTitleEdit] = useState<string>();
  const [yearEdit, setYearEdit] = useState<number>();
  const [semesterEdit, setSemesterEdit] = useState<number>();
  const [creditsEdit, setCreditsEdit] = useState<number>();
  const [descriptionEdit, setDescriptionEdit] = useState<string>();

  const [titleAdd, setTitleAdd] = useState("");
  const [yearAdd, setYearAdd] = useState(0);
  const [semesterAdd, setSemesterAdd] = useState(0);
  const [creditsAdd, setCreditsAdd] = useState(0);
  const [descriptionAdd, setDescriptionAdd] = useState("");
  
  
  const editSubjectProperties = {
    title: titleEdit,
    credits: Number(creditsEdit),
    year: Number(yearEdit),
    semester: Number(semesterEdit),
    description: descriptionEdit,
    components: [],
    evaluations: [],
  }

  const addSubjectProperties = {
    title: titleAdd,
    credits: Number(creditsAdd),
    year: Number(yearAdd),
    semester: Number(semesterAdd),
    description: descriptionAdd,
    components: [],
    evaluations: []
  };

  const addNewSubject = async () => {
    console.log(addSubjectProperties);
    setAddModal(false);
    const result = await axios.post(
      `http://localhost:8090/api/v1/subjects`, addSubjectProperties
      );
    console.log(result)
  }

  const submitChangesToSubject = async (title: string | undefined) => {
    console.log(editSubjectProperties);
    if (typeof title === "undefined") {
      console.log("Could not submit changes")
      return;
    }

    const result = await axios.put(
      `http://localhost:8090/api/v1/subjects/subjectTitle=${title}`, editSubjectProperties
    )
    console.log(result)
  }





  return (
    <>
      <div className="app-container">
        {/*<header className="app-header">
          <button
            className="courses-button"
            onMouseEnter={() => setShowList(true)}
            onMouseLeave={() => setShowList(false)}
          >
            Courses
          </button>
          {showList && (
            <ul
              className="courses-list"
              onMouseEnter={() => setShowList(true)}
              onMouseLeave={() => setShowList(false)}
            >
              <li onClick={() => handleClick("materie")}>Materie 1</li>
              <li onClick={() => handleClick("materie")}>Materie 2</li>
              <li onClick={() => handleClick("materie")}>Materie 3</li>
              <li onClick={() => handleClick("materie")}>Materie 4</li>
              <li onClick={() => handleClick("materie")}>Materie 5</li>
              <li onClick={() => handleClick("materie")}>Materie 6</li>
            </ul>
          )}
        </header>*/}
        <body>
          <div className="container cardgrid">
            {cards.map((card) => (
              <div className="card-wrapper" key={card.id}>
                <div data-testid="subject-card">
                <Card
                  onClick={() => handleClick(card.title)}
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt={card.title} src={"https://asterdio.com/wp-content/uploads/2021/02/Blog-Object-Oriented-Programming.jpg"} />}
                  actions={[
                    <Button data-testid="edit-button" type="text" key="edit" onClick={(event) => { 
                      initializeSubjecEditProperties(card.title);
                      handleEditClick(event, card)}}>
                      Edit
                    </Button>,
                    <Button type="text" key="delete" onClick={(event) => handleDeleteClick(event, card.title)}>
                      Delete
                    </Button>,
                  ]}
                >
                  <Meta title={card.title} description={card.description} />
                </Card>
                </div>
              </div>
            ))}
            <div className="card-wrapper add-card" data-testid="add-card-button"onClick={() => handleAddModal(true)}>
              <Card
                hoverable
                style={{ width: 240, padding: 40 }}
                cover={
                  <div className="add-card-cover" data-testid="add-card-outline">
                    <PlusOutlined style={{ fontSize: 40 }} />
                  </div>
                }
              >
                <Meta
                  title={
                    <div className="card-meta-title" data-testid="add-card-title"style={{ fontSize: 13 }}>
                      Add a new subject
                    </div>
                  }
                />
              </Card>
            </div>
              <Modal
                title="Edit subject"
                open={SubjectModal}
                onCancel={() => setSubjectModal(false)}
                onOk={() => setSubjectModal(false)}
                footer={[
                  <Button key="cancel" onClick={() =>
                    setSubjectModal(false)}>
                    Cancel
                  </Button>,
                  <Button key="submit" type="default" onClick={() => submitChangesToSubject(titleEdit)}>
                    Submit
                  </Button>,
                ]}
              >
                <Form
                  layout="vertical"
                  name="edit_subject"
                  form={form}
                >
                  <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                          {
                            required: true,
                            message: "Please input the title of the subject!",
                          },
                        ]}
                      >
                        <Input
                          value={titleEdit}
                          onChange={(event) => setTitleEdit(event.target.value)}/>
                      </Form.Item>
                  <Row>
                    <Col span={12} style={{ paddingRight: '10px' }}>
                      <Form.Item
                        label="Year"
                        name="year"
                        rules={[
                          {
                            required: true,
                            message: "Please select the year of the subject!",
                          },
                        ]}
                      >
                        <Select 
                          value={yearEdit}
                          onChange={(event) => setYearEdit(event)}>
                          <Select.Option value="1">1</Select.Option>
                          <Select.Option value="2">2</Select.Option>
                          <Select.Option value="3">3</Select.Option>
                          <Select.Option value="4">4</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12} style={{ paddingLeft: '10px' }}>
                      <Form.Item
                        label="Semester"
                        name="semester"
                        rules={[
                          {
                            required: true,
                            message: "Please select the semester of the subject!",
                          },
                        ]}
                      >
                        <Select 
                          value={semesterEdit}
                          onChange={(event) => setSemesterEdit(event)}>
                          <Select.Option value="1">1</Select.Option>
                          <Select.Option value="2">2</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                      <Form.Item
                        label="Number of credits"
                        name="credits"
                        rules={[
                          {
                            required: true,
                            message: "Please select the number of credits of the subject!",
                          },
                        ]}
                      >
                        <Select 
                          value={creditsEdit}
                          onChange={(event) => setCreditsEdit(event)}>
                          <Select.Option value="1">1</Select.Option>
                          <Select.Option value="2">2</Select.Option>
                          <Select.Option value="3">3</Select.Option>
                          <Select.Option value="4">4</Select.Option>
                          <Select.Option value="5">5</Select.Option>
                          <Select.Option value="6">6</Select.Option>
                        </Select>
                      </Form.Item>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Please input the description of the subject!",
                      },
                    ]}
                  >
                    <TextArea 
                      rows={4}
                      value={descriptionEdit}
                      onChange={(event) => setDescriptionEdit(event.target.value)}/>
                  </Form.Item>
                </Form>
              </Modal>

              <Modal
                title="Add a new subject"
                open={AddModal}
                onCancel={() => setAddModal(false)}
                onOk={() => setAddModal(false)}
                footer={[
                  <Button key="cancel" onClick={() => setAddModal(false)}>
                    Cancel
                  </Button>,
                  <Button key="submit" type="default" onClick={addNewSubject}>
                    Submit
                  </Button>,
                ]}
              >
                <Form
                  layout="vertical"
                  name="add_subject"
                >
                  <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                          {
                            required: true,
                            message: "Please input the title of the subject!",
                          },
                        ]}
                      >
                        <Input 
                          placeholder="Input title" 
                          value={titleAdd}
                          onChange={(event) => setTitleAdd(event.target.value)}
                        />
                      </Form.Item>
                  <Row>
                    <Col span={12} style={{ paddingRight: '10px' }}>
                      <Form.Item
                        label="Year"
                        name="year"
                        rules={[
                          {
                            required: true,
                            message: "Please select the year of the subject!",
                          },
                        ]}
                      >
                        <Select 
                          value={yearAdd}
                          onChange={(event) => setYearAdd(event)}>
                          <Select.Option value="1">1</Select.Option>
                          <Select.Option value="2">2</Select.Option>
                          <Select.Option value="3">3</Select.Option>
                          <Select.Option value="4">4</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12} style={{ paddingLeft: '10px' }}>
                      <Form.Item
                        label="Semester"
                        name="semester"
                        rules={[
                          {
                            required: true,
                            message: "Please select the semester of the subject!",
                          },
                        ]}
                      >
                        <Select  
                          value={semesterAdd}
                          onChange={(event) => setSemesterAdd(event)}>
                          <Select.Option value="1">1</Select.Option>
                          <Select.Option value="2">2</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                      <Form.Item
                        label="Number of credits"
                        name="credits"
                        rules={[
                          {
                            required: true,
                            message: "Please select the number of credits of the subject!",
                          },
                        ]}
                      >
                        <Select 
                          value={creditsAdd}
                          onChange={(event) => setCreditsAdd(event)}>
                          <Select.Option value="1">1</Select.Option>
                          <Select.Option value="2">2</Select.Option>
                          <Select.Option value="3">3</Select.Option>
                          <Select.Option value="4">4</Select.Option>
                          <Select.Option value="5">5</Select.Option>
                          <Select.Option value="6">6</Select.Option>
                        </Select>
                      </Form.Item>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Please input the description of the subject!",
                      },
                    ]}
                  >
                    <TextArea 
                      rows={4}
                      placeholder="Subject description"
                      value={descriptionAdd}
                      onChange={(event) => setDescriptionAdd(event.target.value)}/>
                  </Form.Item>
                </Form>
              </Modal>
          </div>
        </body>
      </div>
    </>
  );
}

export default SubjectAlex;

