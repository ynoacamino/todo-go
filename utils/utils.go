package utils

import (
	"encoding/json"

	"golang.org/x/crypto/bcrypt"
)

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

func Stringify(data interface{}) (string, error) {
	bytes, err := json.Marshal(data)

	if err != nil {
		return "", err
	}

	return string(bytes), nil
}

func ParseJson(str string, obj interface{}) error {
	return json.Unmarshal([]byte(str), obj)
}
