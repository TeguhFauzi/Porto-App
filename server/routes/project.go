package routes

import (
	"portofolio/handlers"
	"portofolio/pkg/middleware"
	"portofolio/pkg/mysql"
	"portofolio/repositories"

	"github.com/labstack/echo/v4"
)


func ProjectRoutes(e *echo.Group) {
	projectRepository := repositories.RepositoryProject(mysql.DB)
	h := handlers.HandlerProject(projectRepository)

	e.GET("/projects", h.FindProjects)
	e.GET("/project/:id", h.GetProject)
	e.POST("/project", middleware.Auth(middleware.UploadFile(h.CreateProject)))
	e.PATCH("/project/:id", middleware.Auth(middleware.UploadFile(h.UpdateProject)))
	e.DELETE("/project/:id", middleware.Auth(h.DeleteProject))
}
