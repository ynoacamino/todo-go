package usercontroller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/ynoacamino/todo-go/structs"
	"github.com/ynoacamino/todo-go/utils"
)

func GetUser(c *fiber.Ctx) error {
	user := new(structs.UserToken)

	err := utils.ParseJson(c.Locals("userToken").(string), user)

	if err != nil {
		return err
	}

	return c.JSON(user)
}
