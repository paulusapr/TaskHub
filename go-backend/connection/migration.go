package connection

import (
	"log"
	"gin-quickstart/models"
)

func MigrationStart() {
	err := DB.AutoMigrate(&models.User{}, &models.Task{})
	if err != nil {
		log.Fatal("Migration failed: ", err)
	}

	log.Println("Migration completed!")
}
