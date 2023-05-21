package models

type User struct {
	ID       int    `json:"id"`
	FullName string `json:"fullname"`
	Email    string `json:"email" binding:"required, email" gorm:"unique;not null"`
	Password string `json:"password" gorm:"type: varchar(255)"`
	Role     string `json:"role" gorm:"type: varchar(255)"`
}
