package authcontroller

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	conectDB "github.com/ynoacamino/todo-go/db"
	"github.com/ynoacamino/todo-go/structs"
	"github.com/ynoacamino/todo-go/utils"
	"gopkg.in/go-playground/validator.v9"
)

var validate *validator.Validate

func RegisterUser(c *fiber.Ctx) error {
	validate = validator.New()
	user := new(structs.NewUser)

	err := c.BodyParser(user)
	if err != nil {
		return err
	}

	err = validate.Struct(user)

	if err != nil {
		return err
	}

	db := conectDB.GetDB()

	var numRows int

	err = db.QueryRow("SELECT COUNT(*) FROM user WHERE username = ?", user.Username).Scan(&numRows)

	if err != nil {
		return err
	}

	if numRows > 0 {
		message := structs.MessageJson{
			Message: "The user already register",
			Error:   "Wrong data",
		}
		return c.Status(400).JSON(message)
	}

	photo := "https://api.dicebear.com/7.x/notionists/svg?seed=" + user.Username

	hashedPassword, err := utils.HashPassword(user.Password)

	if err != nil {
		return err
	}

	_, err = db.Exec(`
		INSERT INTO 
			user (user_password, username, photo, complete_name)
		VALUES (?, ?, ?, ?);
	`, hashedPassword, user.Username, photo, user.CompleteName)

	if err != nil {
		return err
	}

	return c.JSON(user)
}

func LoginUser(c *fiber.Ctx) error {
	validate = validator.New()
	authUser := new(structs.AuthUser)

	err := c.BodyParser(authUser)

	if err != nil {
		return err
	}

	err = validate.Struct(authUser)

	if err != nil {
		return err
	}

	db := conectDB.GetDB()

	rows, err := db.Query("SELECT username, user_password FROM user WHERE username = ?", authUser.Username)
	if err != nil {
		return err
	}
	defer rows.Close()

	if rows.Next() {
		err = validate.Struct(authUser)

		if err != nil {
			message := structs.MessageJson{
				Message: "Wrong credentials",
				Error:   "Wrong credentials",
			}
			return c.Status(401).JSON(message)
		}

		var user structs.User

		if err = rows.Scan(&user.Username, &user.Password); err != nil {
			return err
		}

		if err = utils.VerifyPassword(authUser.Password, user.Password); err != nil {
			return err
		}

		claims := jwt.MapClaims{
			"username":      user.Username,
			"complete_name": user.CompleteName,
			"user_id":       user.ID,
			"photo":         user.Photo,
		}

		tk := jwt.NewWithClaims(jwt.SigningMethodES256, claims)

		err := godotenv.Load()
		if err != nil {
			return err
		}

		tokenString, err := tk.SignedString([]byte(os.Getenv("JWT_SECRET")))

		if err != nil {
			return err
		}

		token := structs.Token{
			Value: tokenString,
		}

		return c.JSON(token)

	} else {
		message := structs.MessageJson{
			Message: "Wrong credentials",
			Error:   "Wrong credentials",
		}
		return c.Status(401).JSON(message)
	}
}
