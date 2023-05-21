package handlers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	projectdto "portofolio/dto/project"
	dto "portofolio/dto/result"
	"portofolio/models"
	"portofolio/repositories"
	"strconv"
	"time"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
)

type ProjectHandler struct {
	ProjectRepository repositories.ProjectRepository
}

func HandlerProject(ProjectRepository repositories.ProjectRepository) *ProjectHandler {
	return &ProjectHandler{ProjectRepository}
}

func (h *ProjectHandler) FindProjects(c echo.Context) error {
	projects, err := h.ProjectRepository.FindProjects()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: projects})
}

func (h *ProjectHandler) GetProject(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	project, err := h.ProjectRepository.GetProject(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: project})
}
func (h *ProjectHandler) CreateProject(c echo.Context) error {
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	thumbnail := c.Get("dataFile").(string)
	times := c.FormValue("publication_date")
	layout := "2006-01-02"
	publicationDate, _ := time.Parse(layout, times)

	request := projectdto.CreateProjectRequest{
		Title:            c.FormValue("title"),
		Thumbnail: thumbnail,
		Deployment:       c.FormValue("deployment"),
		Github:           c.FormValue("github"),
		PublicationDate:  publicationDate,
		Description:      c.FormValue("description"),
	}
	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
	respThumbnail, err := cld.Upload.Upload(ctx, request.Thumbnail, uploader.UploadParams{Folder: "Projects/thumbnail"})

	if err != nil {
		fmt.Println(err.Error())
	}

	project := models.Project{
		Title:            request.Title,
		Thumbnail: respThumbnail.SecureURL,
		Deployment:       request.Deployment,
		Github:           request.Github,
		PublicationDate:  request.PublicationDate,
		Description:      request.Description,
	}

	data, err := h.ProjectRepository.CreateProject(project)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponseProject(data)})
}

func (h *ProjectHandler) UpdateProject(c echo.Context) error {
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	id, _ := strconv.Atoi(c.Param("id"))
	project, err := h.ProjectRepository.GetProject(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	thumbnail := c.Get("dataFile").(string)
	times := c.FormValue("publication_date")
	layout := "2006-01-02"
	publicationDate, _ := time.Parse(layout, times)

	request := projectdto.UpdateProjectRequest{
		Title:            c.FormValue("title"),
		Thumbnail: thumbnail,
		Deployment:       c.FormValue("deployment"),
		Github:           c.FormValue("github"),
		PublicationDate:  publicationDate,
		Description:      c.FormValue("description"),
	}

	respThumbnail, err := cld.Upload.Upload(ctx, request.Thumbnail, uploader.UploadParams{Folder: "Projects/thumbnail"})
	if err != nil {
		fmt.Println(err.Error())
	}
	if request.Title != "" {
		project.Title = request.Title
	}

	if request.Thumbnail != "" {
		project.Thumbnail = respThumbnail.SecureURL
	}
	if request.Deployment != " " {
		project.Deployment = request.Deployment
	}
	if request.Github != " " {
		project.Github = request.Github
	}

	if !request.PublicationDate.IsZero() {
		project.PublicationDate = request.PublicationDate
	}
	if request.Description != "" {
		project.Description = request.Description
	}

	data, err := h.ProjectRepository.UpdateProject(project)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponseProject(data)})
}
func (h *ProjectHandler) DeleteProject(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	project, err := h.ProjectRepository.GetProject(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.ProjectRepository.DeleteProject(project, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponseProject(data)})
}
func convertResponseProject(u models.Project) projectdto.ProjectResponse {
	return projectdto.ProjectResponse{
		ID:               u.ID,
		Title:            u.Title,
		Thumbnail: u.Thumbnail,
		Deployment:       u.Deployment,
		Github:           u.Github,
		PublicationDate:  u.PublicationDate,
		Description:      u.Description,
	}
}
