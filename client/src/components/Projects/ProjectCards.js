import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { API } from "../../config/api";
import EditProject from "./EditProject";
function ProjectCards(props) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectData, setProjectData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  useEffect(() => {
    setProjectData(selectedProject);
  }, [selectedProject]);

  const updateProject = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", projectData.title);
      formData.append("description", projectData.description);
      formData.append("deployment", projectData.deployment);
      formData.append("github", projectData.github);

      if (projectData.thumbnail) {
        formData.append("thumbnail", projectData.thumbnail[0]);
      }
      // onSave(formData);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await API.patch(
        `/project/${selectedProject.id}`,
        formData,
        config
      );

      console.log("update Project success : ", response);
      setShowModal(false);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Update Project Success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        position: "center",
        icon: "error",
        title: "Update Project Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const handleDeleteProject = async (projectId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to Delete this Project!",
        position: "center",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await API.delete(`/project/${projectId}`);
          setShowModal(false);
          Swal.fire("Delete successfully", "", "success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const publishDateFormat = (dateToFormat) => {
    return new Intl.DateTimeFormat("id-ID", {
      month: "short",
      year: "numeric",
 
    }).format(new Date(dateToFormat));
  };
  
  return (
    <>
      <Card className="project-card-view">
        <Card.Img
          style={{ width: "50%", height: "200px" }}
          variant="top"
          src={props.thumbnail}
          alt="card-img"
        />
        <Card.Body style={{ width: "50%", padding: "none" }}>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text style={{ textAlign: "justify" }}>
            <p>{props.description}</p>
            <p>Publication at :               {publishDateFormat(props.publication_date ?? "2023-05-01")}</p>
          </Card.Text>
          <div className="d-flex butt justify-content-between">
            <div className="d-flex">
              {!props.isBlog && props.deployment && (
                <Button
                  variant="primary"
                  href={props.deployment}
                  target="_blank"
                  style={{
                    width: "89px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CgWebsite /> &nbsp;
                  {"Demo"}
                </Button>
              )}
              <Button
                variant="primary"
                href={props.github}
                target="_blank"
                style={{
                  padding: "0",
                  margin: "0 5px",
                  width: "89px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BsGithub /> &nbsp;
                {props.isBlog ? "Blog" : "GitHub"}
              </Button>
            </div>
            {props.login === true && props.admin === true && (
              <div style={{ width: "100%", display: "flex" }}>
                <Button
                  onClick={() => handleShowModal(props.project)}
                  className="px-4"
                  style={{
                    width: "89px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteProject(props.project.id)}
                  className="mx-1 px-1"
                  style={{ fontSize: "0.8em" }}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
      <EditProject
        show={showModal}
        onHide={() => setShowModal(false)}
        selectedProject={selectedProject}
        onSave={updateProject}
        projectData={projectData}
        setProjectData={setProjectData}
      />
    </>
  );
}

export default ProjectCards;
