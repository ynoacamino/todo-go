package main

import (
	"log"
	"os"

	jwtware "github.com/gofiber/contrib/jwt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/ynoacamino/todo-go/groups"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("failed to load env", err)
	}

	app := fiber.New()

	app.Use(cors.New())
	app.Use(jwtware.New(jwtware.Config{
		SigningKey: jwtware.SigningKey{Key: []byte(os.Getenv("JWT_SECRET"))},
	}))

	api := app.Group("/api")

	auth := api.Group("/auth")
	groups.AuthGroup(&auth)

	task := api.Group("/task")
	groups.TaskGroup(&task)

	listenError := app.Listen(":3000")
	if listenError != nil {
		log.Fatal("Connect error")
	}
}
