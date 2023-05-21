import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
;

function EditProject({
  show,
  onHide,
  selectedProject,
  projectData,
  setProjectData,
  onSave
}) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setProjectData(selectedProject);
  }, [selectedProject]);

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      setProjectData({
        ...projectData,
        [name]: files,
      });

      const url = URL.createObjectURL(files[0]);
      setImageUrl(url);
    } else {
      setProjectData({
        ...projectData,
        [name]: value,
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSave}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={projectData?.title || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={projectData?.description || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="thumbnail" className="form-label">
              Thumbnail Project
            </label>
            <input
              type="file"
              className="form-control"
              id="thumbnail"
              name="thumbnail"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="deployment" className="form-label">
              Deployment
            </label>
            <input
              type="text"
              className="form-control"
              id="deployment"
              name="deployment"
              value={projectData?.deployment || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="github" className="form-label">
              Github
            </label>
            <input
              type="text"
              className="form-control"
              id="github"
              name="github"
              value={projectData?.github || ""}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update Project
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditProject;
