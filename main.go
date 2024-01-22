package main

import (
	"log"
	"os"

	jwtware "github.com/gofiber/contrib/jwt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/ynoacamino/todo-go/groups"
	"github.com/ynoacamino/todo-go/middlewares"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("failed to load env", err)
	}

	app := fiber.New()

	app.Use(cors.New())

	app.Static("/", "./client/dist")

	api := app.Group("/api")

	auth := api.Group("/auth")
	groups.AuthGroup(&auth)

	// RUTAS PROTEGIDAS
	app.Use(jwtware.New(jwtware.Config{
		SigningKey: jwtware.SigningKey{Key: []byte("secret")},
	}))
	task := api.Group("/task", middlewares.AuthMiddleware)
	groups.TaskGroup(&task)

	listenError := app.Listen(":" + os.Getenv("PORT"))
	if listenError != nil {
		log.Fatal("Connect error")
	}
}
