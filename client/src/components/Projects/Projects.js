import React, { useState } from "react";
import { Container, Row, Col, Button} from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import { useContext, useEffect } from "react";
import { API, setAuthToken } from "../../config/api";
import { AuthContext } from "../../auth/AuthContext";
import { useQuery,useMutation} from "react-query";
import AddProject from "./AddProject";
import Swal from 'sweetalert2';
function Projects() {
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useContext(AuthContext);
  const Login = state.isLogin === true;
  const Admin = state.user.role === "admin";
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
      console.log("User");
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      console.log("apa");
      if (state.isLogin === false) {
        console.log("s");
        // navigate("/");
      }
    }
  }, [isLoading]);

  let { data: projects } = useQuery("projectsChaces", async () => {
    const response = await API.get("/projects");
    return response.data.data;
  });

    // State untuk menampilkan/menyembunyikan modal
    const [showModal, setShowModal] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [addProject, setAddProject] = useState({});

    const handleChange = (e) => {
      setAddProject({
        ...addProject,
        [e.target.name]:
          e.target.type === "file" ? e.target.files : e.target.value,
      });
      if (e.target.type === "file") {
        let url = URL.createObjectURL(e.target.files[0]);
        setImageUrl(url);
      }
    };
  
    const addButtonHandler = useMutation(async (e) => {
      try {
        e.preventDefault();
  
        const config = {
          headers: {
            "Content-type": "multipart/form-data",
          },
        };
  
        
        const formData = new FormData();
        if (addProject.thumbnail) {
          formData.set(
            "thumbnail",
            addProject?.thumbnail[0],
            addProject?.thumbnail[0]?.name
            );
        }
        formData.set("title", addProject.title);
        formData.set("description", addProject.description);
        formData.set("publication_date", addProject.publication_date);
        formData.set("deployment", addProject.deployment);
        formData.set("github", addProject.github);
  
        console.log(formData);
        // Configuration Content-type
  
        // Insert data user to database
        const response = await API.post("/project", formData, config);
        console.log("add project success : ", response);
  ;
  
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Add Film Success",
          showConfirmButton: false,
          timer: 2000,
        });
        setShowModal(false)
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Add Film Failed",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    });

  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">
          My <strong className="purple">Projects </strong>
          {Login && Admin && (
            <Button className="mx-5" onClick={() => setShowModal(true)}>
              Add Project
            </Button>
          )}{" "}
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {projects?.map((project) => (
            <Col md={12} className="project-card">
              <ProjectCard
                login={Login}
                admin={Admin}
                project={project}
                title={project.title}
                thumbnail={project.thumbnail}
                deployment={project.deployment}
                github={project.github}
                publication={project.publication_date}
                description={project.description}
              />
            </Col>
          ))}
        </Row>
        <AddProject
          onSubmit={(e)=>addButtonHandler.mutate(e)}
          show={showModal}
          onHide={() => setShowModal(false)}
          onChange={handleChange}
        />
      </Container>
    </Container>
  );
}

export default Projects;
