import { Modal, Form, Button } from "react-bootstrap";
export default function AddProject(props) {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header>
        <Modal.Title>Add New Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Project Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={props.onChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Project Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="description"
              onChange={props.onChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="publication_date">
            <Form.Label>Project Description</Form.Label>
            <Form.Control
              name="publication_date"
              type="date" /* ganti "dates" menjadi "date" */
              onChange={props.onChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="thumbnail">
            <Form.Label>Thumbnail URL</Form.Label>
            <Form.Control
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={props.onChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="deployment">
            <Form.Label>Deployment Link</Form.Label>
            <Form.Control
              type="text"
              name="deployment"
              onChange={props.onChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="github">
            <Form.Label>Github Link</Form.Label>
            <Form.Control
              type="text"
              name="github"
              onChange={props.onChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={props.onSubmit}>
          Add Project
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
