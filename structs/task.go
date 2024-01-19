package structs

type Task struct {
	ID          int    `json:"task_id" validate:"required"`
	Name        string `json:"task_name" validate:"required,max=100,min=1"`
	Content     string `json:"task_content" validate:"required,max=200,min=1"`
	State       bool   `json:"task_state" validate:"required"`
	CreatedDate int    `json:"task_created_date" validate:"required"`
	User        int    `json:"task_user" validate:"required"`
}

type NewTask struct {
	Name        string `json:"task_name" validate:"required,max=100,min=1"`
	Content     string `json:"task_content" validate:"required,max=200,min=1"`
	State       bool   `json:"task_state" validate:"required"`
	CreatedDate int    `json:"task_created_date" validate:"required"`
	User        int    `json:"task_user" validate:"required"`
}

type EditTask struct {
	ID      int    `json:"task_id" validate:"required"`
	Name    string `json:"task_name" validate:"required,max=100,min=1"`
	Content string `json:"task_content" validate:"required,max=200,min=1"`
	State   bool   `json:"task_state" validate:"required"`
}

type CompleteTask struct {
	ID    int  `json:"task_id" validate:"required"`
	State bool `json:"task_state" validate:"required"`
}

type IDTask struct {
	ID int `json:"task_id" validate:"required"`
}
