package models

type TaskStatus string

const (
    ToDo       TaskStatus = "To Do"
    InProgress TaskStatus = "In Progress"
    Done       TaskStatus = "Done"
)
