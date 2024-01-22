package middlewares

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/ynoacamino/todo-go/structs"
	"github.com/ynoacamino/todo-go/utils"
)

func AuthMiddleware(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)

	claims := user.Claims.(jwt.MapClaims)

	username := claims["username"].(string)
	complete_name := claims["complete_name"].(string)
	user_id := int(claims["user_id"].(float64))

	photo := claims["photo"].(string)

	if username == "" || complete_name == "" || photo == "" {
		return fiber.NewError(401, "Wrong credentials")
	}

	userToken := structs.UserToken{
		Username:     username,
		CompleteName: complete_name,
		ID:           user_id,
		Photo:        photo,
	}

	str, err := utils.Stringify(userToken)

	if err != nil {
		return err
	}

	c.Locals("userToken", str)

	return c.Next()
}
