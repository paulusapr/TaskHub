package models

type Task struct {
    ID	   uint   `json:"id" gorm:"primaryKey"`
    Title  string `json:"title"`
    Status string `json:"status"`
	UserID uint   `json:"user_id"`
}
