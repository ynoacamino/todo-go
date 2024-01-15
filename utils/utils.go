package utils

import "golang.org/x/crypto/bcrypt"

func HashPassword(str string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(str), bcrypt.DefaultCost)

	if err != nil {
		return "", err
	}

	return string(hashedPassword), nil
}

func VerifyPassword(input string, hashed string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hashed), []byte(input))
	return err
}
