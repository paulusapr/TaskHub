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
		taskGroup.GET("/all", controllers.GetAllTask)
		taskGroup.GET("/single/:id", controllers.GetTaskByID)
		taskGroup.POST("/create", controllers.CreateTask)
		taskGroup.PUT("/update/:id", controllers.UpdateTask)
		taskGroup.DELETE("/delete/:id", controllers.DeleteTask)
	}
}
