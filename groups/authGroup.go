package groups

import (
	"github.com/gofiber/fiber/v2"
	authcontroller "github.com/ynoacamino/todo-go/controllers/authcontroller"
)

func AuthGroup(app *fiber.Router) {
	(*app).Post("/register", authcontroller.RegisterUser)

	(*app).Post("/login", authcontroller.LoginUser)
}
