package routes

import (
	"github.com/gin-gonic/gin"
	"gin-quickstart/middleware"
)

func SetupRoutes(router *gin.Engine) {
	SetupAuthRoutes(router)
	router.Use(middleware.JWTMiddleware())
	{
		SetupTaskRoutes(router)
	}
}
