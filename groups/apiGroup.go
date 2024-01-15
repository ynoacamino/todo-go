package groups

import (
	"github.com/gofiber/fiber/v2"
	apicontroller "github.com/ynoacamino/todo-go/controllers/ApiController"
)

func ApiGroup(app *fiber.Router) {
	(*app).Post("/register", apicontroller.RegisterUser)

	(*app).Post("/login", apicontroller.LoginUser)
}
