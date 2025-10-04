package routes

import (
	"gin-quickstart/controllers"
	"github.com/gin-gonic/gin"
)

func SetupAuthRoutes(router *gin.Engine) {
	authGroup := router.Group("/auth")
	{
		authGroup.POST("/register", controllers.RegisterUser)
		authGroup.POST("/login", controllers.LoginUser)
	}
}
