package structs

type AuthUser struct {
	Username string `json:"username" validate:"required,max=100,min=4"`
	Password string `json:"user_password" validate:"required,max=100,min=4"`
}

type NewUser struct {
	AuthUser
	CompleteName string `json:"complete_name" validate:"required,max=150,min=4"`
}
type User struct {
	NewUser
	ID string `json:"user_id"`
}

func IsValidNewUser(user *NewUser) bool {
	return user.CompleteName != "" && user.Password != "" && user.Username != ""
}
