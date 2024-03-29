package taskcontroller

import (
	"github.com/gofiber/fiber/v2"
	connectDB "github.com/ynoacamino/todo-go/db"
	"github.com/ynoacamino/todo-go/structs"
	"github.com/ynoacamino/todo-go/utils"
	"gopkg.in/go-playground/validator.v9"
)

func GetTask(c *fiber.Ctx) error {
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

	c.Set("Content-Type", "application/json")

	tasksJson, err := utils.Stringify(tasks)

	if err != nil {
		return err
	}

	return c.Send([]byte(tasksJson))
}

func GetTaskById(c *fiber.Ctx) error {
	user := new(structs.UserToken)

	err := utils.ParseJson(c.Locals("userToken").(string), user)

	if err != nil {
		return err
	}

	task_id := c.Query("task_id")

	if err != nil {
		return &fiber.Error{
			Message: "AL convertir el parametro",
		}
	}

	db := connectDB.GetDB()

	rows, err := db.Query("SELECT task_id, task_name, task_content, task_state, task_created_date, task_user FROM task WHERE task_id = ?", task_id)

	if err != nil {
		return err
	}
	defer rows.Close()

	var task structs.Task
	if rows.Next() {
		rows.Scan(&task.ID, &task.Name, &task.Content, &task.State, &task.CreatedDate, &task.User)
	}

	c.Set("Content-Type", "application/json")

	taskJson, err := utils.Stringify(task)

	if err != nil {
		return err
	}

	return c.Send([]byte(taskJson))

}

func AddTask(c *fiber.Ctx) error {
	validate := validator.New()
	user := new(structs.UserToken)

	err := utils.ParseJson(c.Locals("userToken").(string), user)

	if err != nil {
		return err
	}

	task := new(structs.NewTask)

	c.BodyParser(task)

	if err = validate.Struct(task); err != nil {
		return err
	}

	db := connectDB.GetDB()

	_, err = db.Exec(`
	INSERT INTO 
	task (task_name, task_content, task_state, task_created_date, task_user) 
	VALUES (?, ?, ?, ?, ?)`, task.Name, task.Content, task.State, task.CreatedDate, user.ID)

	if err != nil {
		return err
	}

	c.Set("Content-Type", "application/json")

	taskJson, err := utils.Stringify(task)

	if err != nil {
		return err
	}

	return c.Send([]byte(taskJson))
}

func EditTask(c *fiber.Ctx) error {
	validate := validator.New()
	user := new(structs.UserToken)

	err := utils.ParseJson(c.Locals("userToken").(string), user)

	if err != nil {
		return err
	}

	task := new(structs.EditTask)

	err = c.BodyParser(task)

	if err != nil {
		return err
	}

	if err = validate.Struct(task); err != nil {
		return err
	}

	db := connectDB.GetDB()

	query := "UPDATE task SET task_name = ?, task_content = ?, task_state = ? WHERE task_id = ?"

	_, err = db.Exec(query, task.Name, task.Content, task.State, task.ID)

	if err != nil {
		return err
	}

	taskJson, err := utils.Stringify(task)

	if err != nil {
		return err
	}

	return c.Send([]byte(taskJson))
}

func CompleteTask(c *fiber.Ctx) error {
	validate := validator.New()
	user := new(structs.UserToken)

	err := utils.ParseJson(c.Locals("userToken").(string), user)
	if err != nil {
		return err
	}

	task := new(structs.CompleteTask)

	err = c.BodyParser(task)
	if err != nil {
		return err
	}

	if err = validate.Struct(task); err != nil {
		return err
	}

	db := connectDB.GetDB()

	query := "UPDATE task SET task_state = ? WHERE task_id = ?"
	_, err = db.Exec(query, task.State, task.ID)
	if err != nil {
		return err
	}

	taskJson, err := utils.Stringify(task)

	if err != nil {
		return err
	}

	return c.Send([]byte(taskJson))
}

func DeleteTask(c *fiber.Ctx) error {
	validate := validator.New()
	user := new(structs.UserToken)
	err := utils.ParseJson(c.Locals("userToken").(string), user)
	if err != nil {
		return err
	}

	task := new(structs.IDTask)
	err = c.BodyParser(task)
	if err != nil {
		return err
	}

	if err = validate.Struct(task); err != nil {
		return nil
	}

	db := connectDB.GetDB()

	query := "DELETE FROM task WHERE task_id = ?"
	_, err = db.Exec(query, task.ID)
	if err != nil {
		return err
	}

	taskJson, err := utils.Stringify(task)

	if err != nil {
		return err
	}

	return c.Send([]byte(taskJson))
}
