package db

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var db *sql.DB

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("failed to load env", err)
	}

	var dbError error
	db, dbError = sql.Open("mysql", os.Getenv("DSN"))
	if dbError != nil {
		log.Fatalf("failed to connect: %v", err)
	}
}

func GetDB() *sql.DB {
	return db
}
