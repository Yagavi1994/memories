import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { useRedirect } from "../../hooks/useRedirect";
import Asset from "../../components/Asset";
import Upload from "../../assets/upload.png";
import styles from "../../styles/PostMilestoneCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function MilestoneCreateForm() {
  useRedirect("loggedin");
  const [errors, setErrors] = useState({});

  const [milestoneData, setMilestoneData] = useState({
    title: "",
    content: "",
    image: "",
    milestone_date: "",
    age_months: "",
    age_years: "",
    height: "",
    weight: "",
    milestone_category: "",
  });
  
  const { title, content, image, milestone_date, age_months, age_years, height, weight, milestone_category } = milestoneData;
  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setMilestoneData({
      ...milestoneData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setMilestoneData({
        ...milestoneData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);
    formData.append("milestone_date", milestone_date);
    formData.append("age_years", age_years);
    formData.append("age_months", age_months);
    formData.append("height", height);
    formData.append("weight", weight);
    formData.append("milestone_category", milestone_category);

    try {
      const { data } = await axiosReq.post("/milestones/", formData);
      history.push(`/milestones/${data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Milestone</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="milestone_date" 
          value={milestone_date}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.milestone_date?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group as={Row} className="align-items-center">
        <Form.Label column sm="2">
          Age:
        </Form.Label>
        <Col sm="5">
          <Form.Control
            type="number"
            name="age_years"
            min="0"
            placeholder="Years"
            value={age_years}
            onChange={handleChange}
          />
        </Col>
        <Col sm="5">
          <Form.Control
            type="number"
            className={styles.Months}
            name="age_months"
            min="0"
            max="11"
            placeholder="Months"
            value={age_months}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
      {errors?.milestone_date?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group as={Row} className="align-items-center mt-3">
        <Form.Label column sm="2">
          Height:
        </Form.Label>
        <Col sm="4">
          <Form.Control
            type="number"
            name="height"
            min="0"
            placeholder="cm"
            value={height}
            onChange={handleChange}
          />
        </Col>
        <Form.Label column sm="2">
          Weight:
        </Form.Label>
        <Col sm="4">
          <Form.Control
            type="number"
            name="weight"
            step="0.01"
            min="0"
            placeholder="kg"
            value={weight}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
      {errors?.milestone_date?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Milestone Category</Form.Label>
        <Form.Control
          as="select"
          name="milestone_category"
          value={milestone_category}
          onChange={handleChange}
        >
          <option value="physical">Physical</option>
          <option value="cognitive">Cognitive</option>
          <option value="motor">Fine Motor</option>
          <option value="emotional">Emotional</option>
          <option value="social">Social</option>
          <option value="language">Language</option>
          <option value="other">Other</option>
        </Form.Control>
      </Form.Group>
      {errors?.milestone_date?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Button className={`${btnStyles.Button} ${btnStyles.Gold}`} type="submit">
        Create
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.White}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className={`d-flex justify-content-center ${styles.UploadImage}`}
                  htmlFor="image-upload"
                >
                  <Asset 
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={`${appStyles.Content} `} id={appStyles.FormContainer} >{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default MilestoneCreateForm;
