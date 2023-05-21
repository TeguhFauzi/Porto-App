package models

import "time"

type Project struct {
	ID               int       `json:"id" gorm:"primary_key:auto_increment"`
	Title            string    `json:"title" gorm:"type: varchar(255)"`
	Thumbnail string    `json:"thumbnail"  gorm:"type: varchar(255)"`
	Deployment       string    `json:"deployment" gorm:"type: varchar(255)"`
	Github           string    `json:"github" gorm:"type: varchar(255)"`
	PublicationDate  time.Time `json:"publication_date"`
	Description      string    `json:"description" gorm:"type: text"`
}
