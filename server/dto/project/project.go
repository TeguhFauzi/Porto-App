package projectdto

import "time"

type CreateProjectRequest struct {
	Title           string    `json:"title" from:"title" validate:"required"`
	Thumbnail       string    `json:"thumbnail" from:"thumbnail" validate:"required"`
	Deployment      string    `json:"deployment" from:"deployment" validate:"required"`
	Github          string    `json:"github" from:"github" validate:"required"`
	PublicationDate time.Time `json:"publication_date" from:"publication_date" validate:"required"`
	Description     string    `json:"description" from:"description" validate:"required"`
}
type UpdateProjectRequest struct {
	Title           string    `json:"title" from:"title"`
	Thumbnail       string    `json:"thumbnail" from:"thumbnail"`
	Deployment      string    `json:"deployment" from:"deployment"`
	Github          string    `json:"github" from:"github"`
	PublicationDate time.Time `json:"publication_date" from:"publication_date"`
	Description     string    `json:"description" from:"description"`
}

type ProjectResponse struct {
	ID              int       `json:"id" validate:"required"`
	Title           string    `json:"title" from:"title" validate:"required"`
	Thumbnail       string    `json:"thumbnail" from:"thumbnail" validate:"required"`
	Deployment      string    `json:"deployment" from:"deployment" validate:"required"`
	Github          string    `json:"github" from:"github" validate:"required"`
	PublicationDate time.Time `json:"publication_date" from:"publication_date" validate:"required"`
	Description     string    `json:"description" from:"description" validate:"required"`
}
