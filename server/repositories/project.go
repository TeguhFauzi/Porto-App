package repositories

import (
	"portofolio/models"

	"gorm.io/gorm"
)

type ProjectRepository interface {
	FindProjects() ([]models.Project, error)
	GetProject(ID int) (models.Project, error)
	CreateProject(project models.Project) (models.Project, error)
	UpdateProject(project models.Project) (models.Project, error)
	DeleteProject(project models.Project, ID int) (models.Project, error)
}

func RepositoryProject(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindProjects() ([]models.Project, error) {
	var projects []models.Project
	err := r.db.Find(&projects).Error

	return projects, err
}

func (r *repository) GetProject(ID int) (models.Project, error) {
	var project models.Project
	err := r.db.First(&project, ID).Error

	return project, err
}

func (r *repository) CreateProject(project models.Project) (models.Project, error) {
	err := r.db.Save(&project).Error
	return project, err
}

func (r *repository) UpdateProject(project models.Project) (models.Project, error) {
	err := r.db.Model(&project).Updates(project).Error
	return project, err
}

func (r *repository) DeleteProject(project models.Project, ID int) (models.Project, error) {
	err := r.db.Delete(&project, ID).Scan(&project).Error

	return project, err
}
