package groups

import (
	"github.com/gofiber/fiber/v2"
	connectDB "github.com/ynoacamino/todo-go/db"
	"github.com/ynoacamino/todo-go/structs"
	"github.com/ynoacamino/todo-go/utils"
)

func TaskGroup(app *fiber.Router) {
	(*app).Get("/", func(c *fiber.Ctx) error {
		user := new(structs.UserToken)

		err := utils.ParseJson(c.Locals("userToken").(string), user)

		if err != nil {
			return err
		}

		db := connectDB.GetDB()

		rows, err := db.Query("SELECT task_id, task_name, task_content, task_state, task_created_date, task_user FROM task")

		if err != nil {
			return err
		}
		defer rows.Close()

		var tasks []structs.Task
		for rows.Next() {
			var task structs.Task

			err := rows.Scan(&task.ID, &task.Name, &task.Content, &task.State, &task.CreatedDate, &task.User)

			if err != nil {
				return err
			}

			tasks = append(tasks, task)

		}

		return c.JSON(tasks)
	})
}
