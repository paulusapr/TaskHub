package main

import (
  "os"
  "log"
	"github.com/gin-gonic/gin"
	"gin-quickstart/connection"
  "github.com/joho/godotenv"
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
  router.GET("/ping", func(c *gin.Context) {
    c.JSON(200, gin.H{
      "message": "pong",
    })
  })
  router.Run(":3001")
}
