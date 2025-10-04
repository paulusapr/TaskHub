package models

type Task struct {
    ID	   uint   `json:"id" gorm:"primaryKey"`
    Title  string `json:"title"`
    UserID uint   `json:"user_id"`
    Status TaskStatus `json:"status" gorm:"type:varchar(20);default:'To Do'"`
}
