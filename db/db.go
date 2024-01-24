package db

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func init() {
	var dbError error
	db, dbError = sql.Open("mysql", "ykn2s0s3ug9frykuz3b9:pscale_pw_RZ98Do27IXnkKDbFjNHWToJAunxneYGkhDmoj4FG4x5@tcp(aws.connect.psdb.cloud)/todo-go?tls=true&interpolateParams=true")
	if dbError != nil {
		log.Fatalf("failed to connect: %v", dbError)
	}
}

func GetDB() *sql.DB {
	return db
}
