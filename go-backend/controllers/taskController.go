package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"gin-quickstart/models"
	"gin-quickstart/connection"
)

func GetAllTask(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User not found"})
		return
	}

	u := user.(*models.User)
	var tasks []models.Task
	if err := connection.DB.Where("user_id = ?", u.ID).Find(&tasks).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Fetch data failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Get task success",
		"data": tasks,
	})
}

func CreateTask(c *gin.Context) {
	var input struct {
		Title string `json:"title" form:"title" binding:"required"`
	}

	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User not found"})
		return
	}

	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	u := user.(*models.User)
	task := models.Task{
		UserID: u.ID,
		Title:  input.Title,
	}
	if err := connection.DB.Create(&task).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Create task failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Create task success",
		"data": task,
	})
}

func UpdateTask(c *gin.Context) {
	taskID := c.Param("id")
	var input struct {
		Title  string `json:"title" form:"title" binding:"required"`
	    Status models.TaskStatus `json:"status" form:"status" binding:"required"`
	}

	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User not found"})
		return
	}

	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	u := user.(*models.User)
	var task models.Task
	if err := connection.DB.Where("id = ? AND user_id = ?", taskID, u.ID).First(&task).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	task.Title = input.Title
	task.Status = input.Status
	if err := connection.DB.Save(&task).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Update task failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Update task success",
		"data": task,
	})
}

func DeleteTask(c *gin.Context) {
	taskID := c.Param("id")

	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User not found"})
		return
	}

	u := user.(*models.User)
	var task models.Task
	if err := connection.DB.Where("id = ? AND user_id = ?", taskID, u.ID).First(&task).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	if err := connection.DB.Delete(&task).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Delete task failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Delete task success",
	})
}

func GetTaskByID(c *gin.Context) {
	taskID := c.Param("id")

	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User not found"})
		return
	}

	u := user.(*models.User)
	var task models.Task
	if err := connection.DB.Where("id = ? AND user_id = ?", taskID, u.ID).First(&task).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Get task success",
		"data": task,
	})
}
