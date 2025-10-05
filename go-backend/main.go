package main

import (
  "os"
  "log"
  "time"
  "github.com/gin-gonic/gin"
  "gin-quickstart/connection"
  "gin-quickstart/routes"
  "github.com/joho/godotenv"
  "github.com/gin-contrib/cors"
)

func main() {
  err := godotenv.Load();
  if err != nil {
    log.Println("Failed to load .env file")
  }
  // Database Connection
  connection.DatabaseConnection(
	os.Getenv("DB_HOST"),
	os.Getenv("DB_USERNAME"),
	os.Getenv("DB_PASSWORD"),
	os.Getenv("DB_NAME"),
	os.Getenv("DB_PORT"),
    os.Getenv("DB_SSLMODE"),
  )
  connection.MigrationStart()

  router := gin.Default()
  router.Use(cors.New(cors.Config{
    AllowAllOrigins:  true,
    AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
    AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "Accept", "X-Requested-With"},
    ExposeHeaders:    []string{"Content-Length"},
    AllowCredentials: true,
    MaxAge:           12 * time.Hour,
  }))

  routes.SetupRoutes(router)
  router.Run(":3001")
}
