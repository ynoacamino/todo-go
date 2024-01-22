package groups

import (
	"github.com/gofiber/fiber/v2"
	"github.com/ynoacamino/todo-go/controllers/taskcontroller"
	"github.com/ynoacamino/todo-go/controllers/usercontroller"
)

func TaskGroup(app *fiber.Router) {
	(*app).Get("/", taskcontroller.GetTask)
	(*app).Get("/id", taskcontroller.GetTaskById)
	(*app).Post("/add", taskcontroller.AddTask)
	(*app).Post("/edit", taskcontroller.EditTask)

	(*app).Post("/delete", taskcontroller.DeleteTask)
	(*app).Post("/complete", taskcontroller.CompleteTask)

	(*app).Post("/user", usercontroller.GetUser)
}
