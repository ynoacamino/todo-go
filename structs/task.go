package structs

type Task struct {
	ID          string `json:"task_id"`
	Name        string `json:"task_name"`
	Content     string `json:"task_content"`
	State       bool   `json:"task_state"`
	CreatedDate int    `json:"task_created_date"`
	User        int    `json:"task_user"`
}
