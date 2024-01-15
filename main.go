package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/ynoacamino/todo-go/groups"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())

	api := app.Group("/api")
	groups.ApiGroup(&api)

	listenError := app.Listen(":3000")
	if listenError != nil {
		log.Fatal("Connect error")
	}
}
