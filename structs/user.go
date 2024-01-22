package structs

type AuthUser struct {
	Username string `json:"username" validate:"required,max=100,min=4"`
	Password string `json:"user_password" validate:"required,max=100,min=4"`
}
type NewUser struct {
	Username     string `json:"username" validate:"required,max=100,min=4"`
	Password     string `json:"user_password" validate:"required,max=100,min=4"`
	CompleteName string `json:"complete_name" validate:"required,max=150,min=4"`
}
type User struct {
	Username     string `json:"username" validate:"required,max=100,min=4"`
	Password     string `json:"user_password" validate:"required,max=100,min=4"`
	CompleteName string `json:"complete_name" validate:"required,max=150,min=4"`
	ID           int    `json:"user_id"`
	Photo        string `json:"photo"`
}
type UserToken struct {
	Username     string `json:"username" validate:"required,max=100,min=4"`
	CompleteName string `json:"complete_name" validate:"required,max=150,min=4"`
	ID           int    `json:"user_id"`
	Photo        string `json:"photo"`
}

func IsValidNewUser(user *NewUser) bool {
	return user.CompleteName != "" && user.Password != "" && user.Username != ""
}
