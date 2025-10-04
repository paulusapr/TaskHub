package routes

import (
	"gin-quickstart/controllers"
	"github.com/gin-gonic/gin"
)

func SetupTaskRoutes(router *gin.Engine) {
	taskGroup := router.Group("/tasks")
	{
		taskGroup.GET("/", controllers.GetAllTask)
		taskGroup.POST("/", controllers.CreateTask)
		taskGroup.PUT("/:id", controllers.UpdateTask)
		taskGroup.DELETE("/:id", controllers.DeleteTask)
	}
}
