package routes

import (
	"gin-quickstart/controllers"
	"github.com/gin-gonic/gin"
	"gin-quickstart/middleware"
)

func SetupTaskRoutes(router *gin.Engine) {
	taskGroup := router.Group("/tasks")
	taskGroup.Use(middleware.JWTMiddleware())
	{
		taskGroup.GET("/", controllers.GetAllTask)
		taskGroup.GET("/:id", controllers.GetTaskByID)
		taskGroup.POST("/", controllers.CreateTask)
		taskGroup.PUT("/:id", controllers.UpdateTask)
		taskGroup.DELETE("/:id", controllers.DeleteTask)
	}
}
